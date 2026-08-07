type ChatLimitModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSubscribe: () => void;
};

const ChatLimitModal = ({
  isOpen,
  title,
  description,
  onClose,
  onSubscribe,
}: ChatLimitModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05040B]/75 backdrop-brightness-50 max-md:items-start">
      <div className="translate-y-5 flex h-[403px] w-[484px] flex-col items-center rounded-[10px] bg-[#090713] px-5 pb-5 pt-10 shadow-[0_0_50px_rgba(145,125,236,0.45)] max-md:mt-[310.74px] max-md:h-[263px] max-md:w-[315px] max-md:translate-y-0 max-md:px-5 max-md:pb-5 max-md:pt-5">
        {/* 제목 */}
        <h2 className="text-center font-['SUIT'] text-[24px] font-normal leading-[150%] tracking-[-0.6px] text-white max-md:text-[18px]">
          {title}
        </h2>

        {/* 설명 */}
        <p className="mt-[5px] whitespace-normal text-center font-['SUIT'] text-[16px] font-medium leading-[150%] tracking-[-0.42px] text-[#777680] max-md:text-[12px] max-md:leading-[18px]">
          {description}
        </p>

        {/* 캐릭터 */}
        <div className="-mx-5 mt-5 flex w-[484px] justify-center max-md:mt-[14px] max-md:w-[315px]">
          <img
            src="/TempCharacter.svg"
            alt=""
            className="size-40 object-contain max-md:size-[112px]"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-5 grid w-[444px] grid-cols-2 gap-3 max-md:mt-[14px] max-md:w-[286.3px] max-md:gap-[8.4px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-[216px] items-center justify-center rounded-[5px] bg-[#515159] font-['SUIT'] text-[16px] font-normal leading- text-[#F4F1FF] transition-colors hover:bg-[#62626B] max-md:h-[35px] max-md:w-[138.95px] max-md:text-[14px] max-md:font-normal"
          >
            돌아가기
          </button>

          <button
            type="button"
            onClick={onSubscribe}
            className="flex h-11 w-[216px] items-center justify-center rounded-[5px] bg-[#917DEC] font-['SUIT'] text-[16px] font-normal text-[#F4F1FF] transition-opacity hover:opacity-90 max-md:h-[35px] max-md:w-[138.95px] max-md:text-[14px] max-md:font-normal"
          >
            구독하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLimitModal;
