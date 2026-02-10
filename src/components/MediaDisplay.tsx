import { MediaItemType } from "@/src/types/tmdb";
import Card from "./Card";

  export default async function MediaDisplay({ items } : {items: MediaItemType[]} ) {


    return (

      <div className="bg-black text-white min-h-[50vh] w-full flex justify-center">
        <section className="py-8 px-2 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 max-w-320 w-full">
          
          {items && items.length > 0 ? (
            <div className="flex justify-center">
              <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 justify-items-center"

              >
                {items?.map((item) => (
                  <div key={item.id} className="w-full aspect-2/3">
                    <Card
                      media={{
                        ...item,
                        media_type:
                          item.media_type || 
                          (item.first_air_date ? "tv" : "movie"),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (

            /* حالة عدم وجود نتائج */
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-gray-500 text-xl font-medium tracking-wide">
                No items found matching your criteria.
              </p>
            </div>
          
          )}

        </section>
      </div>
    );
  }