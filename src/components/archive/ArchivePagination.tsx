import { ChevronLeft, ChevronRight } from "lucide-react";

const ArchivePagination = () => {
  return (
    <nav className="mt-10 flex items-center justify-center gap-5 text-[#9B83F6]">
      <button className="flex items-center gap-2 text-sm">
        <ChevronLeft size={20} />
        Previous
      </button>

      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B6DFF] text-white">
        1
      </button>

      {[2, 3, 4, 5].map((page) => (
        <button key={page} className="text-lg">
          {page}
        </button>
      ))}

      <span className="text-lg">...</span>

      <button className="text-lg">10</button>

      <button className="flex items-center gap-2 text-sm">
        Next
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default ArchivePagination;