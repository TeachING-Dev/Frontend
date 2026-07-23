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
      <div className="flex items-center gap-[5px]">
        <button
          type="button"
          aria-label="이전 페이지로 이동"
          onClick={() => navigate(-1)}
          className="flex h-[48px] w-[48px] items-center justify-center"
        >
          <img
            src={leftPointIcon}
            alt=""
            className="h-[48px] w-[48px]"
          />
        </button>

        <h1 className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
          {title}
        </h1>
      </div>

      {description && (
        <p className="ml-[53px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#717379]">
          {description}
        </p>
      )}
    </div>
  );
};

export default MyPageBackHeader;