import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TeachingMapEditForm from "./TeachingMapEditForm";

interface TeachingMapDetailHeaderProps {
  title: string;
  description: string;
  mode: string;
  onSave: (
    title: string,
    description: string,
  ) => void;
}

const TeachingMapDetailHeader = ({
  title,
  description,
  mode,
  onSave,
}: TeachingMapDetailHeaderProps) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] =
    useState(false);

  const handleBack = () => {
    navigate("/teaching-map");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (
    editedTitle: string,
    editedDescription: string,
  ) => {
    onSave(
      editedTitle,
      editedDescription,
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section>
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center gap-[4px] text-[16px] font-normal leading-[24px] tracking-[-0.48px] text-[#9B9AA0]"
      >
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M13.3333 8H2.66667M2.66667 8L6.66667 4M2.66667 8L6.66667 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>
          티칭맵 목록으로 이동
        </span>
      </button>

      <TeachingMapEditForm
        title={title}
        description={description}
        mode={mode}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default TeachingMapDetailHeader;