import { useNavigate } from "react-router-dom";

const sadEmptyStarImage = "/myPage/SadStar.png";

const MyPageAuthRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="mt-[177px] flex w-[409px] flex-col items-center gap-[20px]">
        <img
          src={sadEmptyStarImage}
          alt=""
          className="h-[200px] w-[200px] object-contain"
        />

        <div className="flex flex-col items-center gap-[8px]">
          <h2 className="w-[409px] text-center text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#FAFAFA]">
            회원 정보를 찾을 수 없어요
          </h2>

          <p className="whitespace-nowrap text-center text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#717379]">
            회원가입/로그인으로 회원 인증을 진행해주세요!
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="mt-[160px] flex h-[60px] w-[544px] items-center justify-center rounded-[10px] bg-[#917DEC] px-[10px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-white"
      >
        회원가입/로그인 하기
      </button>
    </div>
  );
};

export default MyPageAuthRequired;
