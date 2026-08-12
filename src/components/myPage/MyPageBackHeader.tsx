import { useNavigate } from "react-router-dom";

const leftPointIcon = "/myPage/leftpoint.svg";

interface MyPageBackHeaderProps {
  title: string;
  description?: string;
}

const MyPageBackHeader = ({
  title,
  description,
}: MyPageBackHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-[8px] lg:gap-[5px]">
        <button
          type="button"
          aria-label="이전 페이지로 이동"
          onClick={() => navigate(-1)}
          className="flex h-[24px] w-[24px] shrink-0 items-center justify-center lg:h-[48px] lg:w-[48px]"
        >
          <img
            src={leftPointIcon}
            alt=""
            className="h-[24px] w-[24px] lg:h-[48px] lg:w-[48px]"
          />
        </button>

        <h1 className="text-[16px] font-bold leading-[150%] tracking-[-0.4px] text-[#E8E8E8] lg:text-[36px] lg:tracking-[-1.08px]">
          {title}
        </h1>
      </div>

      {description && (
        <p className="ml-[32px] text-[14px] font-semibold leading-[150%] tracking-[-0.42px] text-[#717379] lg:ml-[53px] lg:text-[24px] lg:tracking-[-0.72px]">
          {description}
        </p>
      )}
    </div>
  );
};

export default MyPageBackHeader;
