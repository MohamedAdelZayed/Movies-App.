import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type Props = {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: Props) {

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => i + Math.max(1, currentPage - 2)
  ).filter(p => p <= totalPages);



  const formatPage = (num: number) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num;
};


  return (
    <div className="flex justify-center items-center gap-2 py-10 bg-black">

      {/* زر السابق */}
      {currentPage > 1 ? (
  <Link
    href={createPageLink(currentPage - 1)}
    className="px-4 py-2 rounded-md text-white font-semibold border border-[#252525] 
               bg-black hover:bg-yellow-500 hover:text-black transition-all"
  >
    <HiChevronLeft size={20} />
  </Link>
) : (
  <span
    className="px-4 py-2 rounded-md border border-[#252525] 
               text-gray-600 cursor-not-allowed"
  >
    <HiChevronLeft size={20} />
  </span>
)}

  
      {/* أرقام الصفحات */}
      <div className="flex gap-2">
        {pages?.map((page) => (
          <Link
            key={page}
            href={createPageLink(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-md font-bold border transition-all
              ${page === currentPage 
                ? "bg-yellow-500 text-black border-yellow-500" 
                : "bg-black text-white border-[#252525] hover:border-yellow-400"
              }`}
          >
            {formatPage(page)}

          </Link>
        ))}

        {currentPage + 2 < totalPages && (
          <span className="text-white flex items-end pb-2 px-1">...</span>
        )}

        {totalPages > 5 && !pages.includes(totalPages) && (

          <Link
            href={createPageLink(totalPages)}
            className="h-10 min-w-[2.5rem] px-2 flex items-center justify-center rounded-md font-bold border border-[#252525] text-white hover:border-yellow-400"
          >
            {formatPage(totalPages)}

          </Link>
        )}
      </div>

      {/* زر التالي */}
      {currentPage < totalPages ? (
  <Link
    href={createPageLink(currentPage + 1)}
    className="px-4 py-2 rounded-md text-white font-semibold border border-[#252525] 
               bg-black hover:bg-yellow-500 hover:text-black transition-all"
  >
    <HiChevronRight size={20} />
  </Link>
) : (
  <span
    className="px-4 py-2 rounded-md border border-[#252525] 
               text-gray-600 cursor-not-allowed"
  >
    <HiChevronRight size={20} />
  </span>
)}


    </div>
  );
}
