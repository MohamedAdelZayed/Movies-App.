"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import { formatDuration } from "@/src/utils/formatDuration";
import TrailerModal from "../../TrailerModal";
import { MediaItemType, MediaItemTypeExtended } from "@/src/types/tmdb";



export default function HeroSliderClient({ allTrend }: { allTrend: MediaItemTypeExtended[] }) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItemType | null>(null);

  const handleButtonClick = (index: number) => {
    setCurrentSlide(index);
    swiperInstance?.slideToLoop(index);
  };

  const closeTrailerModal = () => setShowModal(false);

  const truncateOverview = (overview: string, wordLimit = 15) => {
    const words = overview.split(" ");
    if (words?.length <= wordLimit) return overview;
    return words?.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    
    <section className="relative w-full h-[420px] sm:h-[450px] md:h-[600px] lg:h-[700px]">

  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{ delay: 3500, disableOnInteraction: false }}
    loop={allTrend?.length > 1}
    onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
    onSwiper={(swiper) => setSwiperInstance(swiper)}
    className="h-full w-full"
  >
    {allTrend?.map((item) => (

      <SwiperSlide key={item.id}>
        <div
          className="relative w-full h-[420px] sm:h-[450px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          {/* Content */}
          <div className="absolute mt-10 inset-0 flex items-center md:items-start md:pt-32 p-4 sm:p-8 md:p-16 text-white">
            <div className="max-w-xl">

              <Link href={`/details/${item.id}/${item.media_type}`}>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {item.title || item.name}
                </h1>
              </Link>

              {/* {/* Type  */}
                <span className="px-1 py-0.5 text-xs sm:text-sm rounded bg-black/60 ml-0.5">
                  {item.media_type === "movie" ? "🎬 Movie" : "📺 TV"}
                </span>


              

              {/* Genres */}
              <p className="mt-2 text-xs sm:text-sm text-yellow-400 font-semibold line-clamp-1 pl-0.5">
                {item.genres?.map((g) => g.name).join(", ")}
              </p>


              <div className="max-w-[85%] sm:max-w-full">
  <p className="block sm:hidden text-xs mt-2 leading-5 pl-0.5">
    {truncateOverview(item.overview, 25)}
  </p>

  <p className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3 line-clamp-4 sm:leading-5 md:leading-6 lg:leading-7 pl-0.5">
    {/* {item.overview} */}
    {truncateOverview(item.overview, 40)}
  </p>
</div>


<p className="text-xs sm:text-sm md:text-base lg:text-lg mt-3 flex flex-wrap gap-2 items-center">
                     <span>⭐ { item.vote_average ? item.vote_average.toFixed(1) : "5.7" }</span>
                     <span>|</span>
                     {item.runtime ? (
                      <span>🕒 {item.media_type === "movie" ? formatDuration(item.runtime) : "1h 17min"}</span>
                    ) : (
                      <span>🕒 1h 38min</span>
                    )}
                  </p>


              {/* CTA */}
              <button
                onClick={() => {
                  setSelectedMedia(item);
                  setShowModal(true);
                }}
                className="mt-4 bg-yellow-400 cursor-pointer text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition text-sm"
              >
                ▶ Watch Trailer
              </button>
            </div>
          </div>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Bullets */}
  {allTrend?.length > 1 && (
    <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
      {allTrend?.map((_, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          aria-label={`Slide ${index + 1}`}
          className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full border transition cursor-pointer ${
            index === currentSlide
              ? "bg-yellow-400 border-yellow-400"
              : "bg-transparent border-white"
          }`}
        />
      ))}
    </div>
  )}

  {showModal && selectedMedia && (
    <TrailerModal
      selectedMedia={selectedMedia}
      closeTrailerModal={closeTrailerModal}
    />
  )}
</section>

  );
}
