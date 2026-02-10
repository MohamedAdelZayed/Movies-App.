import Image from "next/image";
import { CastMember } from "../types/tmdb";

export default function Cast({cast} : { cast : CastMember[] } ) {


  return (
    //    Infinite Slider
    <div className="mt-5 overflow-hidden">
        
          <h3 className="text-white font-bold uppercase tracking-widest text-lg mb-4 flex items-center gap-3">
            <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
            Top Cast
          </h3>
        
          <div className="cast-mask-effect">
            
            <div className="cast-slider-container gap-8 py-4">
        
              {/* تكرار المصفوفة لضمان حركة مستمرة */}
              { cast.length > 0 ? [...cast, ...cast]?.map((actor, index) => (
        
                <div key={index} className="w-24 sm:w-32 flex-shrink-0 flex flex-col items-center group cursor-pointer">
                
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-4 transition-all duration-500 group-hover:scale-110">
                
                    <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/20 blur-xl transition-all duration-500"></div>
                
                    <Image
                      src={
                        actor.profile_path && actor.profile_path.length > 0  
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
                        : "/placeholder.jpg"}
                      alt={actor.name}
                      fill
                      sizes="(max-width: 640px) 64px, 96px"
                      className="rounded-full object-cover border-2 border-white/10 group-hover:border-yellow-400 transition-all shadow-2xl relative z-10"
                    />
                
                  </div>
                
                  <p className="text-[10px] sm:text-sm text-gray-300 group-hover:text-white font-semibold text-center truncate w-full">{actor.name}</p>
                
                  <p className="text-[9px] sm:text-[11px] text-gray-500 text-center uppercase tracking-tighter mt-0.5">{actor.character}</p>
                
                </div>
              
              ))
            
              : <p>No Cast Found</p>
        
            }
            </div>
          </div>
    </div>
      
  )
}
