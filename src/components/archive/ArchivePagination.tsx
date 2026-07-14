import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArchivePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, 4, 5];

  return (
    <nav className="mt-10 flex items-center justify-center gap-5">
      <button className="flex items-center gap-2 text-[16px] text-[#917DEC] transition hover:text-white">
        <ChevronLeft size={20} />
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
            currentPage === page
              ? "bg-[#917DEC] text-white"
              : "text-[#917DEC] hover:bg-[#917DEC]/15"
          }`}
        >
          <span className="-translate-x-[2px] font-['Poppins'] text-[18px] italic font-normal leading-none tracking-[-0.54px]">
            {page}
          </span>
        </button>
      ))}

      <span className="font-['Poppins'] text-[18px] italic font-normal leading-[150%] tracking-[-0.54px] text-[#917DEC]">
        ...
      </span>

      <button
        onClick={() => setCurrentPage(10)}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
          currentPage === 10
            ? "bg-[#917DEC] text-white"
            : "text-[#917DEC] hover:bg-[#917DEC]/15"
        }`}
      >
        <span className="-translate-x-[2px] font-['Poppins'] text-[18px] italic font-normal leading-none tracking-[-0.54px]">
          10
        </span>
      </button>

      <button className="flex items-center gap-2 text-[16px] text-[#917DEC] transition hover:text-white">
        Next
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default ArchivePagination;