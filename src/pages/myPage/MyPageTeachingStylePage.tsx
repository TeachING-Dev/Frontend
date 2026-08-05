import { useEffect, useRef, useState } from "react";

import {
  getMyProfile,
  type TeacherPersona,
  updateTeacherPersona,
} from "../../apis/users";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import TeachingStyleSelector, {
  type TeachingStyle,
} from "../../components/myPage/TeachingStyleSelector";
import Toast from "../../components/common/Toast";

const MyPageTeachingStylePage = () => {
  const [selectedStyle, setSelectedStyle] =
    useState<TeachingStyle>("friendly");
  const [isSaving, setIsSaving] =
    useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const loadTeacherPersona = async () => {
      try {
        const profile = await getMyProfile();
        const personaToStyle: Record<
          TeacherPersona,
          TeachingStyle
        > = {
          FRIENDLY: "friendly",
          STRICT: "strict",
          CHEERING: "supportive",
        };

        setSelectedStyle(
          personaToStyle[profile.teacherPersona],
        );
      } catch (error) {
        console.error(error);
      }
    };

    void loadTeacherPersona();
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showChangeToast = () => {
    setToastMessage("티칭맵 설정이 변경되었습니다.");
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 3000);
  };

  const handleTeachingStyleChange = async (
    teachingStyle: TeachingStyle,
  ) => {
    if (isSaving || teachingStyle === selectedStyle) {
      return;
    }

    const previousStyle = selectedStyle;

    const styleToPersona: Record<
      TeachingStyle,
      TeacherPersona
    > = {
      friendly: "FRIENDLY",
      strict: "STRICT",
      supportive: "CHEERING",
    };

    setSelectedStyle(teachingStyle);

    try {
      setIsSaving(true);
      await updateTeacherPersona(
        styleToPersona[teachingStyle],
      );

      const savedProfile =
        await getMyProfile();

      const personaToStyle: Record<
        TeacherPersona,
        TeachingStyle
      > = {
        FRIENDLY: "friendly",
        STRICT: "strict",
        CHEERING: "supportive",
      };

      setSelectedStyle(
        personaToStyle[
          savedProfile.teacherPersona
        ],
      );
      showChangeToast();
    } catch (error) {
      setSelectedStyle(previousStyle);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col px-[160px] pb-[40px] pt-[40px]">
      <MyPageBackHeader title="티칭맵 설정" />

      <section className="flex min-h-0 flex-1 items-center justify-center">
        <TeachingStyleSelector
          selectedStyle={selectedStyle}
          onChange={handleTeachingStyleChange}
        />
      </section>

      {toastMessage && <Toast message={toastMessage} />}
    </main>
  );
};

export default MyPageTeachingStylePage;