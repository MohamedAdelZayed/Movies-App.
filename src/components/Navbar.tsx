"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CiMenuFries, CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import Image from "next/image";
import { FaFilm, FaTv } from "react-icons/fa";
import { MediaItemType } from "../types/tmdb";

export default function Navbar() {
  const pathname = usePathname(); // to highlight active link

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);


  const [suggests, setSuggests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const navlinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Series", path: "/tvSeries" },
  ];


  function getSuggests(){
    
    if (!searchQuery.trim() || searchQuery.trim().length < 3) {
    setSuggests([]);
    return;
  }

    setIsLoading(true)

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}`)
    .then( (res) => {

      // const mediaResults = res.data.results.filter( (item : MediaItemType) => item.media_type !== "person");
      const mediaResults = res.data.results.filter((item: MediaItemType) => item.media_type === "movie" || item.media_type === "tv");

      setSuggests(mediaResults)
    })
    .catch( (err) => {
      console.log(err)
    })
    .finally( () => {
      setIsLoading(false)
    })

  }


   useEffect(() => {
  if (!searchQuery.trim()) {
    setSuggests([]);
    return;
  }

  const timer = setTimeout(() => {
    getSuggests();
  }, 300); // 300ms بعد آخر كتابة

  return () => clearTimeout(timer);
}, [searchQuery]);


// useEffect(() => {
//   const query = searchQuery.trim();
  
//   if (query.length < 3) {
//     setSuggests([]);
//     setIsLoading(false); // تأكد إن الـ Loading قفل
//     return;
//   }

//   const timer = setTimeout(() => {
//     getSuggests();
//   }, 300);

//   return () => clearTimeout(timer);
// }, [searchQuery]);



  return (
    <motion.nav
      className={`  ${ pathname === "/movies" ? "bg-black" : "bg-transparent"} text-white w-full py-2.5 z-50 px-2 md:px-10 xl:px-12 absolute top-0 left-0`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        
      {/* desktop & mobile top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* logo + mobile menu button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          
          <Link href="/" className="flex flex-col items-center">
             
             <span className="text-2xl md:text-xl lg:text-3xl font-bold text-yellow-400">
                  Movies Stream
             </span>
             
             <span className="text-xs lg:text-base text-white">
                  Latest Movies & TV Shows
             </span>
           </Link>

          {/* mobile menu toggle */}
          <motion.button
            className="md:hidden text-white hover:text-white/80 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <IoClose className="w-6 h-6" /> : <CiMenuFries className="w-6 h-6" />}
          </motion.button>
        </div>


        {/* desktop search */}
        <motion.div className="relative w-full md:w-1/3 md:mx-8 hidden md:block">
          
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsTyping(true);
            }}
            type="text"
            placeholder="Quick Search..."
            aria-label="Search"
            className="w-full py-1.5 px-4 lg:py-3 bg-white text-sm text-gray-500 placeholder-gray-500 focus:outline-none rounded-xl border border-t-gray-500 focus:border-white pr-10"
          />

          {/* Icons: Spinner or Close or Search */}
  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
    {isLoading ? (
      <ImSpinner9 className="text-yellow-500 animate-spin w-5 h-5" />
    ) : searchQuery.length > 0 ? (
      <IoClose 
        className="text-gray-400 cursor-pointer hover:text-red-500 w-5 h-5" 
        onClick={() => { setSearchQuery(""); setSuggests([]); }}
      />
    ) : (
      <CiSearch className="text-gray-400 w-5 h-5" />
    )}
  </div>

          {/* Results Dropdown */}
    <AnimatePresence>
  {searchQuery.trim().length >= 1 && isTyping && (
    <motion.ul
      // --- بداية الفجر ---
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ 
        type: "spring", 
        stiffness: 500,
        damping: 25 
      }}
      className="absolute top-full left-0 w-full bg-white text-gray-900 rounded-xl mt-2 shadow-2xl max-h-80 overflow-hidden overflow-y-auto z-50 border border-gray-200"
    >
      {suggests?.length > 0 ? (
        suggests?.map((item: MediaItemType, index: number) => (
          <motion.li 
            key={item.id} 
            onClick={() => { setIsTyping(false); setSearchQuery(""); }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }} 
            whileHover={{ x: 5 }} 
          >
            <Link
              href={`/details/${item.id}/${item.media_type || 'movie'}`}
              className="px-3 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
            >
              {item.poster_path || item.profile_path ? (
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                      : `https://image.tmdb.org/t/p/w92${item.profile_path}`
                  }
                  width={45}
                  height={65}
                  alt={item.title || item.name || "Unknown"}
                  className="w-11 h-12 object-cover rounded-md shrink-0 bg-gray-800"
                />
              ) : (
                <div className="w-11 h-11 rounded-md shrink-0 bg-gray-800 flex items-center justify-center text-yellow-400">
                  {item.media_type === "movie" ? <FaFilm /> : <FaTv />}
                </div>
              )}

              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-sm text-gray-900 truncate">
                  {item.title || item.name}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded uppercase font-bold text-[9px]">
                    {item.media_type === 'tv' ? 'TV Series' : item.media_type}
                  </span>
                  {item?.release_date && <span>• {item?.release_date?.slice(0, 4)}</span>}
                  {item?.first_air_date && <span>• {item?.first_air_date?.slice(0, 4)}</span>}
                </div>
              </div>
            </Link>
          </motion.li>
        ))
      ) : (
        !isLoading && (
          <li className="px-4 py-2 text-center">
            <p className="text-sm font-medium text-gray-600">No results found for "{searchQuery}"</p>
          </li>
        )
      )}
    </motion.ul>
  )}
