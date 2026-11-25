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
        tooltip:
          "Personally I prefer React Query + React Context. I know how to use, but never really find the right use case for it",
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
        tooltip:
          "I initially installed WSL to run Kali Linux for CTF. Now I also use it for Docker and OpenCode",
      },
      {
        name: "OpenCode",
        icon: "simple-icons:opencode",
        tooltip:
          "I mainly use the planning mode to help me plan my project. Also used for helping me write my case study and blogs",
      },
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
      { name: "Pillow" },
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

// ===========================
// Hello
// ===========================

export const softwareDataEntries: SkillsEntry[] = [
  {
    category: "languages",
    skills: [
      {
        name: "TypeScript",
        icon: "simple-icons:typescript",
        tooltip:
          "I like its type system and how it helps catch bugs before runtime",
      },
      {
        name: "JavaScript",
        icon: "simple-icons:javascript",
        tooltip: "The foundation behind my TypeScript projects ¯\\_(ツ)_/¯",
      },
      {
        name: "Python",
        icon: "simple-icons:python",
        tooltip: "Mostly used for data-related task",
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
          "Used for client-side routing and protecting routes that require authentication",
      },
      {
        name: "React Query",
        icon: "simple-icons:reactquery",
        tooltip: "Used for fetching, caching, and managing server state",
      },
      {
        name: "Tailwind",
        icon: "simple-icons:tailwindcss",
        tooltip:
          "My go-to styling framework, especially for building reusable components",
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
        tooltip: "My main SQL database since I use Supabase heavily",
      },

      {
        name: "Supabase",
        icon: "simple-icons:supabase",
        tooltip:
          "Generous free tier and complete feature set (e.g., storage, compute, auth)",
      },
      {
        name: "Deno",
        icon: "simple-icons:deno",
        tooltip: "Used for server-side logic and Supabase Edge Functions",
      },
    ],
  },
  {
    category: "data",
    skills: [
      { name: "Pandas", icon: "simple-icons:pandas" },
      { name: "sklearn", icon: "simple-icons:scikitlearn" },
      { name: "PyTorch", icon: "simple-icons:pytorch" },
      { name: "Tableau", icon: "simple-icons:tableau" },
      {
        name: "Airflow",
        icon: "simple-icons:apacheairflow",
      },
      {
        name: "PySpark",
        icon: "simple-icons:apachespark",
      },
    ],
  },
];

export const infraSystemEntries: SkillsEntry[] = [
  {
    category: "operating systems",
    skills: [
      {
        name: "Linux",
        icon: "simple-icons:linux",
        tooltip: "Currently running Fedora KDE Plasma on my home server",
      },
      {
        name: "Windows",
        icon: "simple-icons:windows",
        tooltip:
          "Experience using and troubleshooting Windows desktop environments and systems",
      },
      {
        name: "Active Directory (AD DS)",
        icon: "simple-icons:windows",
        tooltip:
          "Learning Windows Server directory services, including domain management, user accounts, groups and Group Policy",
      },
    ],
  },
  {
    category: "networking",
    skills: [
      {
        name: "Network Configuration",
        icon: "mdi:network",
        tooltip:
          "Configuring network interfaces, IP addressing, DNS, DHCP, routing, firewall rules and network segmentation",
      },
      {
        name: "Wireshark",
        icon: "simple-icons:wireshark",
        tooltip:
          "Used to capture and analyse network traffic for troubleshooting and understanding network protocols",
      },
      {
        name: "OpenWrt",
        icon: "simple-icons:openwrt",
        tooltip: "Used for configuring and managing my home network",
      },
    ],
  },
  {
    category: "cloud",
    skills: [
      {
        name: "Microsoft Azure",
        icon: "simple-icons:microsoftazure",
        tooltip:
          "Exploring Azure networking and cloud infrastructure through hands-on labs",
      },
      {
        name: "AWS",
        icon: "mdi:aws",
        tooltip: "Used AWS services for my university final-year project",
      },
      {
        name: "Cloudflare",
        icon: "simple-icons:cloudflare",
        tooltip:
          "Used Workers, Pages, R2 and DNS to deploy and manage my projects",
      },
    ],
  },
  {
    category: "infrastructure_tools",
    skills: [
      {
        name: "Docker",
        icon: "simple-icons:docker",
        tooltip:
          "Used to containerise applications and run self-hosted services",
      },
      {
        name: "Remote Administration",
        icon: "mdi:remote-desktop",
        tooltip:
          "Configured SSH and remote desktop access, Wake-on-LAN and remote shutdown to manage my home PC",
      },
      {
        name: "Tailscale",
        icon: "simple-icons:tailscale",
        tooltip:
          "Mesh VPN for connecting and remotely accessing my devices across different networks",
      },
    ],
  },
  {
    category: "self_hosted_services",
    skills: [
      {
        name: "AdGuard Home",
        icon: "simple-icons:adguard",
        tooltip:
          "Self-hosted DNS filtering for network-wide ad blocking and DNS management",
      },
      {
        name: "WireGuard",
        icon: "simple-icons:wireguard",
        tooltip:
          "Used with Proton VPN split tunnelling to route selected website traffic through a VPN while keeping other traffic on my regular connection",
      },
      {
        name: "Nextcloud",
        icon: "simple-icons:nextcloud",
        tooltip:
          "Self-hosted cloud storage for file synchronisation, sharing and access across devices",
      },
      {
        name: "Jellyfin",
        icon: "simple-icons:jellyfin",
        tooltip:
          "Self-hosted media server for organising and streaming personal media",
      },
      {
        name: "Immich",
        icon: "simple-icons:immich",
        tooltip:
          "Self-hosted photo and video management with automatic mobile backups",
      },
      {
        name: "Uptime Kuma",
        icon: "simple-icons:uptimekuma",
        tooltip:
          "Monitors the availability of self-hosted services and network devices",
      },
      {
        name: "Homepage",
        icon: "mdi:view-dashboard",
        tooltip:
          "Self-hosted dashboard for organising services, system information and management links",
      },
      {
        name: "Vaultwarden",
        icon: "mdi:shield-key",
        tooltip:
          "Lightweight, self-hosted password manager compatible with Bitwarden clients",
      },
    ],
  },
];
