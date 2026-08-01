import {
  useEffect,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  createFolder,
  getFolders,
} from "../apis/folder";
import {
  finalizeMaterial,
  type MaterialTag,
} from "../apis/material";

import CreateFolderModal from "../components/archive/modal/CreateFolderModal";
import FolderLimitModal from "../components/archive/modal/CreateErrorModal";

import AnalysisHeader from "../components/home/AnalysisHeader";
import AnalysisSidebar from "../components/home/AnalysisSidebar";
import AnalysisSummary from "../components/home/AnalysisSummary";
import AnalysisUrl from "../components/home/AnalysisUrl";

type FolderOption = {
  id: number;
  name: string;
};

type AnalysisLocationState = {
  originalUrl?: string;
  materialId?: number;
  materialAnalysisId?: number;

  result?: {
    materialAnalysisId: number;
    resultType: string;
    materialId: number;
    existingMaterialId: number;

    /*
     * 새로 추가된 응답값
     */
    folderId: number;
    summary: string;

    originalUrl: string;
    title: string;
    platformType: string;
    status: string;
    chunkCount: number;

    recommendedFolderId:
      | number
      | null;

    recommendedFolderName:
      | string
      | null;

    tags: MaterialTag[];
  };
};

const AnalysisCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as AnalysisLocationState | null;

  const analysisResult =
    state?.result;

  const materialId =
    state?.materialId ??
    analysisResult?.materialId;

  const originalUrl =
    state?.originalUrl ??
    analysisResult?.originalUrl ??
    "";

  const summary =
    analysisResult?.summary ??
    "AI가 분석한 내용을 요약해드릴게요.";

  /* ==============================
     폴더
  ============================== */

  const [folders, setFolders] =
    useState<FolderOption[]>([]);

  const [
    selectedFolderId,
    setSelectedFolderId,
  ] = useState<number>(
    analysisResult?.recommendedFolderId ??
      0,
  );

  const [
    isFolderLoading,
    setIsFolderLoading,
  ] = useState(true);

  /* ==============================
     폴더 생성 모달
  ============================== */

  const [
    isCreateFolderModalOpen,
    setIsCreateFolderModalOpen,
  ] = useState(false);

  const [
    isFolderLimitModalOpen,
    setIsFolderLimitModalOpen,
  ] = useState(false);

  /* ==============================
     태그
  ============================== */

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<MaterialTag[]>(
    analysisResult?.tags ?? [],
  );

  /* ==============================
     저장
  ============================== */

  const [isSaving, setIsSaving] =
    useState(false);

  /* ==============================
     폴더 목록 조회
  ============================== */

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setIsFolderLoading(true);

        const folderData =
          await getFolders("recent");

        const mappedFolders: FolderOption[] =
          folderData.map(
            (folder) => ({
              id: folder.folderId,
              name: folder.folderName,
            }),
          );

        setFolders(mappedFolders);

        /*
         * 사이드바 기본 선택은
         * 기존처럼 추천 폴더만 사용
         */
        const recommendedFolderId =
          analysisResult
            ?.recommendedFolderId;

        const hasRecommendedFolder =
          recommendedFolderId != null &&
          mappedFolders.some(
            (folder) =>
              folder.id ===
              recommendedFolderId,
          );

        if (
          hasRecommendedFolder &&
          recommendedFolderId != null
        ) {
          setSelectedFolderId(
            recommendedFolderId,
          );

          return;
        }

        setSelectedFolderId(0);
      } catch (error) {
        console.error(
          "폴더 목록 조회 실패:",
          error,
        );

        setSelectedFolderId(0);
      } finally {
        setIsFolderLoading(false);
      }
    };

    fetchFolders();
  }, [
    analysisResult
      ?.recommendedFolderId,
  ]);

  /* ==============================
     새 폴더 만들기 버튼
  ============================== */

  const handleOpenCreateFolder =
    () => {
      if (folders.length >= 6) {
        setIsFolderLimitModalOpen(
          true,
        );

        return;
      }

      setIsCreateFolderModalOpen(
        true,
      );
    };

  /* ==============================
     폴더 생성
  ============================== */

  const handleCreateFolder = async (
    folderName: string,
  ) => {
    const createdFolder =
      await createFolder(folderName);

    const newFolder: FolderOption = {
      id: createdFolder.folderId,
      name: createdFolder.folderName,
    };

    /*
     * 새 폴더를 목록에 바로 추가
     */
    setFolders((prev) => [
      newFolder,
      ...prev,
    ]);

    /*
     * 생성한 폴더 자동 선택
     */
    setSelectedFolderId(
      createdFolder.folderId,
    );

    /*
     * 생성 성공 후 모달 닫기
     */
    setIsCreateFolderModalOpen(
      false,
    );
  };

  /* ==============================
     저장
  ============================== */

  const handleSave = async () => {
    if (!materialId) {
      console.error(
        "materialId가 없습니다.",
      );

      return;
    }

    if (!selectedFolderId) {
      console.error(
        "저장할 폴더를 선택해주세요.",
      );

      return;
    }

    try {
      setIsSaving(true);

      const selectedTagIds =
        selectedTags.map(
          (tag) => tag.tagId,
        );

      const finalizeResult =
        await finalizeMaterial(
          materialId,
          {
            folderId:
              selectedFolderId,
            tagIds:
              selectedTagIds,
          },
        );

      console.log(
        "자료 저장 확정 성공:",
        finalizeResult,
      );

      navigate(
        `/archive/folder/${finalizeResult.folderId}`,
      );
    } catch (error) {
      console.error(
        "자료 저장 실패:",
        error,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <main className="relative py-[55px]">
        {!isFolderLoading && (
          <AnalysisSidebar
            folders={folders}
            selectedFolderId={
              selectedFolderId
            }
            onFolderChange={
              setSelectedFolderId
            }
            recommendedFolderId={
              analysisResult
                ?.recommendedFolderId
            }
            recommendedFolderName={
              analysisResult
                ?.recommendedFolderName
            }
            onCreateFolder={
              handleOpenCreateFolder
            }
          />
        )}

        <section className="mx-auto w-[1100px]">
          <div className="ml-[350px]">
            <div className="ml-[30px]">
              <AnalysisHeader
                date="2026-05-10"
                title={
                  analysisResult
                    ?.title ??
                  "분석된 콘텐츠"
                }
                tags={
                  analysisResult
                    ?.tags ?? []
                }
                onSelectedTagsChange={
                  setSelectedTags
                }
              />
            </div>

            <div className="mt-[20px] flex flex-col gap-[20px]">
              <AnalysisUrl
                url={originalUrl}
              />

              <AnalysisSummary
                summary={summary}
                onSummaryChange={() => {}}
              />

              <button
                type="button"
                onClick={handleSave}
                disabled={
                  isSaving ||
                  isFolderLoading ||
                  !materialId ||
                  !selectedFolderId
                }
                className="
                  h-[54px]
                  w-full
                  rounded-[5px]
                  bg-[#917DEC]
                  text-center
                  text-[24px]
                  font-semibold
                  leading-[150%]
                  tracking-[-0.72px]
                  text-white
                  transition-colors
                  hover:bg-[#8269E7]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSaving
                  ? "저장 중..."
                  : "저장하기"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 새 폴더 생성 모달 */}
      {isCreateFolderModalOpen && (
        <CreateFolderModal
          onClose={() =>
            setIsCreateFolderModalOpen(
              false,
            )
          }
          onCreate={
            handleCreateFolder
          }
        />
      )}

      {/* 폴더 생성 제한 모달 */}
      {isFolderLimitModalOpen && (
        <FolderLimitModal
          onClose={() =>
            setIsFolderLimitModalOpen(
              false,
            )
          }
        />
      )}
    </>
  );
};

export default AnalysisCompletePage;