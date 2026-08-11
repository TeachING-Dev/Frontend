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

import DataPopover from "../popover/DataPopover";

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
    <section className="mb-[30px] lg:mb-[60px]">
      <button
        type="button"
        onClick={onBack}
        className="group mb-[10px] flex h-[24px] items-center gap-[4px] rounded transition hover:bg-white/10 lg:mb-1 lg:h-auto lg:w-auto lg:gap-2 lg:px-1 lg:py-1"
      >
        <span
          aria-hidden="true"
          className="text-[18px] font-light leading-none text-[#9B9AA0] transition-colors duration-200 lg:text-[20px] group-hover:text-white"
        >
          &lt;
        </span>

        <span className="text-[13px] text-[#9B9AA0] transition-colors duration-200 group-hover:text-white lg:text-[16px]">
          보관함으로 돌아가기
        </span>
      </button>

      <div className="mb-[5px] flex min-h-[36px] items-center gap-[10px] lg:mb-3 lg:min-h-[54px] lg:gap-[17px]">
        {isEditingFolderName ? (
          <>
            <label className="grid shrink-0">
              <span className="sr-only">
                수정할 폴더 이름
              </span>

              <span
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 whitespace-pre text-[24px] font-bold lg:text-[36px]"
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
                className="col-start-1 row-start-1 h-[36px] w-full min-w-0 max-w-[500px] bg-transparent text-[24px] font-bold text-white outline-none lg:h-[54px] lg:text-[36px]"
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
            <h1 className="text-[24px] font-bold leading-[150%] tracking-[-0.6px] text-white lg:text-[36px] lg:tracking-normal">
              {folderName}
            </h1>

            <button
              type="button"
              onClick={
                handleStartEdit
              }
              aria-label="폴더 이름 수정"
              className="flex h-[24px] w-[24px] items-center justify-center rounded transition hover:bg-white/10 lg:h-8 lg:w-8"
            >
              <img
                src="/icon/edit.png"
                alt=""
                aria-hidden="true"
                className="h-[22px] w-[22px] lg:h-[34px] lg:w-[36px]"
              />
            </button>
          </>
        )}
      </div>

      <p className="mb-[20px] text-[14px] text-[#A1A1A5] lg:mb-6 lg:text-[20px]">
        {savedItemCount}개의 저장된 자료
      </p>

      <div className="flex flex-col gap-[10px] lg:flex-row lg:items-end lg:justify-between lg:gap-0">
        <form
          onSubmit={
            handleSearchSubmit
          }
          className="flex h-[40px] w-full items-center rounded bg-[#F1EEFF] px-[10px] lg:h-[60px] lg:w-[640px] lg:px-5"
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
            className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold leading-[150%] tracking-[-0.35px] text-[#5D5D5D] outline-none placeholder:text-gray-500 lg:text-[24px] lg:tracking-[-0.72px]"
          />

          <button
            type="submit"
            aria-label="검색"
            className="flex h-[33.281px] w-[33.281px] items-center justify-center rounded transition hover:bg-[#DDD6FF] lg:h-10 lg:w-10"
          >
            <Search
              size={20}
              className="text-[#8B6DFF]"
            />
          </button>
        </form>

        <div className="flex items-center justify-end gap-[10px] lg:gap-6">
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setIsSortOpen(
                  (prev) => !prev,
                )
              }
              className="flex h-[30px] w-[73.5px] items-center justify-center gap-[4px] rounded bg-transparent text-[13px] font-normal leading-[135%] tracking-[-0.325px] text-[#F5F2FF] lg:h-[40px] lg:w-[147px] lg:gap-2 lg:px-3 lg:text-[20px] lg:font-semibold lg:leading-[140%] lg:tracking-[-0.6px]"
            >
              <span>
                {
                  sortOptionLabel[
                    sortOption
                  ]
                }
              </span>

              <img
                src="/dropdown.svg"
                alt=""
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 lg:h-5 lg:w-5 ${isSortOpen ? "scale-[-1]" : ""}`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-[34px] z-10 w-[110px] overflow-hidden rounded bg-[#24232D] shadow-lg lg:left-0 lg:right-auto lg:top-[46px] lg:w-[147px]">
                <button
                  type="button"
                  onClick={() =>
                    handleSortSelect(
                      "recent",
                    )
                  }
                  className="w-full px-[10px] py-[8px] text-[13px] text-white transition hover:bg-[#3A3847] lg:px-5 lg:py-3 lg:text-[18px]"
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
                  className="w-full px-[10px] py-[8px] text-[13px] text-white transition hover:bg-[#3A3847] lg:px-5 lg:py-3 lg:text-[18px]"
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
                  className="w-full px-[10px] py-[8px] text-[13px] text-white transition hover:bg-[#3A3847] lg:px-5 lg:py-3 lg:text-[18px]"
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
