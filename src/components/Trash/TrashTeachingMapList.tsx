import TrashTeachingMapCard from "./TrashTeachingMapCard";
import type { TrashTeachingMapItem } from "./trashTypes";

interface TrashTeachingMapListProps {
  teachingMaps: TrashTeachingMapItem[];
  onRestore: (
    teachingMapId: number,
  ) => void;
}

const TrashTeachingMapList = ({
  teachingMaps,
  onRestore,
}: TrashTeachingMapListProps) => {
  return (
    <div className="flex flex-col gap-10">
      {teachingMaps.map((teachingMap) => (
        <TrashTeachingMapCard
          key={teachingMap.id}
          teachingMap={teachingMap}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
};

export default TrashTeachingMapList;