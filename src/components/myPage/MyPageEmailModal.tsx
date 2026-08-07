import { useEffect, useState } from "react";
import Toast from "../common/Toast";

interface MyPageEmailModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

const MyPageEmailModal = ({
  isOpen,
  email,
  onClose,
}: MyPageEmailModalProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsCopied(false);
    onClose();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(11,10,24,0.9)]"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-modal-title"
        className="flex w-[calc(100%-32px)] max-w-[361px] flex-col items-start gap-[10px] rounded-[10px] bg-[#0B0A18] p-[20px] shadow-[0_0_50px_0_rgba(145,125,236,0.5)] lg:w-[355px]"
      >
        <h2
          id="email-modal-title"
          className="font-['SUIT'] text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-white"
        >
          이메일
        </h2>

        <div className="flex h-[44px] w-full items-center justify-between rounded-[5px] bg-[#1F212A] p-[10px] lg:h-[56px]">
          <span className="truncate font-['SUIT'] text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-white lg:text-[20px] lg:font-semibold lg:leading-[28px] lg:tracking-[-0.6px]">
            {email}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={isCopied ? "이메일 복사 완료" : "이메일 주소 복사"}
            className="flex h-6 w-6 shrink-0 items-center justify-center text-[#8D8E94] transition hover:text-white lg:h-9 lg:w-9"
          >
            <img
              src="/icon/icon_copy.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-6"
            />
          </button>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="flex h-[40px] w-full items-center justify-center rounded-[5px] bg-[#917DEC] p-[10px] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#D0D0D2] transition hover:bg-[#856FE5] lg:mt-[10px] lg:h-[44px]"
        >
          돌아가기
        </button>
      </section>
      {isCopied && <Toast message="복사되었습니다." />}
    </div>
  );
};

export default MyPageEmailModal;
