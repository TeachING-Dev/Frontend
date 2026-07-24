const profileFrameImage = "/myPage/profileframe.svg";

interface MyPageProfileProps {
  nickname: string;
  imageUrl?: string;
}

const MyPageProfile = ({
  nickname,
  imageUrl,
}: MyPageProfileProps) => {
  return (
    <div className="flex w-[200px] flex-col items-center gap-[15px]">
      <img
        src={imageUrl || profileFrameImage}
        alt="프로필"
        className={[
          "h-[200px] w-[200px]",
          imageUrl
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