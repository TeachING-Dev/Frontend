export type SourceItem = {
  label: string;
  location: string;
};

type SourceListProps = {
  sources: SourceItem[];
  onSourceClick: (location: string) => void;
};

const SourceList = ({ sources, onSourceClick }: SourceListProps) => {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="rounded-[20px] bg-gradient-to-b from-indigo-400/0 to-indigo-400/30 px-4 py-1 font-['SUIT_Variable'] text-sm font-normal leading-5 text-white">
        답변 출처
      </div>

      <div className="flex w-[605px] max-w-full flex-col gap-2">
        {sources.map((source) => (
          <button
            type="button"
            key={source.label}
            onClick={() => onSourceClick(source.location)}
            className="rounded-[5px] bg-zinc-900 px-4 py-2 text-left font-['SUIT_Variable'] text-sm font-normal leading-5 text-white hover:bg-zinc-800"
          >
            {source.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SourceList;
