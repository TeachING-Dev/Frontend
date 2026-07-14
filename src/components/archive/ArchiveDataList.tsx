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
};

const ArchiveDataList = ({ data }: ArchiveDataListProps) => {
  return (
    <div className="flex flex-col gap-5">
      {data.map((item) => (
        <ArchiveDataItem
          key={item.id}
          tag={item.tag}
          date={item.date}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default ArchiveDataList;