import SortDropdown from "../../common/SortDropdown";

export type TeachingMapSortType =
  | "latest"
  | "oldest";

interface TeachingMapToolbarProps {
  sortType: TeachingMapSortType;
  onSortChange: (
    sortType: TeachingMapSortType,
  ) => void;
  onDeleteModeStart: () => void;
}

const TeachingMapToolbar = ({
  sortType,
  onSortChange,
  onDeleteModeStart,
}: TeachingMapToolbarProps) => {
  return (
    <div className="flex h-10 items-end gap-[5px] py-1 lg:gap-2 lg:px-2">
      <SortDropdown
        ariaLabel="티칭맵 정렬"
        value={sortType}
        options={[
          { value: "latest", label: "최신순" },
          { value: "oldest", label: "오래된순" },
        ]}
        onChange={onSortChange}
        widthClassName="w-[73.5px] lg:w-[130px]"
      />

      <button
        type="button"
        onClick={onDeleteModeStart}
        className="flex h-[30px] items-center gap-[2px] font-['SUIT'] text-[0px] font-medium text-[#D0D0D2] lg:gap-[3px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]"
      >
        <img
          src="/icon/Trashcan.svg"
          alt=""
          aria-hidden="true"
          className="h-4 w-4 lg:h-[22px] lg:w-[22px]"
        />

        <span>휴지통으로 이동</span>
      </button>
    </div>
  );
};

export default TeachingMapToolbar;
