import SortDropdown from "../../common/SortDropdown";

export type TeachingMapSortType = "latest" | "oldest";

interface TeachingMapToolbarProps {
  sortType: TeachingMapSortType;
  onSortChange: (sortType: TeachingMapSortType) => void;
  onDeleteModeStart: () => void;
}

const TeachingMapToolbar = ({
  sortType,
  onSortChange,
  onDeleteModeStart,
}: TeachingMapToolbarProps) => {
  return (
    <div className="flex h-[35px] items-center gap-[5px] lg:h-10 lg:gap-2 lg:px-2 lg:py-1">
      <SortDropdown
        ariaLabel="티칭맵 정렬"
        value={sortType}
        options={[
          { value: "latest", label: "최신순" },
          { value: "oldest", label: "오래된순" },
        ]}
        onChange={onSortChange}
        widthClassName="w-fit"
        triggerClassName="!text-[13px] !font-normal !leading-[135%] !tracking-[-0.325px] lg:!text-[20px] lg:!font-medium lg:!leading-[30px] lg:!tracking-[-0.6px]"
        iconClassName="!h-4 !w-4 lg:!h-5 lg:!w-5"
      />

      <button
        type="button"
        onClick={onDeleteModeStart}
        aria-label="휴지통으로 이동"
        className="flex h-[35px] w-[35px] items-center justify-center font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#D0D0D2] lg:h-[30px] lg:w-auto lg:gap-[3px]"
      >
        <img
          src="/icon/Trashcan.svg"
          alt=""
          aria-hidden="true"
          className="h-4 w-4 lg:h-[22px] lg:w-[22px]"
        />

        <span className="hidden lg:inline">휴지통으로 이동</span>
      </button>
    </div>
  );
};

export default TeachingMapToolbar;