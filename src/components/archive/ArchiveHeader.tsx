import { Search } from "lucide-react";

import type { FolderSort } from "../../apis/folder";
import SortDropdown from "../common/SortDropdown";

type ArchiveHeaderProps = {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  sort: FolderSort;
  onSortChange: (sort: FolderSort) => void;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onSearch: () => void;
  onAddFolder: () => void;
};

const ArchiveHeader = ({
  viewMode,
  onViewModeChange,
  sort,
  onSortChange,
  searchKeyword,
  onSearchKeywordChange,
  onSearch,
  onAddFolder,
}: ArchiveHeaderProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="mb-0 lg:mb-[60px]">
      <h1 className="mb-[10px] text-[24px] font-medium leading-[36px] tracking-[-0.6px] text-white lg:mb-3 lg:text-[36px] lg:font-bold lg:leading-normal lg:tracking-normal">보관함</h1>

      <p className="mb-[10px] whitespace-nowrap text-[14px] font-normal leading-[21px] tracking-[-0.35px] text-gray-400 lg:mb-6 lg:text-[20px] lg:leading-normal lg:tracking-normal">
        저장된 모든 자료를 폴더 별로 관리할 수 있습니다.
      </p>

      <div className="flex flex-wrap items-center gap-[10px] lg:flex-nowrap lg:justify-between lg:gap-0">
        {/* 검색창 */}
        <form
          onSubmit={handleSubmit}
          className="flex h-[43px] min-w-0 flex-1 items-center rounded-[5px] bg-[#F1EEFF] px-3 lg:h-[60px] lg:w-[640px] lg:flex-none lg:rounded lg:px-5"
        >
          <input
            type="text"
            value={searchKeyword}
            onChange={(event) => onSearchKeywordChange(event.target.value)}
            placeholder="폴더 검색"
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium leading-[135%] tracking-[-0.325px] text-[#5D5D5D] outline-none placeholder:text-gray-500 lg:text-[24px] lg:font-semibold lg:leading-[150%] lg:tracking-[-0.72px]"
          />

          <button
            type="submit"
            aria-label="폴더 검색"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center lg:h-10 lg:w-10"
          >
            <Search className="h-[33px] w-[33px] text-[#8B6DFF] lg:h-6 lg:w-6" />
          </button>
        </form>

        <button
          type="button"
          onClick={onAddFolder}
          aria-label="새 폴더 추가"
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center lg:hidden"
        >
          <img src="/folder/folder-add.png" alt="" aria-hidden="true" className="h-[34px] w-[34px]" />
        </button>

        {/* 오른쪽 버튼들 */}
        <div className="mt-[10px] flex w-full items-center justify-between lg:mt-0 lg:w-auto lg:gap-6">
          {/* 정렬 */}
          <SortDropdown
            ariaLabel="보관함 정렬"
            value={sort}
            options={[
              { value: "recent", label: "최신순" },
              { value: "name", label: "이름순" },
              { value: "oldest", label: "오래된순" },
            ]}
            onChange={onSortChange}
            widthClassName="w-[73.5px] lg:w-[147px]"
          />

          {/* 뷰 전환 */}
          <div className="flex items-center gap-[7px] p-0 lg:gap-[10px] lg:p-1">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`rounded p-0 transition-colors lg:p-1 ${
                viewMode === "grid"
                  ? "bg-[#3A3847] text-[#A88CFF]"
                  : "text-white hover:bg-[#3A3847]"
              }`}
            >
              <img src="/icon/grid.svg" alt="그리드 보기" className="h-[25px] w-[25px] lg:h-9 lg:w-9" />
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`rounded p-0 transition-colors lg:p-1 ${
                viewMode === "list"
                  ? "bg-[#3A3847] text-[#A88CFF]"
                  : "text-white hover:bg-[#3A3847]"
              }`}
            >
              <img src="/icon/list.svg" alt="리스트 보기" className="h-[25px] w-[25px] lg:h-9 lg:w-9" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchiveHeader;
