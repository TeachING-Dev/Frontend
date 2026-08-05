import MaterialCard from "../common/MaterialCard";

export type ArchiveData = {
  id: number;
  tag: string;
  date: string;
  title: string;
  description: string;
  platformType: string;
  platformImageUrl?: string;
  originalUrl: string;
};

type ArchiveDataListProps = {
  data: ArchiveData[];
  isMoveMode: boolean;
  selectedItemIds: number[];
  onToggleItem: (id: number) => void;
  onAiAnalysis?: (id: number) => void;
  onOpenOriginal?: (originalUrl: string) => void;
};

const ArchiveDataList = ({
  data,
  isMoveMode,
  selectedItemIds,
  onToggleItem,
  onAiAnalysis,
  onOpenOriginal,
}: ArchiveDataListProps) => (
  <div className="flex flex-col gap-5">
    {data.map((item) => (
      <MaterialCard
        key={item.id}
        tag={item.tag}
        date={item.date}
        title={item.title}
        description={item.description}
        platformType={item.platformType}
        platformImageUrl={item.platformImageUrl}
        selectable={isMoveMode}
        selected={selectedItemIds.includes(item.id)}
        showAiButton
        onSelect={() => onToggleItem(item.id)}
        onAiAnalysis={() => onAiAnalysis?.(item.id)}
        onOpenOriginal={
          item.originalUrl
            ? () => onOpenOriginal?.(item.originalUrl)
            : undefined
        }
      />
    ))}
  </div>
);

export default ArchiveDataList;
