import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

import FolderPopover from "./FolderPopover";

type FolderGridItemProps = {
  id: number;
  name: string;
  count: number;
  date: string;
};

const FolderGridItem = ({
  // id,
  name,
  count,
  date,
}: FolderGridItemProps) => {
  const navigate = useNavigate();

  const handleFolderClick = () => {
    navigate("/archive/folder");
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFolderClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleFolderClick}
      onKeyDown={handleKeyDown}
      className="flex h-[128px] w-[352px] cursor-pointer rounded-md border border-[#5F4A9B] bg-gradient-to-b from-[#111021] to-[#30275A] px-[26px] py-[56px] transition hover:border-[#8B6DFF]"
    >
      <div className="flex w-full flex-col">
        {/* 첫 번째 줄 */}
        <div className="flex items-center justify-between">
          <h3 className="truncate text-[24px] font-semibold leading-none text-white">
            {name}
          </h3>

          <FolderPopover
            trigger={
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-[#B79CFF]"
                aria-label="폴더 메뉴"
              >
                <EllipsisVertical size={20} strokeWidth={4} />
              </button>
            }
            onMoveToTrash={() => {
              console.log(`${name} 휴지통으로 이동`);
            }}
          />
        </div>

        {/* 두 번째 줄 */}
        <div className="flex items-center gap-4 text-[16px] text-[#FAFAFA]">
          <span>{String(count).padStart(2, "0")}개 항목</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default FolderGridItem;