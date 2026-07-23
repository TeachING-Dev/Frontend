const profileFrameImage = "/myPage/profileframe.svg";

interface MyPageProfileProps {
  nickname: string;
}

const MyPageProfile = ({
  nickname,
}: MyPageProfileProps) => {
  return (
    <div className="flex w-[200px] flex-col items-center gap-[15px]">
      <img
        src={profileFrameImage}
        alt="프로필"
        className="h-[200px] w-[200px]"
      />

      <strong className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#917DEC]">
        {nickname}
      </strong>
    </div>
  );
};

export default MyPageProfile;