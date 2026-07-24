import { useEffect, useState } from "react";

import {
  getMyProfile,
  type TeacherPersona,
  updateTeacherPersona,
} from "../../api/users";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import TeachingStyleSelector, {
  type TeachingStyle,
} from "../../components/myPage/TeachingStyleSelector";

const MyPageTeachingStylePage = () => {
  const [selectedStyle, setSelectedStyle] =
    useState<TeachingStyle>("friendly");

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

  const handleTeachingStyleChange = async (
    teachingStyle: TeachingStyle,
  ) => {
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
      await updateTeacherPersona(
        styleToPersona[teachingStyle],
      );
    } catch (error) {
      setSelectedStyle(previousStyle);
      console.error(error);
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
    </main>
  );
};

export default MyPageTeachingStylePage;