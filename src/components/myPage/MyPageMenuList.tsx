import { useNavigate } from "react-router-dom";

import MyPageMenuItem from "./MyPageMenuItem";

const MyPageMenuList = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "회원정보 수정",
      path: "/mypage/edit",
    },
    {
      label: "알림 설정",
      path: "/mypage/notification",
    },
    {
      label: "티칭맵 설정",
      path: "/mypage/teaching-style",
    },
    {
      label: "1:1 문의하기",
      path: "/mypage/inquiry",
    },
    {
      label: "구독하기",
      path: "/subscription",
    },
    {
      label: "휴지통",
      path: "/trash",
      mobileOnly: true,
    },
  ];

  const handleMenuClick = (path: string) => {
    if (path === "/subscription") {
      navigate(path, {
        state: { showMyPageBack: true },
      });
      return;
    }

    navigate(path);
  };

  return (
    <div className="flex w-full flex-col gap-[10px] lg:w-[736px]">
      {menuItems.map((menuItem) => (
        <div key={menuItem.label} className={menuItem.mobileOnly ? "lg:hidden" : undefined}>
          <MyPageMenuItem
            label={menuItem.label}
            onClick={() => handleMenuClick(menuItem.path)}
          />
        </div>
      ))}
    </div>
  );
};

export default MyPageMenuList;
