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
      className="flex h-[60px] w-full items-center justify-between rounded-[10px] bg-[#13151F] px-[30px] py-[20px]"
    >
      <span className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#D0D0D2]">
        {label}
      </span>

      <img
        src={rightPointIcon}
        alt=""
        className="h-[24px] w-[24px]"
      />
    </button>
  );
};

export default MyPageMenuItem;