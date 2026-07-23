import {
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TemporaryTeachingMapHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() =>
          navigate("/teaching-map")
        }
        className="flex w-fit items-center gap-1 font-['SUIT'] text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#5D5D5D] transition-colors hover:text-[#8D8E94]"
      >
        <ArrowLeft
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <span>티칭맵 목록으로 이동</span>
      </button>

      <h1 className="text-[36px] font-bold leading-[120%] tracking-[-1.08px] text-[#E8E8E8]">
        임시 보관함
      </h1>

      <p className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#717379]">
        학습 로드맵을 만들고 관리하세요.
      </p>
    </section>
  );
};

export default TemporaryTeachingMapHeader;
