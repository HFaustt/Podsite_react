type ImageType = {
  height: number;
  url: string;
  width: number;
};

export type EpisodeType = {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  html_description: string;
  id: string;
  images: ImageType[];
  name: string;
  release_date: string;
};
