import TrashDataCard from "./TrashDataCard";
import type { TrashDataItem } from "./trashTypes";

interface TrashDataListProps {
  dataList: TrashDataItem[];
  isRestoreMode: boolean;
  selectedItemIds: number[];
  onSelect: (dataId: number) => void;
  onRestore: (dataId: number) => void;
}

const TrashDataList = ({
  dataList,
  isRestoreMode,
  selectedItemIds,
  onSelect,
  onRestore,
}: TrashDataListProps) => {
  return (
    <div className="flex flex-col gap-10">
      {dataList.map((data) => (
        <TrashDataCard
          key={data.id}
          data={data}
          isRestoreMode={isRestoreMode}
          isSelected={selectedItemIds.includes(
            data.id,
          )}
          onSelect={onSelect}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
};

export default TrashDataList;