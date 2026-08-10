import { useNavigate } from "react-router-dom";

import type { ActiveTeachingMap } from "../../apis/home";
import EmptyHomeContent from "./EmptyHomeContent";
import TeachingMapItem from "./TeachingMapItem";

type TeachingMapListProps = {
  teachingMaps: ActiveTeachingMap[];
};

const TeachingMapList = ({
  teachingMaps,
}: TeachingMapListProps) => {
  const navigate = useNavigate();

  if (teachingMaps.length === 0) {
    return (
      <EmptyHomeContent
        message="학습 중인 티칭맵이 없어요."
        iconSrc="/icon/티칭맵_퍼플.png"
      />
    );
  }

  return (
    <div className="flex flex-col md:gap-[20px]">
      {teachingMaps.map((teachingMap) => (
        <TeachingMapItem
          key={teachingMap.teachingMapId}
          title={teachingMap.title}
          description={teachingMap.description}
          sourcePlatforms={
            teachingMap.sourcePlatforms
          }
          extraCount={teachingMap.extraCount}
          onClick={() =>
            navigate(
              `/teaching-map/${teachingMap.teachingMapId}`,
            )
          }
          onShortcutClick={() =>
            navigate(
              `/teaching-map/${teachingMap.teachingMapId}`,
            )
          }
        />
      ))}
    </div>
  );
};

export default TeachingMapList;
