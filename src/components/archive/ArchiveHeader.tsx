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
};

const ArchiveHeader = ({
  viewMode,
  onViewModeChange,
  sort,
  onSortChange,
  searchKeyword,
  onSearchKeywordChange,
  onSearch,
}: ArchiveHeaderProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="mb-[60px]">
      <h1 className="mb-3 text-[36px] font-bold text-white">보관함</h1>

      <p className="mb-6 text-[20px] text-gray-400">
        저장된 모든 자료를 폴더 별로 관리할 수 있습니다.
      </p>

      <div className="flex items-center justify-between">
        {/* 검색창 */}
        <form
          onSubmit={handleSubmit}
          className="flex h-[60px] w-[640px] items-center rounded bg-[#F1EEFF] px-5"
        >
          <input
            type="text"
            value={searchKeyword}
            onChange={(event) => onSearchKeywordChange(event.target.value)}
            placeholder="폴더 검색"
            className="flex-1 bg-transparent text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#5D5D5D] outline-none placeholder:text-gray-500"
          />

          <button
            type="submit"
            aria-label="폴더 검색"
            className="flex h-10 w-10 items-center justify-center"
          >
            <Search size={24} className="text-[#8B6DFF]" />
          </button>
        </form>

        {/* 오른쪽 버튼들 */}
        <div className="flex items-center gap-6">
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
          />

          {/* 뷰 전환 */}
          <div className="flex items-center gap-[10px] p-1">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`rounded p-1 transition-colors ${
                viewMode === "grid"
                  ? "bg-[#3A3847] text-[#A88CFF]"
                  : "text-white hover:bg-[#3A3847]"
              }`}
            >
              <img src="/icon/grid.png" alt="그리드 보기" className="h-9 w-9" />
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`rounded p-1 transition-colors ${
                viewMode === "list"
                  ? "bg-[#3A3847] text-[#A88CFF]"
                  : "text-white hover:bg-[#3A3847]"
              }`}
            >
              <img src="/icon/list.png" alt="리스트 보기" className="h-9 w-9" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchiveHeader;
