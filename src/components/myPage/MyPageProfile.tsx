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
    <div className="flex w-fit min-w-[100px] flex-col items-center gap-[5px] lg:min-w-[200px] lg:gap-[15px]">
      <img
        src={hasProfileImage ? imageUrl : profileFrameImage}
        alt="프로필 이미지"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = profileFrameImage;
          event.currentTarget.className = "h-[100px] w-[100px] lg:h-[200px] lg:w-[200px]";
        }}
        className={[
          "h-[100px] w-[100px] lg:h-[200px] lg:w-[200px]",
          hasProfileImage
            ? "rounded-full object-cover"
            : "",
        ].join(" ")}
      />

      <strong className="whitespace-nowrap text-[18px] font-bold leading-[150%] tracking-[-0.54px] text-[#917DEC] lg:text-[36px] lg:tracking-[-1.08px]">
        {nickname}
      </strong>
    </div>
  );
};

export default MyPageProfile;
