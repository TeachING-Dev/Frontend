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

  const formattedDescription = description.replace(
    /요금제를\s*업그레이드\s*하고\s*/,
    "요금제를 업그레이드하고\n",
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05040B]/75 backdrop-brightness-50">
      <div className="flex h-[303px] w-[360px] flex-col items-center rounded-[10px] bg-[#090713] px-5 pb-5 pt-[30px] shadow-[0_0_50px_rgba(145,125,236,0.45)]">
        {/* 제목 */}
        <h2 className="text-center font-['SUIT_Variable'] text-[16px] font-semibold leading-[150%] tracking-[-0.6px] text-white">
          {title}
        </h2>

        {/* 설명 */}
        <p className="mt-1 whitespace-pre-line text-center font-['SUIT_Variable'] text-[12px] font-medium leading-[18px] tracking-[-0.42px] text-[#777680]">
          {formattedDescription}
        </p>

        {/* 캐릭터 */}
        <div className="-mx-5 mt-[14px] flex w-[360px] justify-center">
          <img
            src="/TempCharacter.svg"
            alt=""
            className="h-[120px] w-[128px] object-contain"
          />
        </div>

        {/* 버튼 */}
        <div className="-mx-2 mt-[15px] grid w-[calc(100%+16px)] grid-cols-2 gap-[8px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 items-center justify-center rounded-[5px] bg-[#515159] font-['SUIT_Variable'] text-[12px] font-semibold leading- text-[#F4F1FF] transition-colors hover:bg-[#62626B]"
          >
            돌아가기
          </button>

          <button
            type="button"
            onClick={onSubscribe}
            className="flex h-10 items-center justify-center rounded-[5px] bg-[#917DEC] font-['SUIT_Variable'] text-[12px] font-semibold leading-5 text-[#F4F1FF] transition-opacity hover:opacity-90"
          >
            구독하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLimitModal;
