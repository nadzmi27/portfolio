import { supabase } from "./client";

export type Message = {
  id: number;
  message: string;
  name: string;
  created_at: string;
};

export type NewMessageInput = {
  name: string;
  message: string;
  website?: string;
};

type GuestbookResponse = {
  success: boolean;
  status: "approved" | "pending" | "rejected";
};

// Fetch messages
export async function fetchMessages(recent = 0): Promise<Message[]> {
  if (recent) {
    const { data, error } = await supabase
      .from("nadzmi_guestbook")
      .select("id, message, name, created_at")
      .order("created_at", { ascending: false })
      .limit(recent);
    if (error) throw error;
    return data ?? [];
  } else {
    const { data, error } = await supabase
      .from("nadzmi_guestbook")
      .select("id, message, name, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
}

// Fetch message for pagination
export async function fetchMessagesPaginated(
  page = 1,
  pageSize = 9,
): Promise<{ data: Message[]; count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("nadzmi_guestbook")
    .select("id, message, name, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}

// Insert message
export async function sendMessage(
  messageInput: NewMessageInput,
): Promise<GuestbookResponse> {
  const { data, error } = await supabase.functions.invoke("nadzmi-guestbook", {
    body: messageInput,
  });

  if (error) {
    throw error;
  }

  return data as GuestbookResponse;
}
