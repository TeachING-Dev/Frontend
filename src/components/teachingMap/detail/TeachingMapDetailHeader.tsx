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
        className="flex items-center gap-1 font-['SUIT'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#A1A1A5] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.48px] lg:text-[#9B9AA0]"
      >
        <img
          src="/return-button.svg"
          alt=""
          aria-hidden="true"
          className="h-[14px] w-[14px] shrink-0 lg:h-5 lg:w-5"
        />

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
