import type { TrashSortType } from "./trashTypes";
import SortDropdown from "../common/SortDropdown";

interface TrashSortDropdownProps {
  sortType: TrashSortType;
  onSortChange: (
    sortType: TrashSortType,
  ) => void;
}

const TrashSortDropdown = ({
  sortType,
  onSortChange,
}: TrashSortDropdownProps) => {
  return (
    <SortDropdown
      ariaLabel="휴지통 정렬"
      value={sortType}
      options={[
        { value: "latest", label: "최근 삭제순" },
        { value: "oldest", label: "오래된 삭제순" },
      ]}
      onChange={onSortChange}
      widthClassName="w-[170px]"
    />
  );
};

export default TrashSortDropdown;