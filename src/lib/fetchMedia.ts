import { Mediafilters, MediaItemType } from "@/src/types/tmdb";

type MediaType = "movie" | "tv";

type FetchMediaResponse = {
  results: MediaItemType[];
  totalPages: number;
};

export async function fetchMedia(
  mediaType: MediaType,
  filters: Mediafilters
): Promise<FetchMediaResponse> {

  const { query, genre, year, rating, language, sortBy , page = "1" } = filters;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
  let results: MediaItemType[] = [];
  let totalPages = 1;

  const isMovie = mediaType === "movie";
  const dateKey = isMovie ? "release_date" : "first_air_date";

  try {
    if (query) {
      // 🔍 SEARCH
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`,
        { next: { revalidate: 3600 } }
      );

      const data = await res.json();
      results = data.results || [];

      totalPages = data.total_pages || Math.ceil((data.total_results || results.length) / 20);



      results = results.filter((item: any) => {
        if (genre && !item.genre_ids?.includes(Number(genre))) return false;
        if (rating && item.vote_average < Number(rating)) return false;
        if (language && item.original_language !== language) return false;

        if (year && item[dateKey]) {
          const itemYear = Number(item[dateKey].split("-")[0]);

          if (year.includes("-now")) {
            const start = Number(year.split("-")[0]);
            if (itemYear < start) return false;
          } 
          else if (year.includes("-")) {
            const [start, end] = year.split("-").map(Number);
            if (itemYear < start || itemYear > end) return false;
          } 
          else {
            if (itemYear !== Number(year)) return false;
          }
        }

        return true;
      });


      if (sortBy === "vote_average.desc") {
        results.sort((a, b) => b.vote_average - a.vote_average);
      }

      if (sortBy?.includes("date")) {
        results.sort(
          (a: any, b: any) =>
            new Date(b[dateKey] || "").getTime() -
            new Date(a[dateKey] || "").getTime()
        );
      }

    } else {
      // 🎬 / 📺 DISCOVER
      let url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&page=${page}`;

      if (genre) url += `&with_genres=${genre}`;
      if (rating) url += `&vote_average.gte=${rating}`;
      if (language) url += `&with_original_language=${language}`;
      if (sortBy) url += `&sort_by=${sortBy}`;

      if (year) {
        if (year.includes("-now")) {
          const start = year.split("-")[0];
          url += `&${dateKey}.gte=${start}-01-01`;
          url += `&${dateKey}.lte=${new Date().toISOString().slice(0, 10)}`;
        } 
        else if (year.includes("-")) {
          const [start, end] = year.split("-");
          url += `&${dateKey}.gte=${start}-01-01&${dateKey}.lte=${end}-12-31`;
        } 
        else {
          url += isMovie
            ? `&primary_release_year=${year}`
            : `&first_air_date_year=${year}`;
        }
      }

      const res = await fetch(url, { next: { revalidate: 3600 } });
      const data = await res.json();
      results = data.results || [];
      totalPages = data.total_pages || 1;
    }

    return { results, totalPages };
  } catch (err) {
    console.log("Media fetch error:", err);
    return { results: [], totalPages };

  }
}
