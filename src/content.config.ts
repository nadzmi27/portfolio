import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// projects
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      label: z.string(),
      labels: z.array(z.string()).optional(),
      description: z.string(),
      importance: z.number().optional(),
      image: image(),
      imageAlt: z.string().optional(),
      tooltip: z.string().optional(),
      href: z.string().optional(),
      links: z.array(
        z.object({
          icon: z.string().optional(),
          name: z.string().optional(),
          size: z.number().optional(),
          href: z.string()
        })
      ).optional(),
      skills: z
        .array(
          z.object({
            icon: z.string().optional(),
            name: z.string().optional(),
            size: z.number().optional(),
          }),
        )
        .optional(),
      borderColor: z.string().optional(),
      bgColor: z.string().optional(),
      skillColor: z.string().optional(),
      skillBorder: z.string().optional(),
      theme: z.enum(["light", "dark"]).optional()
    }),
});

// posts
const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tooltip: z.string().optional(),
      href: z.string().optional(),
      tags: z
        .array(
          z.object({
            icon: z.string().optional(),
            name: z.string().optional(),
            size: z.number().optional(),
            color: z.string().optional(),
          }),
        )
        .optional(),
    }),
});
export const collections = { projects, posts };