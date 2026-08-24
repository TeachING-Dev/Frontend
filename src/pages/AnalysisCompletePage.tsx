import axios from "axios";
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
  type AnalyzeMaterialResult,
  type MaterialTag,
} from "../apis/material";

import CreateFolderModal from "../components/archive/modal/CreateFolderModal";
import FolderLimitModal from "../components/archive/modal/CreateErrorModal";

import AnalysisData from "../components/home/AnalysisData";
import AnalysisHeader from "../components/home/AnalysisHeader";
import AnalysisSidebar from "../components/home/AnalysisSidebar";
import AnalysisSummary from "../components/home/AnalysisSummary";
import DataLimitModal from "../components/home/modal/DataLimitModal";

type FolderOption = {
  id: number;
  name: string;
};

type FolderErrorResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
};

type AnalysisLocationState = {
  originalUrl?: string;
  materialId?: number;
  materialAnalysisId?: number;
  result?: AnalyzeMaterialResult;
};

const AnalysisCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as AnalysisLocationState | null;

  const analysisResult = state?.result;

  const materialId =
    state?.materialId ??
    analysisResult?.materialId ??
    (analysisResult?.resultType ===
      "ALREADY_ANALYZED" &&
    analysisResult.existingFolderId == null
      ? analysisResult.existingMaterialId
      : null);

  const originalUrl =
    state?.originalUrl ??
    analysisResult?.originalUrl ??
    "";

  const summary =
    analysisResult?.summary ??
    "AI가 분석한 내용을 요약해드릴게요.";

  const fullAnalysis =
    analysisResult?.fullAnalysis ?? "";

  const [folders, setFolders] =
    useState<FolderOption[]>([]);

  const [
    selectedFolderId,
    setSelectedFolderId,
  ] = useState(
    analysisResult?.recommendedFolderId ?? 0,
  );

  const [
    isFolderLoading,
    setIsFolderLoading,
  ] = useState(true);

  const [
    isCreateFolderModalOpen,
    setIsCreateFolderModalOpen,
  ] = useState(false);

  const [
    isFolderLimitModalOpen,
    setIsFolderLimitModalOpen,
  ] = useState(false);

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<MaterialTag[]>(
    analysisResult?.tags ?? [],
  );

  const [isSaving, setIsSaving] =
    useState(false);

  const [
    isDataLimitModalOpen,
    setIsDataLimitModalOpen,
  ] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setIsFolderLoading(true);

        const folderData =
          await getFolders("recent");

        const mappedFolders: FolderOption[] =
          folderData.map((folder) => ({
            id: folder.folderId,
            name: folder.folderName,
          }));

        setFolders(mappedFolders);

        const recommendedFolderId =
          analysisResult?.recommendedFolderId;

        if (recommendedFolderId != null) {
          setSelectedFolderId(
            recommendedFolderId,
          );

          return;
        }

        setSelectedFolderId((currentId) =>
          mappedFolders.some(
            (folder) =>
              folder.id === currentId,
          )
            ? currentId
            : 0,
        );
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
    analysisResult?.recommendedFolderId,
  ]);

  const handleOpenCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
  };

  const handleCreateFolder = async (
    folderName: string,
  ) => {
    try {
      const createdFolder =
        await createFolder(folderName);

      const newFolder: FolderOption = {
        id: createdFolder.folderId,
        name: createdFolder.folderName,
      };

      setFolders((prev) => [
        newFolder,
        ...prev,
      ]);

      setSelectedFolderId(
        createdFolder.folderId,
      );

      setIsCreateFolderModalOpen(false);
    } catch (error) {
      console.error(
        "폴더 생성 실패:",
        error,
      );

      if (
        axios.isAxiosError<FolderErrorResponse>(
          error,
        )
      ) {
        const code =
          error.response?.data?.code;

        const serverMessage =
          error.response?.data?.message;

        if (code === "FOLDER4004") {
          setIsCreateFolderModalOpen(
            false,
          );

          setIsFolderLimitModalOpen(true);

          return;
        }

        throw new Error(
          typeof serverMessage === "string"
            ? serverMessage
            : "폴더를 생성하지 못했습니다.",
          { cause: error },
        );
      }

      throw new Error(
        "폴더를 생성하지 못했습니다.",
        { cause: error },
      );
    }
  };

  const handleSave = async () => {
    if (materialId == null) {
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
            folderId: selectedFolderId,
            tagIds: selectedTagIds,
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

      if (
        axios.isAxiosError<FolderErrorResponse>(
          error,
        ) &&
        error.response?.data?.code ===
          "MATERIAL4012"
      ) {
        setIsDataLimitModalOpen(true);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <main className="px-[16px] pb-[100px] pt-0 lg:px-0 lg:py-[55px]">
        {/* 사이드바 + 본문 */}
        <div className="mx-auto flex w-full max-w-[1100px] items-start justify-center gap-0 lg:gap-[100px]">
          {/* 사이드바 */}
          {!isFolderLoading && (
            <AnalysisSidebar
              className="hidden lg:block"
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

          {/* 본문 */}
          <section className="min-w-0 flex-1">
            <AnalysisHeader
              date="2026-05-10"
              title={
                analysisResult?.title ??
                "분석된 콘텐츠"
              }
              originUrl={originalUrl}
              tags={
                analysisResult?.tags ?? []
              }
              onSelectedTagsChange={
                setSelectedTags
              }
              mobileFolderSelect={
                !isFolderLoading ? (
                  <AnalysisSidebar
                    className="block lg:hidden"
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
                ) : null
              }
            />

            <div className="flex flex-col gap-[20px] lg:mt-[20px]">
              <AnalysisSummary
                summary={summary}
              />

              <AnalysisData
                content={fullAnalysis}
              />

              <button
                type="button"
                onClick={handleSave}
                disabled={
                  isSaving ||
                  isFolderLoading ||
                  materialId == null ||
                  !selectedFolderId
                }
                className="
                  h-[44px]
                  w-full
                  rounded-[5px]
                  bg-[#917DEC]
                  text-center
                  text-[16px]
                  font-normal
                  leading-[150%]
                  tracking-[-0.4px]
                  text-white
                  transition-colors
                  hover:bg-[#8269E7]
                  disabled:cursor-not-allowed
                  disabled:bg-[#2B2C35]
                  disabled:text-[#717379]
                  lg:h-[54px]
                  lg:text-[24px]
                  lg:font-semibold
                  lg:tracking-[-0.72px]
                "
              >
                {isSaving
                  ? "저장 중..."
                  : "저장하기"}
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* 새 폴더 생성 모달 */}
      {isCreateFolderModalOpen && (
        <CreateFolderModal
          onClose={() =>
            setIsCreateFolderModalOpen(
              false,
            )
          }
          onCreate={handleCreateFolder}
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

      <DataLimitModal
        isOpen={isDataLimitModalOpen}
        onClose={() =>
          setIsDataLimitModalOpen(false)
        }
        onSubscribe={() => {
          setIsDataLimitModalOpen(false);
          navigate("/subscription");
        }}
      />
    </>
  );
};

export default AnalysisCompletePage;
