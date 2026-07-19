// Config
const MW_API_KEY = Deno.env.get("MW_API_KEY")!;
const MW_THESAURUS_API_KEY = Deno.env.get("MW_THESAURUS_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

// Client
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

//===============================================================
// Merriam Webster -- Types
type MWResponse = MWEntry[] | string[];

interface MWEntry {
  // Always present
  meta: {
    id: string;
    uuid: string;
    sort: string;
    src: string;
    section: string;
    stems: string[];
    offensive: boolean;
  };
  hom?: number;
  hwi: {
    hw: string;
    prs?: MWPronunciation[];
  };
  fl?: string;
  shortdef: string[];

  // Optional

  ahws?: unknown;
  vrs?: unknown;
  lbs?: string[];
  sls?: string[];
  psl?: string;
  ins?: unknown[];
  cxs?: unknown[];
  def?: unknown[];
  uros?: unknown[];
  dros?: unknown[];
  dxnls?: unknown[];
  usages?: unknown[];
  syns?: unknown[];
  quotes?: unknown[];
  art?: unknown;
  table?: unknown;
  et?: unknown[];
  date?: string;
  [key: string]: unknown; // catch-all for anything else
}

interface MWPronunciation {
  mw: string;
  sound?: {
    audio: string;
    ref: string;
    stat: string;
  };
}

// Thesaurus types
interface MWThesaurusEntry {
  meta: {
    id: string;
    uuid: string;
    src: string;
    section: string;
    target?: {
      tuuid: string; // Use this to match to the collegiate
      tsrc: string; // Should say collegiate for our matching
    };
    stems: string[];
    syns: string[][]; // List of sysnonyms, will mainly be using this and ants
    ants: string[][]; // List of antonyms
    offensive: boolean;
  };
  [key: string]: unknown; // catch-all for anything else
}

// Extended Entry combining Collegiate with Thesaurus
type ExtendedEntry = MWEntry & {
  meta: MWEntry["meta"] & {
    syns?: string[];
    ants?: string[];
  };
};

// Merriam Webster Helper Functions
// Check if the entry is the base entry (e.g. bank:01, bank:02, controlled) and not compound form (e.g. bank card, controlled-experiment)
function isBaseEntry(entry: MWEntry, searchTerm: string): boolean {
  const id = entry.meta.id.replace(/:\d+$/, "");
  const headword = entry.hwi.hw.replace(/\*/g, "");

  // always keep if it matches what was searched
  if (headword.toLowerCase() === searchTerm.toLowerCase()) return true;

  // skip compounds and phrases
  return !id.includes(" ") && !id.includes("-");
}

function isMWEntry(item: unknown): item is MWEntry {
  return typeof item === "object" && item !== null && "meta" in item;
}

function isMWThesaurusEntry(item: unknown): item is MWThesaurusEntry {
  return (
    typeof item === "object" &&
    item !== null &&
    "meta" in item &&
    typeof (item as MWThesaurusEntry).meta?.target === "object"
  );
}

async function fetchFromMW(word: string): Promise<MWEntry[] | string[]> {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(word)}?key=${MW_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`MW Collegiate API error: ${res.status}`);
  }

  return res.json();
}

async function fetchFromMWThesaurus(word: string): Promise<MWThesaurusEntry[] | string[]> {
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${encodeURIComponent(word)}?key=${MW_THESAURUS_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`MW Thesaurus API error: ${res.status}`);
  }

  const data = await res.json()
  // MW returns string[] when not found
  return Array.isArray(data) ? data.filter(isMWThesaurusEntry) : []
}

// Strip the * from word (e.g. co*co*nut -> coconut)
const strip = (hw: string) => hw.replace(/\*/g, "");

// Combine collegiate with thesaurus
type ThesaurusBucket = {
  syns: string[];
  ants: string[];
};

