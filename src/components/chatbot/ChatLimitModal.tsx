type ChatLimitModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  size?: "small" | "large";
  onClose: () => void;
};

const ChatLimitModal = ({
  isOpen,
  title,
  description,
  size = "large",
  onClose,
}: ChatLimitModalProps) => {
  if (!isOpen) {
    return null;
  }

  const isSmall = size === "small";
  const modalWidthClass = isSmall ? "w-[348px] px-4 pb-4 pt-7" : "w-[448px] px-5 pb-5 pt-8";
  const titleClass = isSmall ? "text-base leading-6" : "text-xl leading-8";
  const descriptionClass = isSmall ? "text-xs leading-4" : "text-sm leading-5";
  const imageClass = isSmall ? "mt-6 h-[106px] w-[108px]" : "mt-7 h-[126px] w-[128px]";
  const buttonWrapperClass = isSmall ? "mt-6 grid w-full grid-cols-2 gap-2" : "mt-7 grid w-full grid-cols-2 gap-3";
  const buttonClass = isSmall ? "h-9 text-sm leading-5" : "h-11 text-base leading-6";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05040B]/75 backdrop-brightness-50">
      <div
        className={`flex flex-col items-center rounded-[5px] bg-[#090713] shadow-[0_0_50px_rgba(145,125,236,0.75)] ${modalWidthClass}`}
      >
        <h2 className={`font-['SUIT_Variable'] font-semibold text-white ${titleClass}`}>{title}</h2>
        <p className={`mt-1 font-['SUIT_Variable'] font-medium text-zinc-500 ${descriptionClass}`}>
          {description}
        </p>

        <img src="/TempCharacter.svg" alt="" className={imageClass} />

        <div className={buttonWrapperClass}>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-[5px] bg-neutral-600 font-['SUIT_Variable'] font-semibold text-violet-50 hover:bg-neutral-500 ${buttonClass}`}
          >
            돌아가기
          </button>
          <button
            type="button"
            className={`rounded-[5px] bg-[#917DEC] font-['SUIT_Variable'] font-semibold text-violet-50 hover:opacity-90 ${buttonClass}`}
          >
            구독하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLimitModal;

