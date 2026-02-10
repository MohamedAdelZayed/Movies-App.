
import { MediaItemType } from "@/src/types/tmdb";
import Card from "../Card";

export default async function TrendingSeries() {
  
    // Fetch All Trending TV Series
  async function getTrendingSeries(){ 
    try{

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`);

    // مسلسلات عربى
      // const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_original_language=ar`);


      const data = await res.json();

      const allSeries = data?.results?.slice(0,10)

      return allSeries

    } catch(err) {
      console.log(err)
    }
  }


    const series : MediaItemType[] = await getTrendingSeries();

  
  return (
    <section className="py-8 px-2 sm:px-3 md:px-8 lg:px-15 bg-black text-white">
    
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        Trending Series
      </h2>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
    
        { series?.length > 0 ? (

          series?.map( (seriee) => 
          
            <Card  key={seriee.id} media = {seriee} />
        
        )
        
         ) : (
        
            <p className="text-gray-400">No Trending Movies Found</p>
        
        )}
      </div>
    
    </section>
  );
}
