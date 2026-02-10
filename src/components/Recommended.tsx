"use client";

import { useEffect, useState } from "react";
import { MediaItemType } from "../types/tmdb";
import Card from "./Card";
import axios from "axios";

export default function Recommended({ mediaId, mediaType }: { mediaId: number | string ; mediaType: "movie" | "tv" }) {
  
  const [recommend, setRecommend] = useState<MediaItemType[]>([]);
  
  const [loading, setLoading] = useState(true);

  async function getRecommend() {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?api_key=${apiKey}&language=en-US`;

    try {
      setLoading(true);
      const res = await axios.get(url);
      setRecommend(res?.data?.results?.slice(0, 12)); 
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mediaId && mediaType) {
      getRecommend();
    }
  }, [mediaId, mediaType]);

  if (!loading && recommend.length === 0) return null;

  return (
    <section className="container mx-auto px-2 sm:px-1 lg:px-8 py-12 border-t border-white/5">
      
      
      <h3 className="text-white font-bold uppercase tracking-widest text-lg mb-8 flex items-center gap-3">
        <span className="w-2 h-8 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)]"></span>
        Recommended {mediaType === "movie" ? "Movies" : "Series"}
      </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-2.5">

        {recommend?.map((item) => (

            <Card key={item.id}
              media={{
                ...item,
                media_type: item.media_type || mediaType,
              }}
            />

        ))}
      </div>
    </section>
  );
}