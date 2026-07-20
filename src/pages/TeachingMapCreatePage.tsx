import {
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import FolderLimitModal from "../components/teachingMap/create/FolderLimitModal";
import TeachingMapCreateButton from "../components/teachingMap/create/TeachingMapCreateButton";
import TeachingMapCreateHeader, {
  type TeachingMapType,
} from "../components/teachingMap/create/TeachingMapCreateHeader";
import TeachingMapCreateToast from "../components/teachingMap/create/TeachingMapCreateToast";
import TeachingMapDescriptionInput from "../components/teachingMap/create/TeachingMapDescriptionInput";
import TeachingMapFolderSelect from "../components/teachingMap/create/TeachingMapFolderSelect";
import TeachingMapLoadingModal from "../components/teachingMap/create/TeachingMapLoadingModal";
import TeachingMapTitleInput from "../components/teachingMap/create/TeachingMapTitleInput";
import TeachingMapTypeSelect from "../components/teachingMap/create/TeachingMapTypeSelect";
import { ARCHIVE_FOLDERS } from "../constants/archiveFolders";

const FREE_TEACHING_MAP_LIMIT = 5;

// TODO: 사용자 티칭맵 목록 API 연결 후 실제 개수로 교체
const CURRENT_TEACHING_MAP_COUNT = 0;

const DEFAULT_TEACHING_MAP_TYPE: TeachingMapType =
  "shortcut";

const TeachingMapCreatePage = () => {
  const navigate = useNavigate();

  const latestFolder =
    ARCHIVE_FOLDERS.length > 0
      ? ARCHIVE_FOLDERS[
          ARCHIVE_FOLDERS.length - 1
        ]
      : null;

  const defaultFolderId =
    latestFolder?.id ?? null;

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [
    selectedFolderId,
    setSelectedFolderId,
  ] = useState<number | null>(
    defaultFolderId,
  );

  const [
    selectedType,
    setSelectedType,
  ] = useState<TeachingMapType>(
    DEFAULT_TEACHING_MAP_TYPE,
  );

  const [
    isLoadingModalOpen,
    setIsLoadingModalOpen,
  ] = useState(false);

  const [
    isLimitModalOpen,
    setIsLimitModalOpen,
  ] = useState(false);

  const [
    isToastOpen,
    setIsToastOpen,
  ] = useState(false);

  const [
    toastMessage,
    setToastMessage,
  ] = useState("");

  const canTemporarySave =
    title.trim().length > 0 ||
    description.trim().length > 0 ||
    selectedFolderId !== defaultFolderId ||
    selectedType !==
      DEFAULT_TEACHING_MAP_TYPE;

  const isFormCompleted = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      selectedFolderId !== null &&
      selectedType !== null
    );
  }, [
    title,
    description,
    selectedFolderId,
    selectedType,
  ]);

  const selectedFolder = useMemo(() => {
    return ARCHIVE_FOLDERS.find(
      (folder) =>
        folder.id === selectedFolderId,
    );
  }, [selectedFolderId]);

  const showFailureToast = (
    message: string,
  ) => {
    setToastMessage(message);
    setIsToastOpen(true);
  };

  const handleTemporarySave = () => {
    if (!canTemporarySave) {
      return;
    }

    const temporaryTeachingMap = {
      id: Date.now(),
      title: title.trim(),
      description:
        description.trim(),
      folderId: selectedFolderId,
      type: selectedType,
      savedAt:
        new Date().toISOString(),
    };

    console.log(
      "임시 저장할 티칭맵:",
      temporaryTeachingMap,
    );

    // TODO: 티칭맵 임시 저장 API 연결
  };

  const handleCreate = () => {
    if (!isFormCompleted) {
      return;
    }

    if (
      CURRENT_TEACHING_MAP_COUNT >=
      FREE_TEACHING_MAP_LIMIT
    ) {
      setIsLimitModalOpen(true);
      return;
    }

    if (
      !selectedFolder ||
      selectedFolder.count < 3
    ) {
      showFailureToast(
        "티칭맵을 생성하려면 최소 3개 이상의 자료가 필요해요.",
      );

      return;
    }

    setIsLoadingModalOpen(true);

    const newTeachingMapId =
      Date.now();

    const newTeachingMap = {
      id: newTeachingMapId,
      title: title.trim(),
      description:
        description.trim(),
      folderId: selectedFolderId,
      type: selectedType,
    };

    console.log(
      "생성할 티칭맵:",
      newTeachingMap,
    );

    // TODO: 티칭맵 생성 API 연결
    //
    // API 성공 시:
    // setIsLoadingModalOpen(false);
    // navigate(`/teaching-map/${newTeachingMapId}`);
    //
    // API 실패 시:
    // setIsLoadingModalOpen(false);
    // showFailureToast(
    //   "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    // );
  };

  const handleLoadingModalClose = () => {
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

      <div className="relative z-10 mx-auto w-[1120px] py-[52px]">
        <div className="w-[810px]">
          <TeachingMapCreateHeader
            teachingMapType={
              selectedType
            }
          />

          <div className="mt-[56px] flex flex-col gap-10">
            <TeachingMapTitleInput
              value={title}
              onChange={setTitle}
            />

            <TeachingMapDescriptionInput
              value={description}
              onChange={setDescription}
            />

            <TeachingMapFolderSelect
              folders={ARCHIVE_FOLDERS}
              selectedFolderId={
                selectedFolderId
              }
              onSelect={
                setSelectedFolderId
              }
            />

            <TeachingMapTypeSelect
              selectedType={
                selectedType
              }
              onChange={
                setSelectedType
              }
            />
          </div>
        </div>

        <div className="mt-10 w-full">
          <TeachingMapCreateButton
            isSaveDisabled={
              !canTemporarySave
            }
            isCreateDisabled={
              !isFormCompleted
            }
            onSave={
              handleTemporarySave
            }
            onCreate={handleCreate}
          />
        </div>
      </div>

      <TeachingMapLoadingModal
        isOpen={isLoadingModalOpen}
        onClose={
          handleLoadingModalClose
        }
      />

      <FolderLimitModal
        isOpen={isLimitModalOpen}
        onClose={
          handleLimitModalClose
        }
        onSubscribe={
          handleSubscribe
        }
      />

      <TeachingMapCreateToast
        isOpen={isToastOpen}
        title="티칭맵 생성에 실패했습니다."
        message={toastMessage}
        duration={3000}
        onClose={() =>
          setIsToastOpen(false)
        }
      />
    </main>
  );
};

export default TeachingMapCreatePage;