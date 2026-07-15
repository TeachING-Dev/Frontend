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
};

const ArchiveDataList = ({
  data,
  isMoveMode,
  selectedItemIds,
  onToggleItem,
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
        />
      ))}
    </div>
  );
};

export default ArchiveDataList;