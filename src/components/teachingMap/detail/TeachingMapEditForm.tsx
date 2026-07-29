import { useState } from "react";

import TeachingMapSaveActions from "./TeachingMapSaveActions";

interface TeachingMapEditFormProps {
  title: string;
  description: string;
  mode: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (
    title: string,
    description: string,
  ) => void;
  onCancel: () => void;
}

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 150;

const TITLE_PLACEHOLDER = "티칭맵 제목";
const DESCRIPTION_PLACEHOLDER = "티칭맵 내용";

const TeachingMapEditForm = ({
  title,
  description,
  mode,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: TeachingMapEditFormProps) => {
  const [editedTitle, setEditedTitle] =
    useState(title);

  const [
    editedDescription,
    setEditedDescription,
  ] = useState(description);

  const trimmedTitle = editedTitle.trim();
  const trimmedDescription =
    editedDescription.trim();

  const hasChanges =
    editedTitle !== title ||
    editedDescription !== description;

  const isSaveDisabled =
    !hasChanges ||
    trimmedTitle.length === 0 ||
    trimmedDescription.length === 0;

  const handleSave = () => {
    if (isSaveDisabled) {
      return;
    }

    onSave(
      trimmedTitle,
      trimmedDescription,
    );
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    onCancel();
  };

  const handleEdit = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    onEdit();
  };

  return (
    <div className="mt-[8px]">
      <div className="flex items-center gap-[20px]">
        {isEditing ? (
          <label className="grid shrink-0">
            <span className="sr-only">
              티칭맵 제목
            </span>

            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 whitespace-pre text-[36px] font-bold leading-[150%] tracking-[-1.08px]"
            >
              {TITLE_PLACEHOLDER}
            </span>

            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 whitespace-pre text-[36px] font-bold leading-[150%] tracking-[-1.08px]"
            >
              {editedTitle || " "}
            </span>

            <input
              type="text"
              size={1}
              value={editedTitle}
              maxLength={MAX_TITLE_LENGTH}
              placeholder={TITLE_PLACEHOLDER}
              autoFocus
              onChange={(event) =>
                setEditedTitle(
                  event.target.value,
                )
              }
              className="col-start-1 row-start-1 h-[54px] w-full min-w-0 border-0 bg-transparent p-0 text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8] outline-none placeholder:text-[#717379]"
            />
          </label>
        ) : (
          <h1 className="whitespace-nowrap text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
            {title || TITLE_PLACEHOLDER}
          </h1>
        )}

        <span className="flex h-[43px] shrink-0 items-center justify-center rounded-[5px] border border-[#C1AEFF] px-[20px] py-[10px] text-[16px] font-normal leading-[24px] tracking-[-0.48px] text-[#C1AEFF]">
          {mode}
        </span>

        {isEditing ? (
          <TeachingMapSaveActions
            isSaveDisabled={
              isSaveDisabled
            }
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <button
            type="button"
            aria-label="티칭맵 수정"
            onClick={handleEdit}
            className="flex h-[40px] w-[40px] shrink-0 items-center justify-center"
          >
            <img
              src="/icon/edit.png"
              alt=""
              className="h-[28px] w-[28px] object-contain"
            />
          </button>
        )}
      </div>

      {isEditing ? (
        <label className="mt-[2px] grid w-fit max-w-full">
          <span className="sr-only">
            티칭맵 내용
          </span>

          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 whitespace-pre text-[20px] font-semibold leading-[140%] tracking-[-0.6px]"
          >
            {DESCRIPTION_PLACEHOLDER}
          </span>

          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 whitespace-pre text-[20px] font-semibold leading-[140%] tracking-[-0.6px]"
          >
            {editedDescription || " "}
          </span>

          <input
            type="text"
            size={1}
            value={editedDescription}
            maxLength={
              MAX_DESCRIPTION_LENGTH
            }
            placeholder={
              DESCRIPTION_PLACEHOLDER
            }
            onChange={(event) =>
              setEditedDescription(
                event.target.value,
              )
            }
            className="col-start-1 row-start-1 h-[28px] w-full min-w-0 border-0 bg-transparent p-0 text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#A1A1A5] outline-none placeholder:text-[#717379]"
          />
        </label>
      ) : (
        <p className="mt-[2px] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#A1A1A5]">
          {description ||
            DESCRIPTION_PLACEHOLDER}
        </p>
      )}
    </div>
  );
};

export default TeachingMapEditForm;