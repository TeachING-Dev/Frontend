export type SourceItem = {
  label: string;
  location: string;
  materialTitle: string;
  folderName: string;
  url?: string;
  startLine?: number | null;
  endLine?: number | null;
  materialId?: number;
  folderId?: number;
};

type SourceListProps = {
  sources: SourceItem[];
  onSourceNameClick: (source: SourceItem) => void;
};

const SourceList = ({
  sources,
  onSourceNameClick,
}: SourceListProps) => {
  return (
    <div className="flex flex-col items-start gap-2.5 max-md:gap-[17px]">
      <div className="inline-block max-w-[605px] rounded-[20px] bg-gradient-to-r from-[#917DEC]/60 to-[#FFFFFF]/30 p-[1px]">
        <div className="max-w-full whitespace-pre-wrap rounded-[19px] bg-gradient-to-b from-[#0B0A18] to-[#453c71] px-4 py-1 text-left font-['SUIT'] text-[15px] font-normal leading-[160%] text-white max-md:flex max-md:h-[31px] max-md:items-center max-md:justify-center max-md:px-4 max-md:py-0 max-md:text-center max-md:text-[14px] max-md:font-normal max-md:leading-[150%]">
          답변 출처
        </div>
      </div>

      <div className="flex w-[605px] max-w-full flex-col gap-2 max-md:w-[353px]">
        {sources.map((source) => (
          <div
            key={`${source.materialId ?? source.label}-${source.label}`}
            className="rounded-[10px] bg-gradient-to-r from-white/20 to-[#4E4E4E]/30 p-[1px] max-md:w-[353px]"
          >
            <button
              type="button"
              onClick={() => onSourceNameClick(source)}
              className="w-full rounded-[9px] bg-[#13151F] px-4 py-3 text-left font-['SUIT'] text-[15px] font-normal leading-[160%] text-white transition-colors hover:bg-zinc-800 max-md:w-[353px] max-md:text-[14px] max-md:font-normal"
            >
              {source.materialTitle}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceList;
