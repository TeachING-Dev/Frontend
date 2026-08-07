const rightPointIcon = "/myPage/rightpoint.svg";

interface MyPageMenuItemProps {
  label: string;
  onClick: () => void;
}

const MyPageMenuItem = ({
  label,
  onClick,
}: MyPageMenuItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[50px] w-full items-center justify-between rounded-[10px] bg-[#13151F] px-[10px] lg:h-[60px] lg:px-[30px] lg:py-[20px]"
    >
      <span className="text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[#D0D0D2] lg:text-[24px] lg:font-semibold lg:tracking-[-0.72px]">
        {label}
      </span>

      <img
        src={rightPointIcon}
        alt=""
        className="h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]"
      />
    </button>
  );
};

export default MyPageMenuItem;
