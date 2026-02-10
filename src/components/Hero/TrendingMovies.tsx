
import { MediaItemType } from "../../types/tmdb";
import Card from "../Card";

export default async function TrendingMovies() {
  
    // Fetch All Trending Movies in last week 
  async function getTrendMovies(){ 
    try{

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`, {
      
        next: { revalidate: 3600 }, // الكاش هيفضل شغال لمدة ساعة كاملة
      
      } );

      // افلام عربى
      // const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=ar`);

      const data = await res.json();

      const allMovies = data?.results?.slice(0,10) || []

      return allMovies

    } catch(err) {
      console.log(err)
    }
  }


    const movies : MediaItemType[] = await getTrendMovies();
  
  return (
    <section className="py-8 px-2 sm:px-3 md:px-8 lg:px-15 bg-black text-white">
    
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        Trending Movies
      </h2>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 ">
    
        { movies?.length > 0 ? (

          movies?.map((movie) => 
          
            <Card  key={movie.id} media = {movie} />
        
        )
        
         ) : (
        
            <p className="text-gray-400">No Trending Movies Found</p>
        
        )}
      </div>
    
    </section>
  );
}
