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
      <div className="flex min-w-0 flex-wrap items-center gap-[8px] lg:flex-nowrap lg:gap-[20px]">
        {isEditing ? (
          <label className="grid min-w-0 flex-1 lg:shrink-0 lg:flex-none">
            <span className="sr-only">
              티칭맵 제목
            </span>

            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 whitespace-pre text-[30px] font-normal leading-[135%] tracking-[-0.75px] lg:text-[36px] lg:font-bold lg:leading-[150%] lg:tracking-[-1.08px]"
            >
              {TITLE_PLACEHOLDER}
            </span>

            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 whitespace-pre text-[30px] font-normal leading-[135%] tracking-[-0.75px] lg:text-[36px] lg:font-bold lg:leading-[150%] lg:tracking-[-1.08px]"
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
              className="col-start-1 row-start-1 h-[41px] w-full min-w-0 border-0 bg-transparent p-0 text-[30px] font-normal leading-[135%] tracking-[-0.75px] text-[#E8E8E8] outline-none placeholder:text-[#717379] lg:h-[54px] lg:text-[36px] lg:font-bold lg:leading-[150%] lg:tracking-[-1.08px]"
            />
          </label>
        ) : (
          <h1 className="min-w-0 flex-1 truncate whitespace-nowrap text-[30px] font-normal leading-[135%] tracking-[-0.75px] text-[#E8E8E8] lg:flex-none lg:text-[36px] lg:font-bold lg:leading-[150%] lg:tracking-[-1.08px]">
            {title || TITLE_PLACEHOLDER}
          </h1>
        )}

        <span className="flex h-5 min-w-[62px] shrink-0 items-center justify-center whitespace-nowrap rounded-[5px] border-[0.5px] border-[#917DEC] px-2 py-[2px] text-[12px] font-normal leading-4 tracking-[-0.3px] text-[#917DEC] lg:h-[43px] lg:w-auto lg:border lg:border-[#C1AEFF] lg:px-[20px] lg:py-[10px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.48px] lg:text-[#C1AEFF]">
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
            className="flex h-6 w-6 shrink-0 items-center justify-center lg:h-[40px] lg:w-[40px]"
          >
            <img
              src="/icon/edit.png"
              alt=""
              className="h-6 w-6 object-contain lg:h-[28px] lg:w-[28px]"
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
        <p className="mt-[2px] max-w-full whitespace-normal break-words text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[#A1A1A5] lg:text-[20px] lg:font-semibold lg:leading-[140%] lg:tracking-[-0.6px]">
          {description ||
            DESCRIPTION_PLACEHOLDER}
        </p>
      )}
    </div>
  );
};

export default TeachingMapEditForm;
