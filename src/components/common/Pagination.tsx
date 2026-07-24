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
      className="mt-10 flex items-center justify-center gap-5"
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-[16px] text-[#917DEC] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#917DEC]"
      >
        <ChevronLeft size={20} />
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
          className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
            currentPage === page
              ? "bg-[#917DEC] text-white"
              : "text-[#917DEC] hover:bg-[#917DEC]/15"
          }`}
        >
          <span className="-translate-x-[2px] font-['Poppins'] text-[18px] font-normal italic leading-none tracking-[-0.54px]">
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
          className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
            currentPage === pageCount
              ? "bg-[#917DEC] text-white"
              : "text-[#917DEC] hover:bg-[#917DEC]/15"
          }`}
        >
          <span className="-translate-x-[2px] font-['Poppins'] text-[18px] font-normal italic leading-none tracking-[-0.54px]">
            {pageCount}
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === pageCount}
        className="flex items-center gap-2 text-[16px] text-[#917DEC] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#917DEC]"
      >
        Next
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;