import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../apis/auth";
import { getMyProfile } from "../../apis/users";
import MyPageMenuList from "../../components/myPage/MyPageMenuList";
import MyPageProfile from "../../components/myPage/MyPageProfile";
import { clearTokens } from "../../utils/authToken";

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] =
    useState("");
  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        setNickname(profile.nickname);
        setProfileImageUrl(
          profile.profileImageUrl,
        );
      } catch (error) {
        console.error(error);
      }
    };

    void loadProfile();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      clearTokens();
      navigate("/login", {
        replace: true,
      });
      setIsLoggingOut(false);
    }
  };

  const handleWithdrawal = () => {
    navigate("/mypage/withdrawal-reason");
  };

  const handleNotifications = () => {
    navigate("/notifications");
  };

  return (
    <main className="min-h-full px-[20px] pb-[150px] pt-[10px] lg:px-[160px] lg:pb-[120px] lg:pt-[40px]">
      <div className="flex h-[50px] items-center justify-between lg:h-auto">
        <h1 className="text-[24px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA] lg:text-[36px] lg:font-bold lg:tracking-[-1.08px] lg:text-[#E8E8E8]">
          마이페이지
        </h1>

        <button
          type="button"
          onClick={handleNotifications}
          aria-label="알림 보기"
          className="flex h-[40px] w-[40px] items-center justify-center lg:hidden"
        >
          <img
            src="/icon/Alarm2.svg"
            alt=""
            aria-hidden="true"
            className="h-[40px] w-[40px] object-contain"
          />
        </button>
      </div>

      <section className="mt-[5px] flex flex-col items-center lg:mt-[50px]">
        <MyPageProfile
          nickname={nickname}
          imageUrl={profileImageUrl}
        />

        <div className="mt-[40px] w-full lg:w-auto">
          <MyPageMenuList />
        </div>

        <div className="mt-[20px] flex w-full gap-[10px] lg:w-[736px] lg:gap-[32px]">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex h-[44px] min-w-0 flex-1 items-center justify-center rounded-[5px] bg-[#1F212A] p-[10px] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[#D0D0D2] disabled:cursor-not-allowed disabled:opacity-60 lg:h-[60px] lg:w-[352px] lg:flex-none lg:rounded-[10px] lg:px-[10px] lg:text-[24px] lg:font-semibold lg:tracking-[-0.72px]"
          >
            {isLoggingOut
              ? "로그아웃 중"
              : "로그아웃"}
          </button>

          <button
            type="button"
            onClick={handleWithdrawal}
            className="flex h-[44px] min-w-0 flex-1 items-center justify-center rounded-[5px] bg-[#1F212A] p-[10px] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[#D0D0D2] lg:h-[60px] lg:w-[352px] lg:flex-none lg:rounded-[10px] lg:px-[10px] lg:text-[24px] lg:font-semibold lg:tracking-[-0.72px]"
          >
            탈퇴하기
          </button>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
