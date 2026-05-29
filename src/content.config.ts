import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      label: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string().optional(),
      href: z.string().optional(),
      skills: z
        .array(
          z.object({
            icon: z.string(),
            name: z.string(),
            size: z.number().optional(),
          }),
        )
        .optional(),
      borderColor: z.string().optional(),
      bgColor: z.string().optional(),
      skillColor: z.string().optional(),
    }),
});

export const collections = { projects };