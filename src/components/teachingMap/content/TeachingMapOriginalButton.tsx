interface TeachingMapOriginalButtonProps {
  originalUrl: string;
}

const TeachingMapOriginalButton = ({
  originalUrl,
}: TeachingMapOriginalButtonProps) => {
  const handleOpenOriginal = () => {
    if (!originalUrl) {
      return;
    }

    window.open(
      originalUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <button
      type="button"
      disabled={!originalUrl}
      onClick={handleOpenOriginal}
      className="flex h-[40px] w-[164px] shrink-0 items-center justify-center gap-[12px] rounded-[5px] bg-[#13151F] p-[10px] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <img
        src="/globe.svg"
        alt=""
        className="h-[24px] w-[24px] object-contain"
      />

      <span className="whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#F5F2FF]">
        원문으로 이동
      </span>
    </button>
  );
};

export default TeachingMapOriginalButton;
