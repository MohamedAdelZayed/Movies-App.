"use client"

import Image from "next/image";
import Link from "next/link";
import { MediaItemType } from "../types/tmdb";
import { FaYoutube } from "react-icons/fa";
import TrailerModal from "./TrailerModal";
import { useState } from "react";

export default function Card({ media }: { media: MediaItemType }) {

    const [showModal, setShowModal] = useState(false);
const [selectedMedia, setSelectedMedia] = useState<MediaItemType | null>(null);


    function closeTrailerModal(){
     setShowModal(false)
    }  


  return (
    <>
    <div
      className="
        group relative
        bg-[#18181b]
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition-all duration-300
        w-full
      "
    >
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden">

      <Link href={`/details/${media.id}/${media.media_type || 'movie'}`} className="absolute inset-0">

        <Image
          src={
            media.poster_path
             ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
             : "/placeholder.jpg" 
          }

          alt={media.title || media.name || "Untitled"}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
          sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 20vw"
        />

        </Link>

        <div className="absolute top-3 right-3 z-10">
    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
      <span className="text-yellow-400 text-xs sm:text-sm font-bold">⭐</span>
      <span className="text-white text-xs sm:text-sm font-black">
        {media.vote_average?.toFixed(1) || "N/A"}
      </span>
    </div>
  </div>

      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2 bg-red500 ">

        <Link href={`/details/${media.id}/${media.media_type || 'movie'}`} >
         
          <h3
            className="
              text-sm sm:text-base
              font-semibold
              text-white
              line-clamp-2
              hover:underline
              min-h-[2.5rem]
            "
          >
             {
               media.title ? media.title : media.name 
             }
          
          </h3>

        </Link>



        <button

            onClick={ () => {
                setShowModal(true) 
                setSelectedMedia({ ...media, media_type: media.media_type ? media.media_type : "movie" })
            }
            }

            className="
              w-full cursor-pointer
              flex items-center justify-center gap-2
              py-2
              rounded-full
              bg-yellow-400 text-black
              font-semibold
              text-xs sm:text-sm
              hover:bg-yellow-500
              transition
            "
          >
            <FaYoutube className="w-5 h-5" />
            Watch Trailer
          </button>


      </div>

      </div>
      

      {
        showModal &&(
                
          <TrailerModal
              
            closeTrailerModal={closeTrailerModal}
                
            selectedMedia={{ ...media, media_type: media.media_type ? media.media_type : "movie" }}

          />

          
      
          )
    }

    </>
  );
}
