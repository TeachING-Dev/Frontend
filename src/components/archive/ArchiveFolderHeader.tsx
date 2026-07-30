import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  Ellipsis,
  Search,
} from "lucide-react";

import DataPopover from "./popover/DataPopover";

export type FolderSortOption =
  | "recent"
  | "title"
  | "oldest";

type ArchiveFolderHeaderProps = {
  folderName: string;
  savedItemCount: number;

  searchKeyword: string;
  sortOption: FolderSortOption;

  onBack: () => void;
  onSearchKeywordChange: (
    keyword: string,
  ) => void;
  onSearch: () => void;
  onSortChange: (
    sort: FolderSortOption,
  ) => void;

  onEditFolderName?: (
    newFolderName: string,
  ) => void;
  onMoveFolder?: () => void;
  onMoveToTrash?: () => void;
};

const sortOptionLabel: Record<
  FolderSortOption,
  string
> = {
  recent: "최신순",
  title: "이름순",
  oldest: "오래된순",
};

const ArchiveFolderHeader = ({
  folderName,
  savedItemCount,
  searchKeyword,
  sortOption,
  onBack,
  onSearchKeywordChange,
  onSearch,
  onSortChange,
  onEditFolderName,
  onMoveFolder,
  onMoveToTrash,
}: ArchiveFolderHeaderProps) => {
  const [isSortOpen, setIsSortOpen] =
    useState(false);

  const [
    isEditingFolderName,
    setIsEditingFolderName,
  ] = useState(false);

  const [
    editedFolderName,
    setEditedFolderName,
  ] = useState(folderName);

  const folderNameInputRef =
    useRef<HTMLInputElement>(null);

  const handleSortSelect = (
    option: FolderSortOption,
  ) => {
    onSortChange(option);
    setIsSortOpen(false);
  };

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    onSearch();
  };

  const handleStartEdit = () => {
    setEditedFolderName(folderName);
    setIsEditingFolderName(true);
  };

  const handleSaveFolderName = () => {
    const trimmedFolderName =
      editedFolderName.trim();

    if (!trimmedFolderName) {
      return;
    }

    onEditFolderName?.(
      trimmedFolderName,
    );

    setIsEditingFolderName(false);
  };

  const handleCancelEdit = () => {
    setEditedFolderName(folderName);
    setIsEditingFolderName(false);
  };

  const handleFolderNameKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSaveFolderName();
    }

    if (event.key === "Escape") {
      handleCancelEdit();
    }
  };

  useEffect(() => {
    if (isEditingFolderName) {
      folderNameInputRef.current?.focus();
      folderNameInputRef.current?.select();
    }
  }, [isEditingFolderName]);

  const isSaveDisabled =
    editedFolderName.trim().length ===
      0 ||
    editedFolderName.trim() ===
      folderName;

  return (
    <section className="mb-[60px]">
      <button
        type="button"
        onClick={onBack}
        className="group mb-1 flex items-center gap-2 rounded px-1 py-1 transition hover:bg-white/10"
      >
        <span
          aria-hidden="true"
          className="text-[20px] font-light leading-none text-[#9B9AA0] transition-colors duration-200 group-hover:text-white"
        >
          &lt;
        </span>

        <span className="text-[16px] text-[#9B9AA0] transition-colors duration-200 group-hover:text-white">
          보관함으로 돌아가기
        </span>
      </button>

      <div className="mb-3 flex min-h-[54px] items-center gap-[17px]">
        {isEditingFolderName ? (
          <>
            <label className="grid shrink-0">
              <span className="sr-only">
                수정할 폴더 이름
              </span>

              <span
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 whitespace-pre text-[36px] font-bold"
              >
                {editedFolderName ||
                  " "}
              </span>

              <input
                ref={
                  folderNameInputRef
                }
                type="text"
                size={1}
                value={
                  editedFolderName
                }
                onChange={(event) =>
                  setEditedFolderName(
                    event.target.value,
                  )
                }
                onKeyDown={
                  handleFolderNameKeyDown
                }
                maxLength={10}
                aria-label="수정할 폴더 이름"
                className="col-start-1 row-start-1 h-[54px] w-full min-w-0 max-w-[500px] bg-transparent text-[36px] font-bold text-white outline-none"
              />
            </label>

            <button
              type="button"
              onClick={
                handleSaveFolderName
              }
              disabled={isSaveDisabled}
              className="ml-2 flex h-[36px] w-[96px] items-center justify-center rounded-[8px] bg-[#917DEC] text-[16px] font-medium text-white transition hover:bg-[#7E68D8] disabled:cursor-not-allowed disabled:bg-[#42444C] disabled:text-[#A5A5AB]"
            >
              저장
            </button>

            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex h-[36px] w-[96px] items-center justify-center rounded-[8px] bg-[#FAFAFA] text-[16px] font-medium text-[#77777E] transition hover:bg-[#E7E7E9]"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <h1 className="text-[36px] font-bold text-white">
              {folderName}
            </h1>

            <button
              type="button"
              onClick={
                handleStartEdit
              }
              aria-label="폴더 이름 수정"
              className="flex h-8 w-8 items-center justify-center rounded transition hover:bg-white/10"
            >
              <img
                src="/icon/edit.png"
                alt=""
                aria-hidden="true"
                className="h-[34px] w-[36px]"
              />
            </button>
          </>
        )}
      </div>

      <p className="mb-6 text-[20px] text-[#A1A1A5]">
        {savedItemCount}개의 저장된
        자료
      </p>

      <div className="flex items-center justify-between">
        <form
          onSubmit={
            handleSearchSubmit
          }
          className="flex h-[60px] w-[640px] items-center rounded bg-[#F1EEFF] px-5"
        >
          <input
            type="search"
            value={searchKeyword}
            onChange={(event) =>
              onSearchKeywordChange(
                event.target.value,
              )
            }
            placeholder="자료 검색"
            aria-label="자료 검색"
            className="flex-1 bg-transparent text-[24px] font-semibold text-[#5D5D5D] outline-none placeholder:text-gray-500 leading-[150%] tracking-[-0.72px]"
          />

          <button
            type="submit"
            aria-label="검색"
            className="flex h-10 w-10 items-center justify-center rounded transition hover:bg-[#DDD6FF]"
          >
            <Search
              size={24}
              className="text-[#8B6DFF]"
            />
          </button>
        </form>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setIsSortOpen(
                  (prev) => !prev,
                )
              }
              className="flex h-[40px] w-[147px] items-center justify-center gap-2 rounded bg-[#24232D] px-3 text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#F5F2FF]"
            >
              <span>
                {
                  sortOptionLabel[
                    sortOption
                  ]
                }
              </span>

              <span
                className={`h-0 w-0 border-x-[8px] border-t-[10px] border-x-transparent border-t-white ${
                  isSortOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute top-[46px] z-10 w-[147px] overflow-hidden rounded bg-[#24232D] shadow-lg">
                <button
                  type="button"
                  onClick={() =>
                    handleSortSelect(
                      "recent",
                    )
                  }
                  className="w-full px-5 py-3 text-[18px] text-white transition hover:bg-[#3A3847]"
                >
                  최신순
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSortSelect(
                      "title",
                    )
                  }
                  className="w-full px-5 py-3 text-[18px] text-white transition hover:bg-[#3A3847]"
                >
                  이름순
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSortSelect(
                      "oldest",
                    )
                  }
                  className="w-full px-5 py-3 text-[18px] text-white transition hover:bg-[#3A3847]"
                >
                  오래된순
                </button>
              </div>
            )}
          </div>

          <DataPopover
            trigger={
              <button
                type="button"
                aria-label="자료 메뉴"
                className="flex h-8 w-8 items-center justify-center rounded text-white transition hover:bg-[#3A3847]"
              >
                <Ellipsis
                  size={28}
                  strokeWidth={3}
                />
              </button>
            }
            onMoveFolder={
              onMoveFolder
            }
            onMoveToTrash={
              onMoveToTrash
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ArchiveFolderHeader;