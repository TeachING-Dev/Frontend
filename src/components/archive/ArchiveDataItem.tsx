import MaterialCard from "../common/MaterialCard";

type ArchiveDataItemProps = {
  tag: string;
  date: string;
  title: string;
  description: string;
  platformType: string;
  platformImageUrl?: string;
  isMoveMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onAiAnalysis?: () => void;
  onOpenOriginal?: () => void;
};

const ArchiveDataItem = ({
  tag,
  date,
  title,
  description,
  platformType,
  platformImageUrl,
  isMoveMode = false,
  isSelected = false,
  onSelect,
  onAiAnalysis,
  onOpenOriginal,
}: ArchiveDataItemProps) => {
  return (
    <MaterialCard
      variant="archive"
      tag={tag}
      date={date}
      title={title}
      description={description}
      platformType={platformType}
      platformImageUrl={platformImageUrl}
      sourceImageClassName="h-[36px] w-[36px] shrink-0 rounded-full object-contain"
      sourceImageAlt={platformType}
      selectable={isMoveMode}
      selected={isSelected}
      showAiButton
      showOriginalButton
      onSelect={onSelect}
      onAiAnalysis={onAiAnalysis}
      onOpenOriginal={onOpenOriginal}
    />
  );
};

export default ArchiveDataItem;
