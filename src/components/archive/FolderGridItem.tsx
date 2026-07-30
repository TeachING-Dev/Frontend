import type { KeyboardEvent } from "react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FolderPopover from "./popover/FolderPopover";

type FolderGridItemProps = {
  id: number;
  name: string;
  count: number;
  date: string;
  onMoveToTrash?: (folderId: number) => void;
};

const FolderGridItem = ({
  id,
  name,
  count,
  date,
  onMoveToTrash,
}: FolderGridItemProps) => {
  const navigate = useNavigate();

  const handleFolderClick = () => {
    navigate(`/archive/folder/${id}`);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleFolderClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleFolderClick}
      onKeyDown={handleKeyDown}
      className="flex h-[128px] w-[352px] cursor-pointer rounded-md border border-[#5F4A9B] bg-gradient-to-b from-[#111021] to-[#30275A] px-[26px] pt-[56px] pb-[12px] transition hover:border-[#8B6DFF]"
    >
      <div className="flex w-full flex-col justify-between">
        {/* 첫 번째 줄 */}
        <div className="flex items-center justify-between">
          <h3 className="truncate text-[24px] font-semibold leading-[140%] text-white">
            {name}
          </h3>

          <FolderPopover
            trigger={
              <button
                type="button"
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="flex h-8 w-8 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-[#B79CFF]"
                aria-label={`${name} 폴더 메뉴`}
              >
                <EllipsisVertical
                  size={20}
                  strokeWidth={4}
                />
              </button>
            }
            onMoveToTrash={() => {
              onMoveToTrash?.(id);
            }}
          />
        </div>

        {/* 두 번째 줄 */}
        <div className="flex items-center gap-4 text-[16px] text-[#FAFAFA]">
          <span>
            {String(count).padStart(2, "0")}개 항목
          </span>

          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default FolderGridItem;