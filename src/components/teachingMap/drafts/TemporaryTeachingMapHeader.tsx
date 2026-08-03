import { useNavigate } from "react-router-dom";

const leftPointIcon = "/myPage/leftpoint.svg";

const TemporaryTeachingMapHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-1">
      <div className="flex items-center gap-[5px]">
        <button
          type="button"
          aria-label="티칭맵 목록으로 이동"
          onClick={() =>
            navigate("/teaching-map")
          }
          className="flex h-12 w-12 shrink-0 items-center justify-center"
        >
          <img
            src={leftPointIcon}
            alt=""
            aria-hidden="true"
            className="h-12 w-12"
          />
        </button>

        <h1 className="text-[36px] font-bold leading-[120%] tracking-[-1.08px] text-[#E8E8E8]">
          임시 보관함
        </h1>
      </div>

      <p className="ml-[53px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#717379]">
        학습 로드맵을 만들고 관리하세요.
      </p>
    </section>
  );
};

export default TemporaryTeachingMapHeader;