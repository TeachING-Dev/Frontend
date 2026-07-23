import TrashTeachingMapCard from "./TrashTeachingMapCard";
import type { TrashTeachingMapItem } from "./trashTypes";

interface TrashTeachingMapListProps {
  teachingMaps: TrashTeachingMapItem[];
  isRestoreMode: boolean;
  selectedItemIds: number[];
  onSelect: (
    teachingMapId: number,
  ) => void;
  onRestore: (
    teachingMapId: number,
  ) => void;
}

const TrashTeachingMapList = ({
  teachingMaps,
  isRestoreMode,
  selectedItemIds,
  onSelect,
  onRestore,
}: TrashTeachingMapListProps) => {
  return (
    <div className="flex flex-col gap-10">
      {teachingMaps.map(
        (teachingMap) => (
          <TrashTeachingMapCard
            key={teachingMap.id}
            teachingMap={teachingMap}
            isRestoreMode={
              isRestoreMode
            }
            isSelected={selectedItemIds.includes(
              teachingMap.id,
            )}
            onSelect={onSelect}
            onRestore={onRestore}
          />
        ),
      )}
    </div>
  );
};

export default TrashTeachingMapList;