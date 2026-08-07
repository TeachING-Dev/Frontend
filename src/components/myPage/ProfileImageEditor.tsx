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
    <div className="flex w-fit min-w-[88px] flex-col items-center gap-[7px] lg:min-w-[200px] lg:gap-[15px]">
      <div className="relative h-[88px] w-[88px] lg:h-[200px] lg:w-[200px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="프로필"
            draggable={false}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = profileFrameImage;
              event.currentTarget.className =
                "h-full w-full select-none";
            }}
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
          className="absolute bottom-0 right-[4px] flex h-[24px] w-[24px] items-center justify-center rounded-full lg:right-[13px] lg:h-[40px] lg:w-[40px]"
        >
          <img
            src={cameraIcon}
            alt=""
            draggable={false}
            className="h-[24px] w-[24px] select-none lg:h-[40px] lg:w-[40px]"
          />
        </button>
      </div>

      {trimmedNickname && (
        <strong className="whitespace-nowrap text-[16px] font-medium leading-[150%] tracking-[-0.4px] text-[#917DEC] lg:text-[36px] lg:font-bold lg:tracking-[-1.08px]">
          {trimmedNickname}
        </strong>
      )}
    </div>
  );
};

export default ProfileImageEditor;
