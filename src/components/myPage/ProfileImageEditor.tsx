const cameraIcon = "/myPage/camera.svg";
const profileFrameImage = "/myPage/profileframe.svg";

interface ProfileImageEditorProps {
  nickname: string;
  imageUrl?: string;
  onImageClick?: () => void;
}

const ProfileImageEditor = ({
  nickname,
  imageUrl,
  onImageClick,
}: ProfileImageEditorProps) => {
  const trimmedNickname = nickname.trim();

  return (
    <div className="flex w-[200px] flex-col items-center gap-[15px]">
      <div className="relative h-[200px] w-[200px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="프로필"
            draggable={false}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <img
            src={profileFrameImage}
            alt="프로필"
            draggable={false}
            className="h-full w-full select-none"
          />
        )}

        <button
          type="button"
          aria-label="프로필 이미지 변경"
          onClick={onImageClick}
          className="absolute bottom-0 right-[13px] flex h-[40px] w-[40px] items-center justify-center rounded-full"
        >
          <img
            src={cameraIcon}
            alt=""
            draggable={false}
            className="h-[40px] w-[40px] select-none"
          />
        </button>
      </div>

      {trimmedNickname && (
        <strong className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#917DEC]">
          {trimmedNickname}
        </strong>
      )}
    </div>
  );
};

export default ProfileImageEditor;