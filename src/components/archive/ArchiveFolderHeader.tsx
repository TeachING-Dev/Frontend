import { useState } from "react";
import { Ellipsis, Search } from "lucide-react";

import DataPopover from "./popover/DataPopover";

type ArchiveFolderHeaderProps = {
  folderName: string;
  savedItemCount: number;
  onBack: () => void;
  onEditFolderName?: () => void;
  onMoveFolder?: () => void;
  onMoveToTrash?: () => void;
};

type SortOption = "최신순" | "최근수정순";

const ArchiveFolderHeader = ({
  folderName,
  savedItemCount,
  onBack,
  onEditFolderName,
  onMoveFolder,
  onMoveToTrash,
}: ArchiveFolderHeaderProps) => {
  const [sortOption, setSortOption] =
    useState<SortOption>("최신순");

  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  return (
    <section className="mb-[60px]">
      {/* 보관함으로 돌아가기 */}
      <button
        type="button"
        onClick={onBack}
        className="group mb-1 flex items-center gap-1 rounded px-1 py-1 transition hover:bg-white/10"
      >
        <img
          src="/vector-01.svg"
          alt=""
          aria-hidden="true"
          className="h-[24px] w-[24px] transition duration-200 group-hover:brightness-0 group-hover:invert"
        />

        <span className="text-[16px] text-[#9B9AA0] transition-colors duration-200 group-hover:text-white">
          보관함으로 돌아가기
        </span>
      </button>

      {/* 폴더명 */}
      <div className="mb-3 flex items-center gap-5">
        <h1 className="text-[36px] font-bold text-white">
          {folderName}
        </h1>

        <button
          type="button"
          onClick={onEditFolderName}
          aria-label="폴더 이름 수정"
          className="flex h-8 w-8 items-center justify-center rounded transition hover:bg-white/10"
        >
          <img
            src="/edit-03.png"
            alt=""
            aria-hidden="true"
            className="h-[36px] w-[36px]"
          />
        </button>
      </div>

      {/* 저장된 자료 개수 */}
      <p className="mb-6 text-[20px] text-[#A1A1A5]">
        {savedItemCount}개의 저장된 자료
      </p>

      <div className="flex items-center justify-between">
        {/* 검색창 */}
        <div className="flex h-[60px] w-[640px] items-center rounded bg-[#F1EEFF] px-5">
          <input
            type="text"
            placeholder="자료 검색"
            className="flex-1 bg-transparent text-[24px] font-semibold text-[#5D5D5D] outline-none placeholder:text-gray-500"
          />

          <Search size={24} className="text-[#8B6DFF]" />
        </div>

        {/* 오른쪽 버튼 */}
        <div className="flex items-center gap-6">
          {/* 정렬 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex h-[40px] w-[160px] items-center justify-center gap-2 rounded bg-[#24232D] px-3 text-[20px] font-semibold text-white"
            >
              <span>{sortOption}</span>

              <span
                className={`h-0 w-0 border-x-[8px] border-t-[10px] border-x-transparent border-t-white transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute top-[46px] z-10 w-[160px] overflow-hidden rounded bg-[#24232D] shadow-lg">
                <button
                  type="button"
                  onClick={() => handleSortSelect("최신순")}
                  className="w-full px-5 py-3 text-left text-[16px] text-white transition hover:bg-[#3A3847]"
                >
                  최신순
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSortSelect("최근수정순")
                  }
                  className="w-full px-5 py-3 text-left text-[16px] text-white transition hover:bg-[#3A3847]"
                >
                  최근수정순
                </button>
              </div>
            )}
          </div>

          {/* 자료 메뉴 팝오버 */}
          <DataPopover
            trigger={
              <button
                type="button"
                aria-label="자료 메뉴"
                className="flex h-8 w-8 items-center justify-center rounded text-white transition hover:bg-[#3A3847]"
              >
                <Ellipsis size={28} strokeWidth={3} />
              </button>
            }
            onMoveFolder={onMoveFolder}
            onMoveToTrash={onMoveToTrash}
          />
        </div>
      </div>
    </section>
  );
};

export default ArchiveFolderHeader;