
import { MediaItemType } from "@/src/types/tmdb";
import Card from "../Card";

export default async function TopRatedMovies() {
  
    // Fetch All Top Rated Movies  
  async function getTopMovies(){ 
    try{

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);

      
      //  أفلام عربية (أعلى تقييم)
      // const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=ar&sort_by=vote_average.desc&vote_count.gte=50`);


      const data = await res.json();

      const allTopMovies = data?.results?.slice(0,10) || []
    
      return allTopMovies

    } catch(err) {
      console.log(err)
    }
  }


   const topMovies : MediaItemType[] = await getTopMovies();


  
  return (
      
    <section className="py-8 px-2 sm:px-3 md:px-8 lg:px-15 bg-black text-white">
    
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        Top Rated Movies
      </h2>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
    
        { topMovies?.length > 0 ? (

          topMovies?.map((movie) => 
          
            <Card key={movie.id} media={{ ...movie, media_type: "movie" }} />
        
        )
        
         ) : (
        
            <p className="text-gray-400">No Top Rated Movies Found</p>
        
        )}
      </div>
    
    </section>
  );
}
