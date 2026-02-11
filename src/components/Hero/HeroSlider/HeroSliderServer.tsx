// HeroSlider.tsx
import { MediaItemType, TrendingResponseType } from "@/src/types/tmdb";
import HeroSliderClient from "./HeroSliderClient";

export default async function HeroSliderServer() {

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  
  // Fetch Trending Movies/Series on the server with caching
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    { next: { revalidate: 36000000000000 } } 
  );
  const data: TrendingResponseType = await res.json();

const trendingItems = data?.results?.slice(13,17) || [];

  // fetch runtime for movies
  const allTrend: MediaItemType[] = await Promise.all(
    trendingItems?.map(async (item) => {
      if (item.media_type === "movie") {
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}`,
          { next: { revalidate: 3600 } }
        );
        const details = await detailsRes.json();
        return { ...item, runtime: details.runtime, genres: details.genres };
      } else {
        return { ...item, runtime: null ,  genres: [] };
      }
    })
  );

  return <HeroSliderClient allTrend={allTrend} />;
}
