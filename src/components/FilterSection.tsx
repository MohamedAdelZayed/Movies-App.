
"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterDropdown from "./FilterDropdown";

interface Genre {
  id: number;
  name: string;
}

interface FilterSectionProps {
  genres: Genre[];
  mediaType: "movie" | "tv";
}

export default function FilterSection({genres , mediaType} : FilterSectionProps ) {

  const [text, setText] = useState("")

  const [filters, setFilters] = useState({
   genre: "",
   year: "",
   rating: "",
   language: "",
   sortBy: "",
  });


  const searchParams = useSearchParams();


  useEffect(() => {
    const query = searchParams.get("query") || "";
    const genre = searchParams.get("genre") || "";
    const year = searchParams.get("year") || "";
    const rating = searchParams.get("rating") || "";
    const language = searchParams.get("language") || "";
    const sortBy = searchParams.get("sortBy") || "";

    setText(query);
    setFilters({ genre, year, rating, language, sortBy });
  }, [searchParams]);


  const router = useRouter()



  function handleSearch() {

    const params = new URLSearchParams(searchParams.toString());

  if (text.trim()) {
    params.set("query", text);
  } else {
    params.delete("query");
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
    else params.delete(key);
  });

  if(mediaType === "movie" ){
   router.push(`/movies?${params.toString()}`);
  }else if(mediaType === "tv"){
   router.push(`/tvSeries?${params.toString()}`);
  }

  }





  function handleReset() {
   setText("");
   setFilters({ genre: "", year: "", rating: "", language: "", sortBy: "" });

   if(mediaType === "movie" ){
    router.push(`/movies`);
   }else if(mediaType === "tv"){
    router.push(`/tvSeries`);
   }

}


 
  
  const filterOptions = {
    years: ["2025", "2024", "2020-now", "2010-2019", "2000-2009", "1990-1999"],
    rating: ["9", "8", "7", "6", "5", "4", "3", "2", "1"],
    languages : [
      { label: "English", value: "en" },
      { label: "Arabic", value: "ar" },
      { label: "French", value: "fr" },
      { label: "Spanish", value: "es" },
      { label: "German", value: "de" },
      { label: "Italian", value: "it" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Chinese", value: "zh" },
      { label: "Hindi", value: "hi" },
    ],
     sortBy : [
      { label: "Most Popular", value: "popularity.desc" },
      { label: "Newest", value: mediaType === "tv" ? "first_air_date.desc" : "release_date.desc" },
      { label: "Oldest", value: mediaType === "tv" ? "first_air_date.asc" : "release_date.asc" },
      { label: "Top Rated", value: "vote_average.desc" },
    ]

  };


  function onFilterChange(name: string, value: string | number) {
  setFilters(prev => ({ ...prev, [name]: value }));
}

// OR

// function onFilterChange(name, value) {
//   // نعمل نسخة من state القديم
//   const newFilters = { ...filters };

//   // نغير الفلتر اللي اتغير بالقيمة الجديدة
//   newFilters[name] = value;

//   // نحفظ التغيير
//   setFilters(newFilters);
// }




  return (
    <section className="bg-black text-white pt-26">
      <div className="px-3.5 md:px-10 xl:px-36">
        
        {/* Search Input Area */}
        <div className="mb-6">
        
          <label className="block mb-2 ml-1 text-sm font-semibold text-gray-300">
            Search
          </label>
        
          <input
            type="text"
            name="query"
            value={text}
            onChange={ (e) => {
              setText(e.target.value)
            } }
            placeholder= {`Search for a ${mediaType}`}
            autoComplete="off"
            className="bg-[#252525] rounded-xl focus:outline-none px-4 py-3 text-sm placeholder-white/60 text-white w-full border border-transparent focus:border-yellow-400 transition-all"
          />
        
        </div>

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <FilterDropdown
            label="Genre"
            name="genre"
            options={genres?.map((g : { id: number; name: string } ) => ({ label: g.name, value: g.id }))}
            
            value={filters?.genre || ""}
            onChange={onFilterChange}
          />
          
          <FilterDropdown
            label="Year"
            name="year"
            options={filterOptions?.years?.map((y) => ({ label: y, value: y }))}
            value={filters?.year || ""}
            onChange={onFilterChange}
          />
          
          <FilterDropdown
            label="Rating"
            name="rating"
            options={filterOptions?.rating?.map((r) => ({ label: `${r} +`, value: r }))}
            value={filters?.rating || ""}
            onChange={onFilterChange}
          />
          
          <FilterDropdown
            label="Language"
            name="language"
            options={filterOptions?.languages?.map((lang) => ({ label: lang.label, value: lang.value }))}
            value={filters?.language || ""}
            onChange={onFilterChange}
          />

          <FilterDropdown
            label="Sort By"
            name="sortBy"
            options={filterOptions.sortBy}
            value={filters?.sortBy || ""}
            onChange={onFilterChange}
          />

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <button 
              onClick={handleSearch} 
              className="cursor-pointer bg-yellow-400 text-black font-bold w-full hover:bg-yellow-500 transition-all rounded-md px-5 py-2 text-sm shadow-[0_0_15px_rgba(250,204,21,0.2)]"
            >
              Search
            </button>
            <button 
              onClick={handleReset} 
              className="cursor-pointer bg-[#252525] text-white font-bold w-full hover:bg-gray-700 transition-all rounded-md px-5 py-2 text-sm"
            >
              Reset
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}