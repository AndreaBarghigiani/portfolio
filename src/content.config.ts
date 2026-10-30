import { glob } from 'astro/loaders';
import { defineCollection, type ImageFunction, reference, z } from 'astro:content';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z
    .object({
      creator: z.string().optional(),
    })
    .optional(),
  robots: z.string().optional(),
});

const seoSchema = (image: ImageFunction) =>
  z
    .object({
      image: image().optional(),
    })
    .merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      seo: seoSchema(image),
    }),
});

const jobCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyIntro: z.string().optional(),
    location: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string().optional(),
    tools: z.array(z.string()).optional(),
  }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const seriesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/series' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      seo: seoSchema(image),
    }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: image().optional(),
      seo: seoSchema(image),
      series: z
        .object({
          ref: reference('series'),
          number: z.number().int().positive(),
          note: z.string().optional(),
        })
        .optional(),
    }),
});

const courseNotesCollection = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/notes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      url: z.string().url(),
      description: z.string(),
      certificateUrl: z.string().url().optional(),
      certificateImage: image().optional(),
    }),
});

const courseModulesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/modules' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    order: z.number().int().positive().optional(),
    course: z.string().optional(),
  }),
});

const courseLessonCollection = defineCollection({
  loader: glob({ pattern: '**/lesson/**/index.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    course: z.string().optional(),
    module: reference('courseModules').optional(),
    moduleOrder: z.number().int().positive().optional(),
    order: z.number().int().positive().optional(),
    description: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const projectUrl = z
  .string()
  .url()
  .refine((value) => /^https?:\/\//i.test(value), {
    message: 'Project links must use http or https.',
  });

const projectImage = (image: ImageFunction) =>
  z.object({
    src: image(),
    alt: z.string().trim().min(1, 'Provide meaningful alternative text.'),
    caption: z.string().trim().min(1).optional(),
  });

const projectMediaUrl = z.string().refine((value) => {
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}, 'Media sources must be root-relative paths or http(s) URLs.');

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().trim().min(1),
      summary: z.string().trim().min(1),
      order: z.number().int().nonnegative(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      logo: projectImage(image).optional(),
      cover: projectImage(image).optional(),
      media: z
        .array(
          z.discriminatedUnion('type', [
            z.object({ type: z.literal('image'), ...projectImage(image).shape }),
            z.object({
              type: z.literal('video'),
              src: projectMediaUrl,
              title: z.string().trim().min(1),
              width: z.number().int().positive(),
              height: z.number().int().positive(),
              transcript: z.string().trim().min(1),
              captions: z
                .object({
                  src: projectMediaUrl,
                  label: z.string().trim().min(1),
                  srclang: z.string().trim().min(1),
                })
                .optional(),
            }),
          ])
        )
        .optional(),
      website: projectUrl.optional(),
      github: projectUrl.optional(),
    }),
});

export const collections = {
  pages: pageCollection,
  jobs: jobCollection,
  links: linkCollection,
  posts: postCollection,
  series: seriesCollection,
  notes: courseNotesCollection,
  courseModules: courseModulesCollection,
  lessonNotes: courseLessonCollection,
  projects: projectCollection,
};
