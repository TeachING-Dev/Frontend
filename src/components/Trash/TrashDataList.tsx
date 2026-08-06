import formatDeletedAt from "../../utils/formatDeletedAt";
import MaterialCard from "../common/MaterialCard";

import type { TrashDataItem } from "./trashTypes";

interface TrashDataListProps {
  dataList: TrashDataItem[];
  isRestoreMode: boolean;
  selectedItemIds: number[];
  onSelect: (dataId: number) => void;
}

const TrashDataList = ({
  dataList,
  isRestoreMode,
  selectedItemIds,
  onSelect,
}: TrashDataListProps) => (
  <div className="flex flex-col gap-[20px]">
    {dataList.map((data) => (
      <MaterialCard
        key={data.id}
        tag={data.tag}
        date={data.createdAt.split("T")[0]}
        title={data.title}
        description={data.description}
        platformType={data.platformType}
        platformImageUrl={data.platformImageUrl}
        extraMeta={formatDeletedAt(data.deletedAt)}
        selectable={isRestoreMode}
        selected={selectedItemIds.includes(data.id)}
        onSelect={() => onSelect(data.id)}
        onOpenOriginal={
          data.originalUrl
            ? () => window.open(data.originalUrl, "_blank", "noopener,noreferrer")
            : undefined
        }
      />
    ))}
  </div>
);

export default TrashDataList;
