import avatar from '@/assets/images/me.png';
import type { seoSchemaWithoutImage } from '@/content.config';
import type { ImageMetadata } from 'astro';
import type { z } from 'astro/zod';

export type AuthorInfo = {
  name: string;
  avatar: ImageMetadata;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
};

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
};

type DefaultConfigurationType = {
  baseUrl: string;
  author: AuthorInfo;
  seo: Seo;
};

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: 'https://cupofcraft.dev',
  author: {
    name: 'Andrea Barghigiani',
    avatar,
    headline: 'Frontend and Product Engineer',
    username: 'cupofcraft',
    location: 'Palermo',
    pronouns: 'He/Him',
  },
  seo: {
    title: 'cupofcraft | The lab of Andrea Barghigiani',
    description:
      "Virtual space where Andrea shows the projects he's more proud of and writes about his leanings.",
    type: 'website',
    twitter: {
      creator: '@a_barghigiani',
    },
    robots: 'index, follow',
  },
};
