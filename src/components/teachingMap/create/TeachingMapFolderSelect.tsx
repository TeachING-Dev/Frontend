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
  const [isOpen, setIsOpen] =
    useState(false);

  const selectRef =
    useRef<HTMLDivElement>(null);

  const selectedFolder = folders.find(
    (folder) =>
      folder.id === selectedFolderId,
  );

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    document.addEventListener(
      "keydown",
      handleEscapeKey,
    );

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

  const handleFolderSelect = (
    folderId: number,
  ) => {
    onSelect(folderId);
    setIsOpen(false);
  };

  return (
    <section>
      <h2 className="font-['SUIT'] text-[28px] font-bold leading-[42px] tracking-[-0.84px] text-[#E8E8E8]">
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
          onClick={() =>
            setIsOpen(
              (previous) => !previous,
            )
          }
          className="flex h-[64px] w-full items-center rounded-[4px] bg-[#F5F2FF] px-5 text-left outline-none"
        >
          <img
            src="/Folder.png"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0 object-contain"
          />

          <span className="ml-2 flex-1 truncate font-['SUIT'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#5D5D5D]">
            {selectedFolder?.name ??
              "폴더를 선택해주세요."}
          </span>

          <img
            src={
              isOpen
                ? "/rollup.svg"
                : "/dropdown.svg"
            }
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0"
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-label="티칭맵 폴더 선택"
            className="absolute left-0 top-[72px] z-50 w-full overflow-hidden rounded-[5px] bg-[#FAFAFA] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            {folders.length === 0 ? (
              <div className="flex h-9 items-center px-2 font-['SUIT'] text-[16px] font-medium text-[#8D8E94]">
                생성된 폴더가 없습니다.
              </div>
            ) : (
              <div className="max-h-[108px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {folders.map((folder) => {
                  const isSelected =
                    folder.id ===
                    selectedFolderId;

                  return (
                    <button
                      key={folder.id}
                      type="button"
                      role="option"
                      aria-selected={
                        isSelected
                      }
                      onClick={() =>
                        handleFolderSelect(
                          folder.id,
                        )
                      }
                      className={[
                        "flex h-9 w-full items-center gap-2 border-b border-[#D0D0D2] px-2 text-left",
                        "font-['SUIT'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#5D5D5D]",
                        "transition-colors last:border-b-0",
                        isSelected
                          ? "bg-[#D2C7FA]"
                          : "bg-[#FAFAFA] hover:bg-[#EEEAFD]",
                      ].join(" ")}
                    >
                      <img
                        src="/Folder.png"
                        alt=""
                        aria-hidden="true"
                        className="h-[18px] w-[18px] shrink-0 object-contain"
                      />

                      <span className="truncate">
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
