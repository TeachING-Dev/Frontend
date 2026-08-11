import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getFolders } from "../apis/folder";
import {
  createTeachingMap,
  getTeachingMap,
  getTeachingMaps,
  saveTemporaryTeachingMap,
} from "../apis/teachingMap";
import FolderLimitModal from "../components/teachingMap/create/FolderLimitModal";
import TeachingMapCreateButton from "../components/teachingMap/create/TeachingMapCreateButton";

import TeachingMapCreateHeader, {
  type TeachingMapType,
} from "../components/teachingMap/create/TeachingMapCreateHeader";

import TeachingMapCreateToast from "../components/teachingMap/create/TeachingMapCreateToast";
import PageContainer from "../components/common/PageContainer";
import TeachingMapDescriptionInput from "../components/teachingMap/create/TeachingMapDescriptionInput";
import TeachingMapFolderSelect from "../components/teachingMap/create/TeachingMapFolderSelect";
import TeachingMapLoadingModal from "../components/teachingMap/create/TeachingMapLoadingModal";
import TeachingMapTitleInput from "../components/teachingMap/create/TeachingMapTitleInput";
import TeachingMapTypeSelect from "../components/teachingMap/create/TeachingMapTypeSelect";

const FREE_TEACHING_MAP_LIMIT = 5;

const DEFAULT_TEACHING_MAP_TYPE: TeachingMapType = "shortcut";

type TeachingMapFolderOption = {
  id: number;
  name: string;
  count: number;
};