function enrichCollegiateWithThesaurus(
  collegiate: MWEntry[],
  thesaurus: MWThesaurusEntry[],
): ExtendedEntry[] {
  // Step 1 — build aggregated map (handles multiple matches)
  // uuid/tuuid : {synonyms[], antoynyms[]}
  const thesaurusMap = new Map<string, ThesaurusBucket>();

  for (const t of thesaurus) {
    const tuuid = t.meta?.target?.tuuid; // Get the target id
    if (!tuuid) continue;

    // If tuuid has not been set
    if (!thesaurusMap.has(tuuid)) {
      thesaurusMap.set(tuuid, { syns: [], ants: [] });
    }

    const bucket = thesaurusMap.get(tuuid)!;

    // flatten while inserting (optional: defer flattening instead)
    if (t.meta.syns) {
      bucket.syns.push(...t.meta.syns.flat());
    }

    if (t.meta.ants) {
      bucket.ants.push(...t.meta.ants.flat());
    }
  }

  // Step 2 — remove duplicate from synonyms and antonyms
  for (const [key, value] of thesaurusMap.entries()) {
    thesaurusMap.set(key, {
      syns: [...new Set(value.syns)],
      ants: [...new Set(value.ants)],
    });
  }

  // Step 3 — merge into collegiate
  const enrichedCollegiate = collegiate.map((entry) => {
    const match = thesaurusMap.get(entry.meta.uuid);

    if (!match) return entry;

    return {
      ...entry,
      meta: {
        ...entry.meta,
        syns: match.syns,
        ants: match.ants,
      },
    };
  });

  return enrichedCollegiate
}

// Database function
// supabase/db.ts

// async function getFromFetchedTerms(term: string) {
//   const { error: getFetchError, data } = await supabase
//     .from("fetched_terms")
//     .select("*")
//     .eq("term", term)
//     .maybeSingle();

//   if (getFetchError)
//     throw new Error(`Get fetched word error: ${getFetchError.message}`);
//   return data;
// }

async function insertFetchedTerm(
  term: string,
  exists: boolean,
  headword: string | null,
) {
  const { error: insertFetchError } = await supabase
    .from("fetched_terms")
    .upsert(
      {
        term,
        exists,
        headword,
      },
      { onConflict: "term" },
    );

  if (insertFetchError)
    throw new Error(`Insert fetched word error: ${insertFetchError.message}`);
}

async function insertEntries(entries: ExtendedEntry[]) {
  const rows = entries.map((entry) => ({
    uuid: entry.meta.uuid,
    entry_id: entry.meta.id,
    word: entry.hwi.hw.replace(/\*/g, ""),
    homograph: entry.hom ?? null,
    pos: entry.fl ?? null,
    stems: entry.meta.stems ?? [],
    shortdef: entry.shortdef ?? [],
    raw: entry,
    syns: entry.meta.syns ?? [],
    ants: entry.meta.ants ?? [],
  }));

  // get unique words from entries
  const uniqueWords = [...new Set(rows.map((r) => r.word))].map((word) => ({
    word,
  }));

  // insert into words first (FK parent)
  const { error: wordsError } = await supabase
    .from("words")
    .upsert(uniqueWords, { onConflict: "word" });

  if (wordsError) throw new Error(`Words insert error: ${wordsError.message}`);

  // then insert entries
  const { error: entriesError } = await supabase
    .from("entries")
    .upsert(rows, { onConflict: "entry_id" });

  if (entriesError) throw new Error(`Insert error: ${entriesError.message}`);
}

async function getEntriesByWord(word: string) {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("word", word)
    .order("homograph", { ascending: true, nullsFirst: true });

  if (error) throw new Error(`Query error: ${error.message}`);
  return data;
}

