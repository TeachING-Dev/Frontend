import type { KeyboardEvent } from "react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FolderPopover from "./popover/FolderPopover";

type FolderListItemProps = {
  id: number;
  name: string;
  count: number;
  date: string;
  onMoveToTrash?: (folderId: number) => void;
};

const FolderListItem = ({
  id,
  name,
  count,
  date,
  onMoveToTrash,
}: FolderListItemProps) => {
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
      className="flex h-[88px] w-full cursor-pointer items-center border-b border-[#252131] transition hover:bg-white/5"
    >
      <img
        src="/folder/folder1.png"
        alt=""
        aria-hidden="true"
        className="h-[64px] w-[64px]"
      />

      <p className="ml-[22px] w-[360px] truncate text-[24px] font-semibold text-[#BCA7FF]">
        {name}
      </p>

      <p className="ml-[40px] w-[240px] text-[16px] text-white">
        {count}개 항목
      </p>

      <p className="ml-[60px] w-[220px] text-[16px] text-white">
        {date}
      </p>

      <FolderPopover
        trigger={
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
            }}
            aria-label={`${name} 폴더 메뉴`}
            className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-[#B79CFF]"
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
  );
};

export default FolderListItem;