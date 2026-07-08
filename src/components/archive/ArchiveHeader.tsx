import { Search, Grid3X3, List, ChevronDown } from "lucide-react";

type ArchiveHeaderProps = {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
};

const ArchiveHeader = ({
  viewMode,
  onViewModeChange,
}: ArchiveHeaderProps) => {
  return (
    <section className="mb-14">
      <h1 className="mb-3 text-3xl font-bold text-white">보관함</h1>

      <p className="mb-6 text-base text-gray-400">
        저장된 모든 자료를 폴더 별로 관리할 수 있습니다.
      </p>

      <div className="flex items-center justify-between">
        <div className="flex h-[60px] w-[640px] items-center rounded bg-[#F1EEFF] px-5">
          <input
            type="text"
            placeholder="폴더 검색"
            className="flex-1 bg-transparent text-xl font-semibold text-gray-700 outline-none placeholder:text-gray-500"
          />
          <Search size={24} className="text-[#8B6DFF]" />
        </div>

        <div className="flex items-center gap-6">
          <button className="flex h-9 items-center gap-2 rounded bg-[#24232D] px-7 text-base font-semibold text-white">
            최신순
            <ChevronDown size={20} />
          </button>

          {/* Grid 버튼 */}
          <button
            onClick={() => onViewModeChange("grid")}
            className={`rounded p-1 transition-colors ${
              viewMode === "grid"
                ? "bg-[#24232D] text-[#A88CFF]"
                : "text-white hover:bg-[#24232D]"
            }`}
          >
            <Grid3X3 size={28} />
          </button>

          {/* List 버튼 */}
          <button
            onClick={() => onViewModeChange("list")}
            className={`rounded p-1 transition-colors ${
              viewMode === "list"
                ? "bg-[#24232D] text-[#A88CFF]"
                : "text-white hover:bg-[#24232D]"
            }`}
          >
            <List size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArchiveHeader;