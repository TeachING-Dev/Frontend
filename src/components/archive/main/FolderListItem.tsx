import type { KeyboardEvent } from "react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FolderPopover from "../popover/FolderPopover";

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
      className="flex h-[76px] w-full cursor-pointer items-center border-b border-[#252131] px-0 transition hover:bg-white/5 lg:h-[88px]"
    >
      <img
        src="/folder/folder1.png"
        alt=""
        aria-hidden="true"
        className="h-[34px] w-[34px] lg:h-[64px] lg:w-[64px]"
      />

      <p className="ml-5 min-w-0 flex-1 truncate text-[14px] font-normal leading-[21px] tracking-[-0.35px] text-[#BCA7FF] lg:ml-[22px] lg:w-[360px] lg:flex-none lg:text-[24px] lg:font-semibold lg:leading-normal lg:tracking-normal">
        {name}
      </p>

      <p className="ml-3 w-[64px] shrink-0 text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-white lg:ml-[40px] lg:w-[240px] lg:text-[16px] lg:font-normal lg:leading-normal lg:tracking-normal">
        {count}개 항목
      </p>

      <p className="ml-3 w-[75px] shrink-0 text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-white lg:ml-[60px] lg:w-[220px] lg:text-[16px] lg:font-normal lg:leading-normal lg:tracking-normal">
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
            className="ml-auto flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-[#B79CFF] lg:h-8 lg:w-8"
          >
            <EllipsisVertical
              className="h-5 w-5 lg:h-5 lg:w-5"
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