async function addWordToCollection(
  userSupabase: SupabaseClient,
  userId: string,
  collectionId: string,
  word: string,
) {
  const { data: userWord, error: userWordError } = await userSupabase
    .from("user_words")
    .upsert({ user_id: userId, word: word }, { onConflict: "user_id,word" })
    .select("id")
    .single();

  if (userWordError)
    throw new Error(`user_words error: ${userWordError.message}`);

  const { error: collectionWordError } = await userSupabase
    .from("collection_words")
    .upsert(
      { collection_id: collectionId, user_word_id: userWord.id },
      { onConflict: "collection_id,user_word_id" },
    );

  if (collectionWordError)
    throw new Error(`collection_words error: ${collectionWordError.message}`);
}


// main.ts
Deno.serve(async (req) => {
  // Handle cors
  const allowedOrigins = [
    'http://localhost:5173',
    'https://vocabforest.com',
  ]

  const origin = req.headers.get('Origin') ?? ''

  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    // 1. Parse and validate request
    if (req.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: corsHeaders },
      );
    }

    // Verify authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Missing or invalid authorization header" },
        { status: 401, headers: corsHeaders },
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders },
      );
    }

    // Create a user-scoped client for DB operations
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const body = await req.json().catch(() => null);
    const word = body?.word?.trim();
    const userId = user.id;
    const collectionId = body?.collectionId;

    if (!collectionId || typeof collectionId !== "string") {
      return Response.json(
        { error: "Missing collectionId" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (!word || typeof word !== "string") {
      return Response.json(
        { error: "Missing or invalid word" },
        { status: 400, headers: corsHeaders },
      );
    }

    // 2. Fetch from MW Collegiate and Thesaurus
    // Lazy parallel for promise
    const mwPromise = fetchFromMW(word);
    const thesaurusPromise = fetchFromMWThesaurus(word);

    // MW returns string[] when word not found (suggestions or empty)
    const mwData = await mwPromise;
    if (!mwData.length || !isMWEntry(mwData[0])) {
      await insertFetchedTerm(word, false, null);

      // Remove from words table if it exists but MW doesn't know it
      await supabase.from("words").delete().eq("word", word);

      const suggestions = mwData.length
        ? { suggestions: mwData as string[] }
        : {};
      return Response.json(
        { error: `"${word}" was not found in the dictionary`, ...suggestions },
        { status: 404, headers: corsHeaders },
      );
    }

    // 3. Parse and insert entries
    const mwEntries = (mwData as MWEntry[]).filter((entry) =>
      isBaseEntry(entry, word),
    );

    if (mwEntries.length === 0) {
      await insertFetchedTerm(word, false, null);
      return Response.json(
        { error: `No valid base entries found for "${word}"` },
        { status: 404, headers: corsHeaders },
      );
    }

    // Enrich collegiate with thesaurus 
    const mwThesaurusData = await thesaurusPromise;
    if (mwThesaurusData.length > 0) {
      const mwThesaurusEntries = mwThesaurusData as MWThesaurusEntry[]
      const enrichedEntries = enrichCollegiateWithThesaurus(mwEntries, mwThesaurusEntries)
      await insertEntries(enrichedEntries);
    } else {
      await insertEntries(mwEntries)
    }

    // headword from first entry, strip syllable dots
    const headword =
      // 1. Check exact match  "Polish" === "Polish" and not "polish" === "Polish"
      mwEntries
        .find((e) => strip(e.hwi.hw) === word)
        ?.hwi.hw.replace(/\*/g, "") ??
      // 2. Case-insensitive fallback for typos like "PoLISH" by lowercasing
      mwEntries
        .find((e) => strip(e.hwi.hw).toLowerCase() === word.toLowerCase())
        ?.hwi.hw.replace(/\*/g, "") ??
      // 3. Last resort, just take whatever the first entry is
      strip(mwEntries[0].hwi.hw);

    await insertFetchedTerm(word, true, headword);

    // 4. Add the word to user's collection
    await addWordToCollection(userSupabase, userId, collectionId, headword);

    // 5. Return entries by headword
    const entries = await getEntriesByWord(headword);
    return Response.json({ word: headword, entries }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
});
