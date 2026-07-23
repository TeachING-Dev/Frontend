import TrashDataCard from "./TrashDataCard";
import type { TrashDataItem } from "./trashTypes";

interface TrashDataListProps {
  dataList: TrashDataItem[];
  onRestore: (dataId: number) => void;
}

const TrashDataList = ({
  dataList,
  onRestore,
}: TrashDataListProps) => {
  return (
    <div className="flex flex-col gap-10">
      {dataList.map((data) => (
        <TrashDataCard
          key={data.id}
          data={data}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
};

export default TrashDataList;