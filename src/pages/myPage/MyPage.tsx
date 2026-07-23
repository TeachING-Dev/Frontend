import { useNavigate } from "react-router-dom";

import MyPageMenuList from "../../components/myPage/MyPageMenuList";
import MyPageProfile from "../../components/myPage/MyPageProfile";

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleWithdrawal = () => {
    navigate("/mypage/withdrawal-reason");
  };

  return (
    <main className="min-h-full px-[160px] pb-[120px] pt-[40px]">
      <h1 className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
        마이페이지
      </h1>

      <section className="mt-[50px] flex flex-col items-center">
        <MyPageProfile nickname="타카" />

        <div className="mt-[40px]">
          <MyPageMenuList />
        </div>

        <div className="mt-[20px] flex w-[736px] gap-[32px]">
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-[60px] w-[352px] items-center justify-center rounded-[10px] bg-[#1F212A] px-[10px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#D0D0D2]"
          >
            로그아웃
          </button>

          <button
            type="button"
            onClick={handleWithdrawal}
            className="flex h-[60px] w-[352px] items-center justify-center rounded-[10px] bg-[#1F212A] px-[10px] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#D0D0D2]"
          >
            탈퇴하기
          </button>
        </div>
      </section>
    </main>
  );
};

export default MyPage;