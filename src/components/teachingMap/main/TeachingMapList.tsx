import TeachingMapCard, { type TeachingMapCardData } from "./TeachingMapCard";

interface TeachingMapListProps {
  teachingMaps: TeachingMapCardData[];
  isDeleteMode?: boolean;
  selectedTeachingMapIds?: number[];
  onTeachingMapClick?: (teachingMapId: number) => void;
  onTeachingMapSelect?: (teachingMapId: number) => void;
}

const TeachingMapList = ({
  teachingMaps,
  isDeleteMode = false,
  selectedTeachingMapIds = [],
  onTeachingMapClick,
  onTeachingMapSelect,
}: TeachingMapListProps) => {
  return (
    <section className="flex w-full flex-col gap-10" aria-label="티칭맵 목록">
      {teachingMaps.map((teachingMap) => (
        <TeachingMapCard
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

export default TeachingMapList;