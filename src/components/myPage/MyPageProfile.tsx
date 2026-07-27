const profileFrameImage = "/myPage/profileframe.svg";

interface MyPageProfileProps {
  nickname: string;
  imageUrl?: string;
}

const MyPageProfile = ({
  nickname,
  imageUrl,
}: MyPageProfileProps) => {
  const hasProfileImage =
    typeof imageUrl === "string" &&
    imageUrl.trim().length > 0 &&
    imageUrl !== "null";

  return (
    <div className="flex w-[200px] flex-col items-center gap-[15px]">
      <img
        src={hasProfileImage ? imageUrl : profileFrameImage}
        alt="프로필 이미지"
        onError={(event) => {
          event.currentTarget.src = profileFrameImage;
          event.currentTarget.className = "h-[200px] w-[200px]";
        }}
        className={[
          "h-[200px] w-[200px]",
          hasProfileImage
            ? "rounded-full object-cover"
            : "",
        ].join(" ")}
      />

      <strong className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#917DEC]">
        {nickname}
      </strong>
    </div>
  );
};

export default MyPageProfile;
