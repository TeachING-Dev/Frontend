import TeachingMapSaveActions from "./TeachingMapSaveActions";

interface TeachingMapEditFormProps {
  title: string;
  description: string;
  mode: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const TeachingMapEditForm = ({
  title,
  description,
  mode,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: TeachingMapEditFormProps) => {
  return (
    <div className="mt-[8px]">
      <div className="flex items-center gap-[20px]">
        <h1 className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
          {title}
        </h1>

        <span className="flex h-[43px] shrink-0 items-center justify-center rounded-[5px] border border-[#C1AEFF] px-[20px] py-[10px] text-[16px] font-normal leading-[24px] tracking-[-0.48px] text-[#C1AEFF]">
          {mode}
        </span>

        {isEditing ? (
          <TeachingMapSaveActions
            onSave={onSave}
            onCancel={onCancel}
          />
        ) : (
          <button
            type="button"
            aria-label="티칭맵 수정"
            onClick={onEdit}
            className="flex h-[40px] w-[40px] shrink-0 items-center justify-center"
          >
            <img
              src="/edit-03.png"
              alt=""
              className="h-[28px] w-[28px] object-contain"
            />
          </button>
        )}
      </div>

      <p className="mt-[2px] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#A1A1A5]">
        {description}
      </p>
    </div>
  );
};

export default TeachingMapEditForm;