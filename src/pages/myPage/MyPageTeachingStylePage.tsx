import { useState } from "react";

import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import TeachingStyleSelector, {
  type TeachingStyle,
} from "../../components/myPage/TeachingStyleSelector";

const MyPageTeachingStylePage = () => {
  const [selectedStyle, setSelectedStyle] =
    useState<TeachingStyle>("friendly");

  const handleTeachingStyleChange = (
    teachingStyle: TeachingStyle,
  ) => {
    setSelectedStyle(teachingStyle);

    console.log({
      teachingStyle,
    });
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