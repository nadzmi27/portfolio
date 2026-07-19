export type SkillsEntry = {
  category: string;
  skills: {
    name: string;
    icon?: string;
    size?: number;
    tooltip?: string;
  }[];
};

export const softwareEntries: SkillsEntry[] = [
  {
    category: "languages",
    skills: [
      {
        name: "TypeScript",
        icon: "simple-icons:typescript",
        tooltip:
          "I like typescript's typechecking, helps prevent unwanted bugs",
      },
      {
        name: "JavaScript",
        icon: "simple-icons:javascript",
        tooltip: "Can't do TypeScript without knowing JavaScript  ¯\\_(ツ)_/¯",
      },
      {
        name: "Java",
        icon: "ph:coffee-fill",
        tooltip:
          "Learnt this through MOOC when I started coding. Not really used that much, but I taught people Java and OOP",
      },
    ],
  },
  {
    category: "frontend",
    skills: [
      {
        name: "Figma",
        icon: "simple-icons:figma",
        tooltip: "I like to roughly design on figma (or paper) before coding",
      },
      {
        name: "React",
        icon: "simple-icons:react",
        tooltip:
          "First learned via fullstackopen, and has been my go-to UI library ever since",
      },
      {
        name: "React Router",
        icon: "simple-icons:reactrouter",
        tooltip:
          "Used for implementing  routing (client-side) and especially protected route to control what user can visit",
      },
      {
        name: "React Query",
        icon: "simple-icons:reactquery",
        tooltip:
          "Used for managing API data (fetching, caching, ...) and optimising API usage",
      },
      {
        name: "Redux",
        icon: "simple-icons:redux",
        tooltip: "Personally I prefer React Query + React Context. I know how to use, but never really find the right use case for it",
      },
      {
        name: "Tailwind",
        icon: "simple-icons:tailwindcss",
        tooltip:
          "I mainly style using tailwindcss, especially for reusable components",
      },
      {
        name: "Astro",
        icon: "simple-icons:astro",
        tooltip: "This site is designed using Astro + React",
      },
    ],
  },
  {
    category: "backend",
    skills: [
      {
        name: "PostgreSQL",
        icon: "simple-icons:postgresql",
        tooltip:
          "My main SQL database since I use Supabase heavily. I'm also familiar with Oracle SQL",
      },

      {
        name: "Supabase",
        icon: "simple-icons:supabase",
        tooltip:
          "My go-to BaaS due to its generous free tier and complete feature set (e.g., real-time database, edge functions, vector database, authentication, storage)",
      },
      {
        name: "Deno",
        icon: "simple-icons:deno",
        tooltip:
          "Used Deno in Supabase to handled server-side logic in edge functions",
      },
      {
        name: "Node.js",
        icon: "simple-icons:nodedotjs",
        tooltip:
          "I learnt Node from fullstackopen. Quite similar to Deno (which was developed by same creator of Node.js)",
      },
      {
        name: "Express.js",
        icon: "simple-icons:express",
        tooltip:
          "Anyone who learns Node will usually learn Express at the same time. I quite like the middleware concept from express",
      },
      {
        name: "MongoDB",
        icon: "simple-icons:mongodb",
        tooltip: "Learnt in uni and fullstackopen, never really used it",
      },
    ],
  },
  {
    category: "devops",
    skills: [
      {
        name: "Git(Hub)",
        icon: "simple-icons:git",
        tooltip: "Version control and collaboration",
      },
      {
        name: "GitHub Actions",
        icon: "simple-icons:githubactions",
        tooltip:
          "This portfolio is build automatically using Github Actions on push to main branch",
      },
      {
        name: "Cloudflare",
        icon: "simple-icons:cloudflare",
        tooltip:
          "I used cloudflare Workers/Pages to setup free CI/CD pipeline \n(e.g. vocabforest.com)",
      },
      {
        name: "Docker",
        icon: "simple-icons:docker",
        tooltip: "Gotta make sure your code work on everyone's machine :)",
      },
      {
        name: "AWS",
        icon: "mdi:aws",
        tooltip:
          "Know how to use, and used it for my final year project at Monash. However, I prefer Supabase + Cloudflare",
      },
      {
        name: "Linux (WSL)",
        icon: "simple-icons:linux",
        tooltip:"I initially installed WSL to run Kali Linux for CTF. Now I also use it for Docker and OpenCode"
      },
      {
        name: "OpenCode",
        icon: "simple-icons:opencode",
        tooltip: "I mainly use the planning mode to help me plan my project. Also used for helping me write my case study and blogs"
      }
    ],
  },
];

export const dataEntries: SkillsEntry[] = [
  {
    category: "languages",
    skills: [
      {
        name: "Python",
        icon: "simple-icons:python",
        tooltip:
          "Mostly used for data-related task. Mainly taught during my study at Monash Uni. Also, my top language",
      },
      {
        name: "R",
        icon: "simple-icons:r",
        tooltip:
          "Used for statistic and analytics related task, especially heavy analysis",
      },
    ],
  },
  {
    category: "libraries",
    skills: [
      { name: "Pandas", icon: "simple-icons:pandas" },
      { name: "NumPy", icon: "simple-icons:numpy" },
      { name: "Selenium", icon: "simple-icons:selenium" },
      {
        name: "BeautifulSoup",
        icon: "material-symbols:soup-kitchen-outline-rounded",
      },

      { name: "Streamlit", icon: "simple-icons:streamlit" },
      { name: "SciPy", icon: "simple-icons:scipy" },
      { name: "Pillow"},
    ],
  },
  {
    category: "AI_ML",
    skills: [
      { name: "sklearn", icon: "simple-icons:scikitlearn" },
      { name: "PyTorch", icon: "simple-icons:pytorch" },
      { name: "HuggingFace", icon: "simple-icons:huggingface" },
      { name: "XGBoost" },
    ],
  },
  {
    category: "visualisation",
    skills: [
      { name: "Tableau", icon: "simple-icons:tableau" },
      { name: "Vega-Lite", icon: "simple-icons:vega" },
      { name: "plotly", icon: "simple-icons:plotly" },
      { name: "Matplotlib" },
    ],
  },
  {
    category: "pipeline",
    skills: [
      {
        name: "Kafka",
        icon: "simple-icons:apachekafka",
      },
      {
        name: "PySpark",
        icon: "simple-icons:apachespark",
      },
      {
        name: "Airflow",
        icon: "simple-icons:apacheairflow",
      },
    ],
  },
];
