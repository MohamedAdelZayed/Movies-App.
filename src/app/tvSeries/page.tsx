import FilterSection from "@/src/components/FilterSection";
import MediaDisplay from "@/src/components/MediaDisplay";
import Pagination from "@/src/components/Pagination";
import { fetchMedia } from "@/src/lib/fetchMedia";
import { Mediafilters, MediaItemType } from "@/src/types/tmdb";

type PageProps = {
  searchParams: Promise<Mediafilters>;
};

export default async function page({ searchParams }: PageProps) {
  let filters = await searchParams;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const currentPage = Number(filters.page || 1);
  filters = { ...filters, page: String(currentPage) };

  // جلب Genres
  const genresRes = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`,
         { cache: 'force-cache' } // هذه البيانات لا تتغير، خزنها للأبد
  );
  const genresData = await genresRes.json();
  const genres = genresData?.genres?.slice(0, 10);


  
  // جلب المسلسلات مع pagination
  const { results: series, totalPages } : { results: MediaItemType[]; totalPages: number } = await fetchMedia("tv", filters);

const MAX_PAGES = 500; // أو أي حد معقول
const totalPagesLimited = Math.min(totalPages, MAX_PAGES);


  return (
    <div className="mx-auto">
      <FilterSection genres={genres} mediaType="tv" />
      <MediaDisplay key={currentPage + (filters.query || "")} items={series} />
      <Pagination
        currentPage={Number(filters.page) || 1}
        totalPages={totalPages}
        searchParams={filters}
      />
    </div>
  );
}
