import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageCount = Math.max(totalPages, 1);

  const visiblePages = Array.from(
    {
      length: Math.min(5, pageCount),
    },
    (_, index) => index + 1,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      aria-label="페이지 이동"
      className="mt-10 flex items-center justify-center gap-[10px] lg:gap-5"
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-[12.6px] text-[#917DEC] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#917DEC] lg:gap-2 lg:text-[16px]"
      >
        <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
        Previous
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`${page}페이지로 이동`}
          aria-current={
            currentPage === page
              ? "page"
              : undefined
          }
          onClick={() => onPageChange(page)}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full p-0 transition lg:h-10 lg:w-10 ${
            currentPage === page
              ? "bg-[#917DEC] text-white"
              : "text-[#917DEC] hover:bg-[#917DEC]/15"
          }`}
        >
          <span className="flex h-full w-full items-center justify-center font-['Poppins'] text-[12.6px] font-normal italic leading-none tracking-[-0.378px] lg:text-[18px] lg:tracking-[-0.54px]">
            {page}
          </span>
        </button>
      ))}

      {pageCount > 6 && (
        <span className="font-['Poppins'] text-[18px] font-normal italic leading-[150%] tracking-[-0.54px] text-[#917DEC]">
          ...
        </span>
      )}

      {pageCount > 5 && (
        <button
          type="button"
          aria-label={`${pageCount}페이지로 이동`}
          aria-current={
            currentPage === pageCount
              ? "page"
              : undefined
          }
          onClick={() =>
            onPageChange(pageCount)
          }
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full p-0 transition lg:h-10 lg:w-10 ${
            currentPage === pageCount
              ? "bg-[#917DEC] text-white"
              : "text-[#917DEC] hover:bg-[#917DEC]/15"
          }`}
        >
          <span className="flex h-full w-full items-center justify-center font-['Poppins'] text-[12.6px] font-normal italic leading-none tracking-[-0.378px] lg:text-[18px] lg:tracking-[-0.54px]">
            {pageCount}
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === pageCount}
        className="flex items-center gap-1 text-[12.6px] text-[#917DEC] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#917DEC] lg:gap-2 lg:text-[16px]"
      >
        Next
        <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
    </nav>
  );
};

export default Pagination;
