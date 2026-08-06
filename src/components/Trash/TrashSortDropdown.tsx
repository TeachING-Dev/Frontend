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
        {
          value: "latest",
          label: (
            <>
              <span className="lg:hidden">최근삭제</span>
              <span className="hidden lg:inline">최근 삭제순</span>
            </>
          ),
        },
        { value: "oldest", label: "오래된 삭제순" },
      ]}
      onChange={onSortChange}
      widthClassName="w-fit"
      triggerClassName="!text-[13px] !leading-[18px] !tracking-[-0.325px] lg:!text-[20px] lg:!leading-[30px] lg:!tracking-[-0.6px]"
      iconClassName="!h-4 !w-4 lg:!h-5 lg:!w-5"
    />
  );
};

export default TrashSortDropdown;
