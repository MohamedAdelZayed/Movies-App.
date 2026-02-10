"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MediaItemType } from "../types/tmdb";
import { ImSpinner9 } from "react-icons/im";

type TrailerModalTypes = {
    closeTrailerModal: () => void;
    selectedMedia: MediaItemType;
};

export default function TrailerModal({ closeTrailerModal, selectedMedia }: TrailerModalTypes) {

    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    
    const [loading, setLoading] = useState(false);


    // جلب التريلر
    async function getTrailer() {

        setLoading(true)

        if (!selectedMedia) return;

        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

        try {

            const url =
              selectedMedia.media_type === "movie"
               ? `https://api.themoviedb.org/3/movie/${selectedMedia.id}/videos?api_key=${apiKey}`
               : `https://api.themoviedb.org/3/tv/${selectedMedia.id}/videos?api_key=${apiKey}`;

            
            const res = await axios.get(url);

            const trailer = res?.data?.results.find(
              (v: any) => v.type === "Trailer" && v.site === "YouTube"
            );

            // لو ملقاش فيديو نوعه Trailer، خليه ياخد أول فيديو متاح وخلاص
            const finalVideo = trailer || res?.data?.results[0];

            if (finalVideo) {
              setTrailerUrl(`https://www.youtube.com/embed/${finalVideo.key}?autoplay=1`);
            }



            setLoading(false)

        } catch (err) {
            console.log(err);
        }
    }

    // useEffect(() => {
    //     getTrailer();
    // }, [selectedMedia]);



useEffect(() => {
  if (selectedMedia?.id) {
    getTrailer();
  }
}, [selectedMedia?.id]);


    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]"
            role="dialog"
            aria-label="Trailer Modal"
            onClick={closeTrailerModal} // يقفل لما تضغط بره
        >
            <button
                onClick={() => closeTrailerModal()}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition cursor-pointer"
            >
                <IoClose className="w-6 h-6" />
            </button>

            <div
                className="bg-[#18181b] p-4 rounded-lg max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    
                  {
                         
                    loading ? <div className="absolute inset-0 flex items-center justify-center">
                                <ImSpinner9 className="animate-spin text-4xl text-yellow-400" />
                              </div>

                    : trailerUrl ? (
                        
                        <iframe
                            src={trailerUrl}
                            title={`${selectedMedia.title || selectedMedia.name} Trailer`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                        > 
                        </iframe>
                
                    ) : (
                
                        <p className="text-white text-center mt-4">Trailer not available</p>
                
                )}
                
                </div>
            </div>
        </div>
    );
}
