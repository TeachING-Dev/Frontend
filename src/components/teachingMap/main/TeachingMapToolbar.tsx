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
    <div className="flex h-10 items-center gap-2 px-2 py-1">
      <SortDropdown
        ariaLabel="티칭맵 정렬"
        value={sortType}
        options={[
          { value: "latest", label: "최신순" },
          { value: "oldest", label: "오래된순" },
        ]}
        onChange={onSortChange}
        widthClassName="w-[120px]"
      />

      <button
        type="button"
        onClick={onDeleteModeStart}
        className="flex h-[30px] items-center gap-[3px] font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#D0D0D2]"
      >
        <img
          src="/icon/Trashcan.svg"
          alt=""
          aria-hidden="true"
          className="h-[22px] w-[22px]"
        />

        <span>휴지통으로 이동</span>
      </button>
    </div>
  );
};

export default TeachingMapToolbar;