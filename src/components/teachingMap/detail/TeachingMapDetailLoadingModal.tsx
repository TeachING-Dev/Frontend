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
      <div className="w-[315px] rounded-[10px] bg-[#0B0A18] px-[20px] py-[20px] shadow-[0_0_50px_0_rgba(145,125,236,0.5)] lg:w-[480px] lg:px-[40px] lg:py-[36px]">
        <h2 className="text-center text-[16px] font-semibold leading-[150%] tracking-[-0.4px] text-[#FAFAFA] lg:text-[24px] lg:tracking-[-0.72px]">
          티칭맵을 저장하고 있어요
        </h2>

        <p className="mt-[5px] text-center text-[12px] font-normal leading-[135%] tracking-[-0.3px] text-[#A1A1A5] lg:mt-[12px] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]">
          잠시만 기다려 주세요.
        </p>

        <div className="mt-[20px] h-[7px] overflow-hidden rounded-full bg-[#2A2B30] lg:mt-[36px] lg:h-[8px]">
          <div className="h-full w-[70%] rounded-full bg-[#917DEC]" />
        </div>
      </div>
    </div>
  );
};

export default TeachingMapDetailLoadingModal;
