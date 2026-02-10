
import { Suspense } from "react";
import HeroSliderServer from "./HeroSlider/HeroSliderServer";
import TopRatedMovies from "./TopRatedMovies";
import TrendingMovies from "./TrendingMovies";
import TrendingSeries from "./TrendingSeries";
import { ImSpinner9 } from "react-icons/im";
export default function HeroSection() {
  return (
    <>

       <Suspense fallback={<LocalSpinner />}>
          <HeroSliderServer />
       </Suspense>
       
       <TrendingMovies/>
       <TopRatedMovies/>
       <TrendingSeries/>
    </>
  )
}


function LocalSpinner() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-9999 bg-black/80 backdrop-blur-sm">
              
              {/* Spinner */}
              <div className="relative">
                 <ImSpinner9 className="animate-spin text-5xl text-yellow-400" />
                 <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"></div>
              </div>
        
              <p className="mt-4 text-yellow-400 font-bold tracking-widest text-sm animate-pulse">
                WAIT A MOMENT...
              </p>
              
            </div>
    );
}
