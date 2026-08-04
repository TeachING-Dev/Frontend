import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTrashFolderMaterials, type TrashSort } from "../apis/trash";
import PageContainer from "../components/common/PageContainer";
import Pagination from "../components/common/Pagination";
import TrashDataList from "../components/Trash/TrashDataList";
import TrashEmpty from "../components/Trash/TrashEmpty";
import TrashSortDropdown from "../components/Trash/TrashSortDropdown";
import type { TrashDataItem } from "../components/Trash/trashTypes";

const TrashFolderPage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams<{ folderId: string }>();
  const [folderName, setFolderName] = useState("");
  const [materials, setMaterials] = useState<TrashDataItem[]>([]);
  const [sort, setSort] = useState<TrashSort>("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const numericFolderId = Number(folderId);
    if (!Number.isFinite(numericFolderId)) {
      setErrorMessage("올바르지 않은 폴더입니다.");
      return;
    }

    let isCancelled = false;

    const loadMaterials = async () => {
      try {
        setErrorMessage("");
        const result = await getTrashFolderMaterials(
          numericFolderId,
          sort,
          page - 1,
        );
        if (isCancelled) return;

        setFolderName(result.folderName);
        setMaterials(
          result.content.map((material) => ({
            id: material.materialId,
            tag: material.tags[0]?.tagName ?? "기타",
            createdAt: material.createdAt,
            deletedAt: material.deletedAt,
            title: material.title,
            description: material.summary,
            platformType: material.platformType,
            platformImageUrl: material.platformImageUrl,
            originalUrl: material.originalUrl,
          })),
        );
        setTotalPages(result.totalPages);
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "폴더 안의 자료를 불러오지 못했습니다.",
          );
        }
      }
    };

    void loadMaterials();
    return () => {
      isCancelled = true;
    };
  }, [folderId, page, sort]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#0B0A18]">
      <PageContainer className="pb-[120px] pt-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <button
              type="button"
              aria-label="휴지통으로 이동"
              onClick={() => navigate("/trash")}
              className="flex h-12 w-12 items-center justify-center"
            >
              <img
                src="/myPage/leftpoint.svg"
                alt=""
                aria-hidden="true"
                className="h-12 w-12"
              />
            </button>
            <h1 className="font-suit text-[36px] font-bold leading-[54px] tracking-[-1.08px] text-[#FAFAFA]">
              {folderName || "휴지통 폴더"}
            </h1>
          </div>

          <TrashSortDropdown
            sortType={sort}
            onSortChange={(nextSort) => {
              setSort(nextSort);
              setPage(1);
            }}
          />
        </header>

        <section className="mt-10 min-h-[540px]">
          {errorMessage ? (
            <p className="text-center font-suit text-[18px] text-[#F07A7A]">
              {errorMessage}
            </p>
          ) : materials.length === 0 ? (
            <TrashEmpty />
          ) : (
            <TrashDataList
              dataList={materials}
              isRestoreMode={false}
              selectedItemIds={[]}
              onSelect={() => undefined}
            />
          )}
        </section>

        {materials.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.max(1, totalPages)}
            onPageChange={setPage}
          />
        )}
      </PageContainer>
    </main>
  );
};

export default TrashFolderPage;
