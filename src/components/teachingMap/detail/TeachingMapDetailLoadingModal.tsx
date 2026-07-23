interface TeachingMapDetailLoadingModalProps {
  isOpen: boolean;
}

const TeachingMapDetailLoadingModal = ({
  isOpen,
}: TeachingMapDetailLoadingModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,10,24,0.9)]">
      <div className="w-[480px] rounded-[10px] bg-[#0B0A18] px-[40px] py-[36px] shadow-[0_0_50px_0_rgba(145,125,236,0.5)]">
        <h2 className="text-center text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]">
          티칭맵을 저장하고 있어요
        </h2>

        <p className="mt-[12px] text-center text-[16px] font-normal leading-[150%] tracking-[-0.48px] text-[#A1A1A5]">
          잠시만 기다려 주세요.
        </p>

        <div className="mt-[36px] h-[8px] overflow-hidden rounded-full bg-[#2A2B30]">
          <div className="h-full w-[70%] rounded-full bg-[#917DEC]" />
        </div>
      </div>
    </div>
  );
};

export default TeachingMapDetailLoadingModal;