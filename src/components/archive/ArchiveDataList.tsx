import ArchiveDataItem from "./ArchiveDataItem";

export type ArchiveData = {
  id: number;
  tag: string;
  date: string;
  title: string;
  description: string;
};

type ArchiveDataListProps = {
  data: ArchiveData[];
  isMoveMode: boolean;
  selectedItemIds: number[];
  onToggleItem: (id: number) => void;
  onItemClick: (id: number) => void;
  onAiAnalysis?: (id: number) => void;
  onOpenOriginal?: (id: number) => void;
};

const ArchiveDataList = ({
  data,
  isMoveMode,
  selectedItemIds,
  onToggleItem,
  onItemClick,
  onAiAnalysis,
  onOpenOriginal,
}: ArchiveDataListProps) => {
  return (
    <div className="flex flex-col gap-5">
      {data.map((item) => (
        <ArchiveDataItem
          key={item.id}
          tag={item.tag}
          date={item.date}
          title={item.title}
          description={item.description}
          isMoveMode={isMoveMode}
          isSelected={selectedItemIds.includes(item.id)}
          onSelect={() => onToggleItem(item.id)}
          onClick={() => onItemClick(item.id)}
          onAiAnalysis={() => onAiAnalysis?.(item.id)}
          onOpenOriginal={() =>
            onOpenOriginal?.(item.id)
          }
        />
      ))}
    </div>
  );
};

export default ArchiveDataList;