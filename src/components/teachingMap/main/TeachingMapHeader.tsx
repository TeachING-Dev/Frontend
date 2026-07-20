import { useNavigate } from "react-router-dom";

function TeachingMapHeader() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/teaching-map/create");
  };

  return (
    <section className="mb-10 flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-[36px] font-bold leading-[120%] tracking-[-1.08px] text-[#E8E8E8]">
          티칭맵
        </h1>

        <p className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#717379]">
          학습 로드맵을 만들고 관리하세요.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleCreateClick}
          className="flex h-10 w-[147px] items-center justify-center rounded-[5px] bg-[#917DEC] px-2 py-1 text-white"
        >
          새 티칭맵
        </button>

        <button
          type="button"
          className="flex h-10 w-[147px] items-center justify-center rounded-[5px] bg-[#2B2C35] px-2 py-1 text-[#8D8E94]"
        >
          임시저장
        </button>
      </div>
    </section>
  );
}

export default TeachingMapHeader;