</AnimatePresence>


        </motion.div>


        {/* desktop nav links */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navlinks?.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs sm:text-base font-medium relative text-white ${
                pathname === link.path ? "text-white" : "hover:text-white/80"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.span
                  className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 rounded-full"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden backdrop-blur-sm bg-[rgba(24,24,27,0.6)] z-50 absolute left-0 w-full px-4 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* mobile search bar */}
<motion.div className="relative w-full mb-4">
  <input
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setIsTyping(true);
    }}
    type="text"
    placeholder="Quick Search..."
    className="w-full py-2 px-4 bg-white placeholder-gray-500 text-gray-900 rounded-xl border border-gray-500 focus:outline-none focus:border-white pr-10"
  />


  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
    {isLoading ? (
      <ImSpinner9 className="text-yellow-500 animate-spin w-5 h-5" />
    ) : searchQuery.length > 0 ? (
      <IoClose 
        className="text-gray-400 cursor-pointer hover:text-red-500 w-5 h-5" 
        onClick={() => { 
          setSearchQuery(""); 
          setSuggests([]); 
        }}
      />
    ) : (
      <CiSearch className="text-gray-400 w-5 h-5" />
    )}
  </div>

  <AnimatePresence>
    {searchQuery.trim().length >= 1 && isTyping && (
      <motion.ul
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="absolute top-full left-0 w-full bg-white text-gray-900 rounded-xl mt-2 shadow-2xl max-h-60 overflow-y-auto z-[100] border border-gray-200"
      >
        {suggests?.length > 0 ? (
          suggests?.map((item: MediaItemType, index: number) => (
            <motion.li 
              key={item.id} 
              onClick={() => { setIsTyping(false); setSearchQuery(""); setIsMenuOpen(false); }} // بنقفل المنيو كمان
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={`/details/${item.id}/${item.media_type || 'movie'}`}
                className="px-3 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0"
              >
                <div className="w-10 h-12 relative shrink-0">
                   <Image
                     src={`https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`}
                     fill
                     alt="poster"
                     className="object-cover rounded-md bg-gray-800"
                   />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-xs text-gray-900 truncate">{item.title || item.name}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">{item.media_type}</span>
                </div>
              </Link>
            </motion.li>
          ))
        ) : (
          !isLoading && (
            <li className="px-4 py-3 text-center text-sm text-gray-600">No results found</li>
          )
        )}
      </motion.ul>
    )}
  </AnimatePresence>
</motion.div>

          {/* mobile nav links */}
          <nav className="flex flex-col items-center gap-2">
            {navlinks?.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block text-white text-base font-medium hover:text-white/80"
              >
                {link.name}
              </Link>
            ))}
          </nav>

        </motion.div>
      )}

    </motion.nav>
  );
}