const TeachingMapCreatePage = () => {
  const navigate = useNavigate();

  const { draftId } = useParams<{
    draftId?: string;
  }>();

  // URL에 draftId가 있으면 데이터 조회 여부와 상관없이
  // 임시보관함에서 진입한 수정 모드로 처리
  const isTemporaryEditMode = draftId !== undefined;

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const [folders, setFolders] = useState<TeachingMapFolderOption[]>([]);

  const [selectedType, setSelectedType] = useState<TeachingMapType>(
    DEFAULT_TEACHING_MAP_TYPE,
  );

  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  const [currentTeachingMapCount, setCurrentTeachingMapCount] = useState(0);

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("티칭맵 생성에 실패했습니다.");
  const [isTemporarySaveSuccess, setIsTemporarySaveSuccess] = useState(false);
  const parsedDraftId = draftId === undefined ? undefined : Number(draftId);
  const [savedTeachingMapId, setSavedTeachingMapId] = useState<
    number | undefined
  >(
    parsedDraftId !== undefined && Number.isFinite(parsedDraftId)
      ? parsedDraftId
      : undefined,
  );
  const generationTimerRef = useRef<number | null>(null);
  const generationAbortControllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    return () => {
      if (generationTimerRef.current !== null) {
        window.clearTimeout(generationTimerRef.current);
      }
      generationAbortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (parsedDraftId === undefined || !Number.isFinite(parsedDraftId)) {
      return;
    }

    let isCancelled = false;

    const loadTemporaryTeachingMap = async () => {
      try {
        const teachingMap = await getTeachingMap(parsedDraftId);

        if (isCancelled) {
          return;
        }

        setTitle(teachingMap.title ?? "");
        setDescription(teachingMap.description ?? "");
        setSelectedFolderId(teachingMap.folderId);
        setSelectedType(
          teachingMap.type === "DEEPDIVE" ? "deepDive" : "shortcut",
        );
        setSavedTeachingMapId(teachingMap.teachingMapId);
      } catch (error) {
        if (!isCancelled) {
          setToastTitle("임시저장 내용을 불러오지 못했습니다.");
          setToastMessage(
            error instanceof Error
              ? error.message
              : "잠시 후 다시 시도해주세요.",
          );
          setIsTemporarySaveSuccess(false);
          setIsToastOpen(true);
        }
      }
    };

    void loadTemporaryTeachingMap();

    return () => {
      isCancelled = true;
    };
  }, [parsedDraftId]);

  useEffect(() => {
    let isCancelled = false;

    const loadFolders = async () => {
      try {
        const folderList = await getFolders("recent");

        if (isCancelled) {
          return;
        }

        const folderOptions = folderList.map((folder) => ({
          id: folder.folderId,
          name: folder.folderName,
          count: folder.materialCount,
        }));

        setFolders(folderOptions);
        setSelectedFolderId((currentFolderId) => {
          if (
            currentFolderId !== null &&
            folderOptions.some((folder) => folder.id === currentFolderId)
          ) {
            return currentFolderId;
          }

          return folderOptions[0]?.id ?? null;
        });
      } catch (error) {
        if (!isCancelled) {
          setFolders([]);
          setSelectedFolderId(null);
          setToastTitle("폴더 목록을 불러오지 못했습니다.");
          setToastMessage(
            error instanceof Error
              ? error.message
              : "잠시 후 다시 시도해주세요.",
          );
          setIsTemporarySaveSuccess(false);
          setIsToastOpen(true);
        }
      }
    };

    void loadFolders();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadTeachingMapCount = async () => {
      try {
        const [inProgress, finished] = await Promise.all([
          getTeachingMaps({
            status: "IN_PROGRESS",
          }),
          getTeachingMaps({
            status: "FINISHED",
          }),
        ]);

        if (!isCancelled) {
          setCurrentTeachingMapCount(
            inProgress.teachingMaps.length + finished.teachingMaps.length,
          );
        }
      } catch {
        if (!isCancelled) {
          setCurrentTeachingMapCount(0);
        }
      }
    };

    void loadTeachingMapCount();

    return () => {
      isCancelled = true;
    };
  }, []);

  const isFormCompleted = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      selectedFolderId !== null &&
      selectedType !== null
    );
  }, [title, description, selectedFolderId, selectedType]);

  const selectedFolder = useMemo(() => {
    return folders.find((folder) => folder.id === selectedFolderId);
  }, [folders, selectedFolderId]);

  const showFailureToast = (message: string) => {
    setToastTitle("티칭맵 생성에 실패했습니다.");
    setIsTemporarySaveSuccess(false);
    setToastMessage(message);
    setIsToastOpen(true);
  };

  const handleTemporarySave = async () => {
    if (!isFormCompleted) {
      setToastTitle("모든 항목을 입력해야 임시저장 됩니다.");
      setToastMessage("");
      setIsTemporarySaveSuccess(false);
      setIsToastOpen(true);
      return;
    }

    if (!selectedFolder || selectedFolder.count < 3) {
      showFailureToast("티칭맵을 생성하려면 최소 3개 이상의 자료가 필요해요.");
      return;
    }

    try {
      const savedTeachingMap = await saveTemporaryTeachingMap({
        ...(savedTeachingMapId === undefined
          ? {}
          : { teachingMapId: savedTeachingMapId }),
        folderId: selectedFolder.id,
        title: title.trim(),
        description: description.trim(),
        type: selectedType === "deepDive" ? "DEEPDIVE" : "SHORTCUT",
      });

      setSavedTeachingMapId(savedTeachingMap.teachingMapId);
      setToastTitle("임시저장 되었습니다.");
      setToastMessage("");
      setIsTemporarySaveSuccess(true);
      setIsToastOpen(true);
    } catch (error) {
      setToastTitle("임시저장에 실패했습니다.");
      setToastMessage(
        error instanceof Error
          ? error.message
          : "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
      setIsTemporarySaveSuccess(false);
      setIsToastOpen(true);
    }
  };

  const handleCreate = async () => {
    if (!isFormCompleted) {
      return;
    }

    if (currentTeachingMapCount >= FREE_TEACHING_MAP_LIMIT) {
      setIsLimitModalOpen(true);
      return;
    }

    if (!selectedFolder || selectedFolder.count < 3) {
      showFailureToast("티칭맵을 생성하려면 최소 3개 이상의 자료가 필요해요.");

      return;
    }

    setIsLoadingModalOpen(true);
    const abortController = new AbortController();
    generationAbortControllerRef.current = abortController;

    try {
      const createdTeachingMap = await createTeachingMap({
        title: title.trim(),
        description: description.trim(),
        folderId: selectedFolder.id,
        type: selectedType === "deepDive" ? "DEEPDIVE" : "SHORTCUT",
      }, abortController.signal);

      generationAbortControllerRef.current = null;
      setIsLoadingModalOpen(false);
      navigate(`/teaching-map/${createdTeachingMap.teachingMapId}`);
    } catch (error) {
      if (abortController.signal.aborted) {
        return;
      }
      generationAbortControllerRef.current = null;
      setIsLoadingModalOpen(false);
      showFailureToast(
        error instanceof Error
          ? error.message
          : "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  const handleLoadingModalClose = () => {
    generationAbortControllerRef.current?.abort();
    generationAbortControllerRef.current = null;
    if (generationTimerRef.current !== null) {
      window.clearTimeout(generationTimerRef.current);
      generationTimerRef.current = null;
    }
    setIsLoadingModalOpen(false);
  };

  const handleLimitModalClose = () => {
    setIsLimitModalOpen(false);
  };

  const handleSubscribe = () => {
    setIsLimitModalOpen(false);
    navigate("/subscription");
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0A18]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[195px] bg-[linear-gradient(180deg,rgba(134,111,241,0)_0%,rgba(134,111,241,0.3)_100%)]"
      />

      <PageContainer className="relative z-10 pb-[52px] pt-5 lg:pt-10">
        <div className="w-full lg:w-[810px]">
          <TeachingMapCreateHeader
            backPath={
              isTemporaryEditMode ? "/teaching-map/drafts" : "/teaching-map"
            }
            backLabel={
              isTemporaryEditMode
                ? "임시보관함으로 이동"
                : "티칭맵 목록으로 이동"
            }
          />

          <div className="mt-[30px] flex flex-col gap-[20px] lg:gap-10">
            <TeachingMapTitleInput value={title} onChange={setTitle} />

            <TeachingMapDescriptionInput
              value={description}
              onChange={setDescription}
            />

            <TeachingMapFolderSelect
              folders={folders}
              selectedFolderId={selectedFolderId}
              onSelect={setSelectedFolderId}
            />

            <TeachingMapTypeSelect
              selectedType={selectedType}
              onChange={setSelectedType}
            />
          </div>
        </div>

        <div className="mt-10 w-full lg:mt-10">
          <TeachingMapCreateButton
            isSaveDisabled={false}
            isCreateDisabled={!isFormCompleted}
            onSave={handleTemporarySave}
            onCreate={handleCreate}
          />
        </div>
      </PageContainer>

      <TeachingMapLoadingModal
        isOpen={isLoadingModalOpen}
        onClose={handleLoadingModalClose}
      />

      <FolderLimitModal
        isOpen={isLimitModalOpen}
        onClose={handleLimitModalClose}
        onSubscribe={handleSubscribe}
      />

      <TeachingMapCreateToast
        isOpen={isToastOpen}
        title={toastTitle}
        message={toastMessage}
        duration={isTemporarySaveSuccess ? 2000 : 3000}
        onClose={() => {
          setIsToastOpen(false);
          if (isTemporarySaveSuccess) {
            navigate("/teaching-map");
          }
        }}
      />
    </main>
  );
};

export default TeachingMapCreatePage;
