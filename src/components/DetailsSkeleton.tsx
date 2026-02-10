export default function DetailsSkeleton() {
  return (
    <div className="bg-black text-white min-h-screen animate-pulse">
      <div className="h-[240px] sm:h-[360px] md:h-[480px] bg-gray-800" />

      <section className="container mx-auto px-6 sm:px-12 md:px-40 mt-[-120px] relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-[240px] h-[360px] bg-gray-700 rounded-lg mx-auto md:mx-0" />

          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-700 w-2/3 rounded" />
            <div className="h-4 bg-gray-700 w-1/3 rounded" />
            <div className="h-20 bg-gray-700 w-full rounded" />

            <div className="space-y-2">
              <div className="h-4 bg-gray-700 w-1/2 rounded" />
              <div className="h-4 bg-gray-700 w-1/3 rounded" />
              <div className="h-4 bg-gray-700 w-1/4 rounded" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
