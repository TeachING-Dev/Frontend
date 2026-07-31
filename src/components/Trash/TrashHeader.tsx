import { useNavigate } from "react-router-dom";

const leftPointIcon = "/myPage/leftpoint.svg";

const TrashHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col items-start">
      <div className="flex items-center gap-[5px]">
        <button
          type="button"
          aria-label="이전 페이지로 이동"
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 shrink-0 items-center justify-center"
        >
          <img
            src={leftPointIcon}
            alt=""
            aria-hidden="true"
            className="h-12 w-12"
          />
        </button>

        <h1 className="font-suit text-[36px] font-bold leading-[54px] tracking-[-1.08px] text-[#FAFAFA]">
          휴지통
        </h1>
      </div>

      <p className="ml-[53px] font-suit text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-[#A1A1A5]">
        삭제 후, 30일간 보관됩니다.
      </p>
    </header>
  );
};

export default TrashHeader;