import {
  ChevronDown,
  Folder,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

export type TeachingMapFolder = {
  id: number;
  name: string;
};

type TeachingMapFolderSelectProps = {
  folders: TeachingMapFolder[];
  selectedFolderId: number | null;
  onSelect: (folderId: number) => void;
};

const TeachingMapFolderSelect = ({
  folders,
  selectedFolderId,
  onSelect,
}: TeachingMapFolderSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId,
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, []);

  const handleFolderSelect = (folderId: number) => {
    onSelect(folderId);
    setIsOpen(false);
  };

  return (
    <section>
      <h2 className="font-['SUIT_Variable'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#E8E8E8]">
        폴더
      </h2>

      <div
        ref={selectRef}
        className="relative mt-4 w-full"
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((previous) => !previous)}
          className="flex h-[64px] w-full items-center rounded-[3px] bg-[#F0EDF9] px-5 text-left outline-none focus:ring-2 focus:ring-[#917DEC]"
        >
          <Folder
            size={22}
            fill="#917DEC"
            className="shrink-0 text-[#917DEC]"
            aria-hidden="true"
          />

          <span className="ml-2 flex-1 truncate font-['SUIT_Variable'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#46465E]">
            {selectedFolder?.name ?? "폴더를 선택해주세요."}
          </span>

          <ChevronDown
            size={24}
            strokeWidth={2.5}
            aria-hidden="true"
            className={`shrink-0 text-[#46465E] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-label="티칭맵 폴더 선택"
            className="absolute left-0 top-[72px] z-50 w-full overflow-hidden rounded-[10px] border border-[#917DEC] bg-[#13151F] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            {folders.length === 0 ? (
              <div className="flex h-12 items-center px-5 font-['SUIT_Variable'] text-[16px] font-medium text-[#8D8E94]">
                생성된 폴더가 없습니다.
              </div>
            ) : (
              <div className="max-h-[192px] overflow-y-auto">
                {folders.map((folder) => {
                  const isSelected =
                    folder.id === selectedFolderId;

                  return (
                    <button
                      key={folder.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() =>
                        handleFolderSelect(folder.id)
                      }
                      className={`flex h-12 w-full items-center px-5 text-left transition ${
                        isSelected
                          ? "bg-[#917DEC]/20"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <Folder
                        size={20}
                        fill="#917DEC"
                        className="shrink-0 text-[#917DEC]"
                        aria-hidden="true"
                      />

                      <span className="ml-2 truncate font-['SUIT_Variable'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#E8E8E8]">
                        {folder.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeachingMapFolderSelect;