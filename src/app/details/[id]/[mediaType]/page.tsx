"use client";

import Image from "next/image";
import TrailerModal from "@/src/components/TrailerModal";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CastMember, CrewMember, MediaDetailsType, MediaItemType } from "@/src/types/tmdb";
import DetailsSkeleton from "@/src/components/DetailsSkeleton";
import Recommended from "@/src/components/Recommended";
import Cast from "@/src/components/Cast";
import { formatDuration } from "@/src/utils/formatDuration";


export default function DetailsPage() {


  const {id , mediaType } = useParams()        // movie OR serie Id
 

  const [mediaDetails, setMediaDetails] = useState<MediaDetailsType | null>(null)
  
  const [cast, setCast] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true)


// get movie OR serie details
  function getDetails(){

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;


    const url = 
     mediaType === "movie" 
      ?`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US` 
      :`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`


    return axios.get<MediaDetailsType>(url)
    .then( (res) => {
      
      setMediaDetails(res.data)
    
    } ).catch( (err) => {
      console.log(err)
    } )

  }


  // get movie OR serie cast/crew
   function getCast(){

     const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

     const url =
      mediaType === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      :`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`

     
     return axios.get(url)
      .then( (res) => {
      
      const topCast  = res?.data?.cast?.slice(0,7)

      setCast(topCast)


      const director : CrewMember = res.data?.crew.find( (ele : CrewMember ) => 
    
        mediaType === "movie" ?  ele.job === "Director" : ele.department === "Directing"
    )


      setDirector(director?.name || "Unknown");
    
    } ).catch( (err) => {
      console.log(err)
    } )

  }


  function closeTrailerModal(){
    setShowModal(false)
  }

  




useEffect(() => {
  if (!id || !mediaType) return;

  setIsLoading(true);

  Promise.allSettled([getDetails(), getCast()]).finally(() => setIsLoading(false));

}, [id, mediaType]);


const parsedMediaId = typeof id === "string" ? Number(id) : null;

// const parsedMediaType =
//   mediaType === "movie" || mediaType === "tv" ? mediaType : null;

  const parsedMediaType: "movie" | "tv" | undefined =
  mediaType === "movie" ? "movie" :
  mediaType === "tv" ? "tv" :
  undefined;



if (!mediaDetails) {
  return <DetailsSkeleton />;
}


  return (
    <div className="bg-black text-white min-h-screen">

      {/* Backdrop */}
      <section
        className="relative h-[240px] sm:h-[360px] md:h-[480px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${ mediaDetails?.backdrop_path || mediaDetails?.poster_path })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90" />
      </section>

      {/* Details Section */}
<section className="relative z-10 container mx-auto px-2 sm:px-1 lg:px-8 -mt-32 md:-mt-48">
  <div className="rounded-3xl p-1 md:p-10 shadow-2xl">

    <div className="flex flex-col md:flex-row gap-8 lg:gap-14">
      
      {/* Poster Side */}
      <div className="flex flex-col items-center md:items-start flex-shrink-0">
       
        <div className="relative group w-52 sm:w-64 md:w-72 lg:w-80 transition-transform duration-500 hover:scale-105">
       
          {mediaDetails?.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`}
              alt={mediaDetails?.title || mediaDetails?.name || "Poster" }
              width={320}
              height={480}
              priority
              className="rounded-2xl shadow-2xl object-cover border border-white/5"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-800 rounded-2xl flex items-center justify-center">No Image</div>
          )}
          


        </div>

        <button
          onClick={() => setShowModal(true)}
          className=" cursor-pointer mt-6 w-full max-w-[200px] md:max-w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all active:scale-95"
        >
          Watch Trailer
        </button>
      </div>

      {/* Info Side */}
      <div className="flex-1 flex flex-col min-w-0">
                
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight break-words">
          {mediaDetails?.title || mediaDetails?.name}
        </h1>

        <div className="flex items-center gap-4 mt-3">
        
          <div className="flex items-center bg-white/10 px-3 py-1 rounded-full border border-white/10">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-bold text-white">{mediaDetails?.vote_average?.toFixed(1)}</span>
          </div>
        
          <span className="text-gray-400 text-sm font-medium">
            {
              mediaType === "movie" 
              ?mediaDetails?.release_date ? new Date(mediaDetails.release_date).getFullYear() : "" 
              :mediaDetails?.first_air_date ? new Date(mediaDetails.first_air_date).getFullYear() : "" 
            }
          </span>



          {/* المدة (للفيلم) أو المواسم (للمسلسل) */}
  <span className="text-gray-400 text-sm border border-gray-600 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
    {mediaType === "movie"
  ? formatDuration(mediaDetails?.runtime)
  : (mediaDetails?.number_of_seasons
      ? `${mediaDetails.number_of_seasons} Seasons`
      : "")
}
  </span>


        </div>

        {/* Genres Section  */}
<div className="flex flex-wrap gap-2 mt-5">
  {mediaDetails?.genres?.map((genre) => (
    <span 
      key={genre.id} 
      className="px-3 py-1 text-[11px] md:text-xs font-bold uppercase tracking-widest text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 rounded-full backdrop-blur-md transition-all hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-default"
    >
      {genre.name}
    </span>
  ))}
</div>

        <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl line-clamp-4 md:line-clamp-none italic">
          {mediaDetails?.overview || "No description available for this title."}
        </p>

        {/* Metadata Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-8 border-t border-white/10 pt-6">

          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Release:</span>
            <span className="text-white">
              {
              mediaType === "movie" 
              ?mediaDetails?.release_date ? mediaDetails.release_date : "" 
              :mediaDetails?.first_air_date ? mediaDetails.first_air_date : "" 
              }
            </span>
          </div>
        
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Director:</span>
            <span className="text-white">{director}</span>
          </div>
        
        </div>

       

        {/* Cast*/}
          <Cast cast={cast} />
          
      </div>

    </div>
  
  </div>
</section>


      {/* Recommended */}
      {parsedMediaId && parsedMediaType && (
  <Recommended
    mediaId={parsedMediaId}
    mediaType={parsedMediaType}
  />
)}




      {/* Trailer Modal */}
      {
              showModal && mediaDetails && (
                      
                // <TrailerModal
                    
                //   closeTrailerModal={closeTrailerModal}
                      
                //   selectedMedia={{ ...mediaDetails , media_type: mediaType }}

                // />

                <TrailerModal
  closeTrailerModal={closeTrailerModal}
  selectedMedia={{ ...mediaDetails, media_type: parsedMediaType }}
/>

            
                )
          }

    </div>
  );
}
