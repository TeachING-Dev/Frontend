import { useEffect, useState } from "react";

import { getMyProfile, updateNotifications } from "../../apis/users";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import NotificationToggle from "../../components/myPage/NotificationToggle";

const MyPageNotificationPage = () => {
  const [
    isTeachingMapNotificationEnabled,
    setIsTeachingMapNotificationEnabled,
  ] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadNotificationSetting = async () => {
      try {
        const profile = await getMyProfile();
        setIsTeachingMapNotificationEnabled(profile.notificationEnabled);
      } catch (error) {
        console.error(error);
      }
    };

    void loadNotificationSetting();
  }, []);

  const handleNotificationChange = async (enabled: boolean) => {
    if (isSaving) {
      return;
    }

    const previousValue = isTeachingMapNotificationEnabled;

    setIsTeachingMapNotificationEnabled(enabled);

    try {
      setIsSaving(true);
      await updateNotifications(enabled);

      const savedProfile = await getMyProfile();

      setIsTeachingMapNotificationEnabled(savedProfile.notificationEnabled);
    } catch (error) {
      setIsTeachingMapNotificationEnabled(previousValue);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-full px-[20px] pb-[150px] pt-[20px] lg:px-[160px] lg:pb-[120px] lg:pt-[40px]">
      <MyPageBackHeader title="알림 설정" />

      <section className="mt-[30px] flex h-[50px] w-full items-center justify-between rounded-[5px] bg-[#1F212A] px-[15px] lg:ml-[53px] lg:mt-[50px] lg:h-[60px] lg:w-[640px] lg:px-[20px]">
        <span className="text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#D0D0D2] lg:text-[18px] lg:tracking-[-0.54px]">
          티칭맵 리마인드
        </span>

        <NotificationToggle
          checked={isTeachingMapNotificationEnabled}
          onChange={handleNotificationChange}
        />
      </section>
    </main>
  );
};

export default MyPageNotificationPage;
