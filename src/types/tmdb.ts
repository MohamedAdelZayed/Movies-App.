
export type Genre = {
  id: number;
  name: string;
};

export type MediaItemTypeExtended = MediaItemType & {
  genres?: Genre[];
};


export type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

// =======================
// Media Item (Lists / Cards)
// =======================

export type MediaItemType = {
  id: number;

  media_type?: "movie" | "tv";

  /* movie */
  title?: string;
  original_title?: string;
  release_date?: string;
  runtime?: number | null;

  /* tv */
  name?: string;
  original_name?: string;
  first_air_date?: string;
  episode_run_time?: number[];

  /* shared */
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  profile_path?: string | null;

  vote_average: number;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  video?: boolean;

  original_language?: string;
  origin_country?: string[];

  /* genres (lists use ids only) */
  genre_ids?: number[];
};


// =======================
// Media Details (Details Page)
// =======================

export type MediaDetailsType = {
  id: number;

  /* Identifiers (Movie use 'title', TV use 'name') */
  title?: string;          // خاص بالفيلم
  name?: string;           // خاص بالمسلسل
  original_title?: string;  // خاص بالفيلم
  original_name?: string;   // خاص بالمسلسل
  imdb_id: string | null;

  /* Dates (Movie use 'release_date', TV use 'first_air_date') */
  release_date?: string;    // خاص بالفيلم
  first_air_date?: string;  // خاص بالمسلسل
  last_air_date?: string;   // آخر موعد عرض (للمسلسلات)

  /* Duration & Episodes */
  runtime?: number;                // خاص بالفيلم (بالدقائق)
  episode_run_time?: number[];     // خاص بالمسلسل (مصفوفة دقائق)
  number_of_episodes?: number;     // إجمالي الحلقات
  number_of_seasons?: number;      // إجمالي المواسم

  /* Content */
  overview: string;
  tagline: string;
  status: string;                  // مثل "Released" أو "Ended" أو "Returning Series"
  type?: string;                   // نوع المحتوى (Scripted, Documentary...)

  /* Images */
  poster_path: string | null;
  backdrop_path: string | null;

  /* Rating */
  vote_average: number;
  vote_count: number;
  popularity: number;

  /* Flags */
  adult: boolean;
  video?: boolean;

  /* Language & Country */
  original_language: string;
  origin_country: string[];

  /* Genres */
  genres: Genre[];

  /* Money (Mainly for Movies) */
  budget?: number;
  revenue?: number;

  /* Production & Companies */
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  created_by?: CreatedBy[];         // من صنع المسلسل (بديل المخرج في الأفلام)
  networks?: Network[];             // القنوات العارضة (للمسلسلات مثل Netflix)

  /* Links */
  homepage: string | null;

  /* Collection & Seasons */
  belongs_to_collection?: any | null; // للأفلام (مثل سلاسل مارفل)
  seasons?: Season[];                 // للمسلسلات (تفاصيل المواسم)
  last_episode_to_air?: Episode | null;
  next_episode_to_air?: Episode | null;

  /* Custom helper for your logic */
  media_type?: "movie" | "tv"; 
};


export type CreatedBy = {
  id: number;
  name: string;
  profile_path: string | null;
};

export type Network = {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  runtime: number;
};


export type TrendingResponseType = {
  page: number;
  results: MediaItemType[];
  total_pages: number;
  total_results: number;
}
  


export type CastMember = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;

  known_for_department: string;
  name: string;
  original_name: string;

  order: number;
  popularity: number;

  profile_path: string | null;
};


export type CrewMember = {
  adult: boolean;
  credit_id: string;

  department: string; // Production, Directing, Writing...
  gender: number | null;
  id: number;

  job: string; // Director, Producer, Writer...
  known_for_department: string;

  name: string;
  original_name: string;

  popularity: number;
  profile_path: string | null;
};



export type Mediafilters = {
  query?: string;
  genre?: string;
  year?: string;
  rating?: string;
  language?: string;
  sortBy?: string;
  page?: string;
};
