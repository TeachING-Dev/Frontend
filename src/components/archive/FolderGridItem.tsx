import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FolderCard from "../common/FolderCard";
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

  return (
    <FolderCard
      variant="archive-grid"
      name={name}
      itemCount={count}
      meta={date}
      onClick={handleFolderClick}
      menu={
        <FolderPopover
          trigger={
            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              className="flex h-5 w-5 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-[#B79CFF] lg:h-8 lg:w-8"
              aria-label={`${name} 폴더 메뉴`}
            >
              <EllipsisVertical className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={4} />
            </button>
          }
          onMoveToTrash={() => onMoveToTrash?.(id)}
        />
      }
    />
  );
};

export default FolderGridItem;
