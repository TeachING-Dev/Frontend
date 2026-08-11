import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export type FolderOption = {
  id: number;
  name: string;
};

type FolderSelectProps = {
  folders: FolderOption[];
  selectedFolderId: number;
  onSelect: (folderId: number) => void;
  onCreateFolder?: () => void;

  recommendedFolderId?: number | null;
  recommendedFolderName?: string | null;
};

const FolderSelect = ({
  folders,
  selectedFolderId,
  onSelect,
  onCreateFolder,
  recommendedFolderId,
  recommendedFolderName,
}: FolderSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] =
    useState("");

  const selectedFolderFromList =
    folders.find(
      (folder) =>
        folder.id === selectedFolderId,
      ) ?? null;

  const selectedFolder =
    selectedFolderFromList ??
    (recommendedFolderId ===
      selectedFolderId &&
    recommendedFolderName
      ? {
          id: recommendedFolderId,
          name: recommendedFolderName,
        }
      : null);

  const hasFolders =
    folders.length > 0;

  const hasRecommendedFolder =
    recommendedFolderId != null &&
    recommendedFolderName != null;

  const filteredFolders = useMemo(() => {
    const keyword = searchKeyword
      .trim()
      .toLowerCase();

    if (!keyword) {
      return folders;
    }

    return folders.filter((folder) =>
      folder.name
        .toLowerCase()
        .includes(keyword),
    );
  }, [folders, searchKeyword]);

  const handleFolderSelect = (
    folderId: number,
  ) => {
    onSelect(folderId);
    setIsOpen(false);
    setSearchKeyword("");
  };

  const handleRecommendedFolderSelect =
    () => {
      if (recommendedFolderId == null) {
        return;
      }

      handleFolderSelect(
        recommendedFolderId,
      );
    };

  return (
    <div className="relative w-full lg:w-[300px]">
      {/* 선택된 폴더 */}
      <button
        type="button"
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex h-[48px] w-full items-center justify-between rounded-[5px] bg-[#13151F] px-[16px] text-left lg:h-[40px] lg:px-[12px]"
      >
        <span className="flex min-w-0 items-center gap-[10px]">
          <img
            src="/folder/folder1.png"
            alt=""
            aria-hidden="true"
            className="h-[28px] w-[28px] shrink-0 object-contain lg:h-[24px] lg:w-[24px]"
          />

          <span className="truncate text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#F5F2FF] lg:text-[20px] lg:font-medium lg:tracking-[-0.6px]">
            {selectedFolder?.name ??
              "폴더 선택"}
          </span>
        </span>

        <img
          src="/dropdown.svg"
          alt=""
          aria-hidden="true"
          className={`h-[28px] w-[28px] shrink-0 object-contain transition-transform lg:h-[20px] lg:w-[20px] ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {/* 펼쳐지는 폴더 영역 */}
      {isOpen && (
        <div className="mt-[13px]">
          {hasFolders && (
            <div className="rounded-[10px] bg-[#13151F] p-[10px]">
              {/* 검색창 */}
              <label className="flex h-[38px] items-center gap-[10px] rounded-[5px] bg-[#1F212A] px-[12px]">
                <Search
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#717379]"
                />

                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(event) =>
                    setSearchKeyword(
                      event.target.value,
                    )
                  }
                  placeholder="폴더 검색"
                  className="min-w-0 flex-1 bg-transparent text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#D0D0D2] outline-none placeholder:text-[#717379] placeholder:text-[16px] placeholder:font-medium placeholder:leading-[150%] placeholder:tracking-[-0.48px]"
                />
              </label>

              {/* 추천 */}
              <div className="mt-[20px]">
                <p className="mb-[10px] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379]">
                  추천
                </p>

                {hasRecommendedFolder ? (
                  <button
                    type="button"
                    onClick={
                      handleRecommendedFolderSelect
                    }
                    className="flex h-[36px] w-full items-center gap-[8px] rounded-[5px] px-[8px] text-left transition hover:bg-white/5 lg:h-[40px]"
                  >
                    <img
                      src="/folder/folder1.png"
                      alt=""
                      aria-hidden="true"
                      className="h-[19px] w-[19px] shrink-0 object-contain lg:h-[24px] lg:w-[24px]"
                    />

                    <span className="truncate text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#917DEC] lg:text-[18px] lg:font-medium lg:tracking-[-0.54px]">
                      {
                        recommendedFolderName
                      }
                    </span>
                  </button>
                ) : (
                  <div className="flex h-[36px] w-full items-center gap-[8px] px-[8px] lg:h-[40px]">
                    <img
                      src="/folder/folder1.png"
                      alt=""
                      aria-hidden="true"
                      className="h-[19px] w-[19px] shrink-0 object-contain opacity-50 lg:h-[24px] lg:w-[24px]"
                    />

                    <span className="text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#42444C] lg:text-[18px] lg:font-medium lg:tracking-[-0.54px]">
                      AI가 추천하는 폴더
                    </span>
                  </div>
                )}
              </div>

              {/* 내 폴더 */}
              <div className="mt-[20px]">
                <p className="mb-[10px] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379]">
                  내 폴더
                </p>

                <div
                  role="listbox"
                  className="max-h-[320px] overflow-y-auto"
                >
                  {filteredFolders.length >
                  0 ? (
                    filteredFolders.map(
                      (folder) => {
                        const isSelected =
                          folder.id ===
                          selectedFolderId;

                        return (
                          <button
                            key={
                              folder.id
                            }
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
                            className={`flex h-[36px] w-full items-center gap-[8px] rounded-[5px] px-[8px] text-left transition lg:h-[40px] lg:px-[10px] ${
                              isSelected
                                ? "bg-[#1F212A]"
                                : "hover:bg-white/5"
                            }`}
                          >
                            <img
                              src="/folder/folder1.png"
                              alt=""
                              aria-hidden="true"
                              className="h-[19px] w-[19px] shrink-0 object-contain lg:h-[24px] lg:w-[24px]"
                            />

                            <span className="truncate text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#F5F2FF] lg:text-[18px] lg:font-medium lg:tracking-[-0.54px] lg:text-[#917DEC]">
                              {
                                folder.name
                              }
                            </span>
                          </button>
                        );
                      },
                    )
                  ) : (
                    <p className="px-[10px] py-[16px] text-[18px] text-[#717379]">
                      검색 결과가
                      없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 새 폴더 만들기 */}
          <button
            type="button"
            onClick={onCreateFolder}
            className={`flex h-[50px] w-full items-center gap-[8px] rounded-[10px] bg-[#13151F] px-[10px] text-left transition hover:bg-[#1F212A] ${
              hasFolders
                ? "mt-[20px]"
                : ""
            }`}
          >
            <img
              src="/folder/folder-add.png"
              alt=""
              aria-hidden="true"
              className="h-[28px] w-[28px] shrink-0 object-contain"
            />

            <span className="text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#717379]">
              새 폴더 만들기
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderSelect;
