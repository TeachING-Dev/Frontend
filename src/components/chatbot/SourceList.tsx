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
      <div className="inline-block rounded-[20px] bg-gradient-to-r from-[#917DEC]/60 to-[#FFFFFF]/30 p-[1px]">
      <div className="rounded-[19px] bg-gradient-to-b from-[#0B0A18] to-[#453c71] px-4 py-1 font-['SUIT'] text-sm font-normal leading-5 text-white ">
        답변 출처
      </div>
      </div>

      <div className="flex w-[605px] max-w-full flex-col gap-2">
        {sources.map((source) => (
          <div
            key={source.label}
            className="rounded-[10px] bg-gradient-to-r from-white/20 to-[#4E4E4E]/30 p-[1px]"
          >
            <button
              type="button"
              onClick={() => onSourceClick(source.location)}
              className="w-full rounded-[9px] bg-[#13151F] px-4 py-2 text-left font-['SUIT'] text-sm font-normal leading-5 text-white transition-colors hover:bg-zinc-800"
            >
              {source.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceList;