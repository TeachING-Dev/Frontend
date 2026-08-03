import type { TemporaryTeachingMapData } from "../../../constants/temporaryTeachingMaps";
import TemporaryTeachingMapCard from "./TemporaryTeachingMapCard";

interface TemporaryTeachingMapListProps {
  teachingMaps: TemporaryTeachingMapData[];
  isDeleteMode: boolean;
  selectedTeachingMapIds: number[];
  onTeachingMapClick: (teachingMapId: number) => void;
  onTeachingMapSelect: (teachingMapId: number) => void;
}

const TemporaryTeachingMapList = ({
  teachingMaps,
  isDeleteMode,
  selectedTeachingMapIds,
  onTeachingMapClick,
  onTeachingMapSelect,
}: TemporaryTeachingMapListProps) => {
  return (
    <section
      aria-label="임시 티칭맵 목록"
      className="flex w-full flex-col gap-5"
    >
      {teachingMaps.map((teachingMap) => (
        <TemporaryTeachingMapCard
          key={teachingMap.id}
          teachingMap={teachingMap}
          isDeleteMode={isDeleteMode}
          isSelected={selectedTeachingMapIds.includes(teachingMap.id)}
          onClick={onTeachingMapClick}
          onSelect={onTeachingMapSelect}
        />
      ))}
    </section>
  );
};

export default TemporaryTeachingMapList;