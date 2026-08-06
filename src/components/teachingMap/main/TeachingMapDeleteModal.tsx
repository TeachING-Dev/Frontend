import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";

interface TeachingMapDeleteModalProps {
  isOpen: boolean;
  confirmLabel?: string;
  onClose: () => void;
  onDeleteConfirm: () => void;
}

const TeachingMapDeleteModal = ({
  isOpen,
  confirmLabel = "삭제하기",
  onClose,
  onDeleteConfirm,
}: TeachingMapDeleteModalProps) => {
  const modalRef =
    useRef<HTMLDivElement>(null);

  const cancelButtonRef =
    useRef<HTMLButtonElement>(null);

  const previouslyFocusedElementRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof
      HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    cancelButtonRef.current?.focus();

    const handleWindowKeyDown = (
      event: globalThis.KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleWindowKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleWindowKeyDown,
      );

      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayMouseDown = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  const handleModalKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    if (
      !focusableElements ||
      focusableElements.length === 0
    ) {
      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length - 1
      ];

    if (
      event.shiftKey &&
      document.activeElement ===
        firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
    }

    if (
      !event.shiftKey &&
      document.activeElement ===
        lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div
      role="presentation"
      onMouseDown={
        handleOverlayMouseDown
      }
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,10,24,0.9)]"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="teaching-map-delete-modal-title"
        aria-describedby="teaching-map-delete-modal-description"
        onKeyDown={
          handleModalKeyDown
        }
        className={[
          "flex w-[315px] flex-col items-start gap-[10px] lg:w-[449px]",
          "rounded-[10px] bg-[#0B0A18] px-[10px] py-5 lg:px-5 lg:pb-5 lg:pt-[30px]",
          "shadow-[0_0_50px_0_rgba(145,125,236,0.5)]",
        ].join(" ")}
      >
        <div className="flex w-full flex-col items-center">
          <h2
            id="teaching-map-delete-modal-title"
            className="w-full text-center font-['SUIT'] text-[16px] font-semibold leading-[150%] tracking-[-0.4px] text-[#FAFAFA] lg:text-[24px] lg:leading-9 lg:tracking-[-0.72px]"
          >
            티칭맵을 삭제할까요?
          </h2>

          <p
            id="teaching-map-delete-modal-description"
            className="w-full text-center font-['SUIT'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#717379] lg:text-[16px] lg:leading-6 lg:tracking-[-0.48px]"
          >
            삭제한 티칭맵은 휴지통에서
            30일간 보관됩니다.
          </p>
        </div>

        <div className="flex min-h-[112px] w-full flex-1 items-center justify-center lg:min-h-[179px]">
          <img
            src="/DeleteStar.svg"
            alt=""
            aria-hidden="true"
            className="h-[112px] w-[112px] object-contain lg:h-[160px] lg:w-[160px]"
          />
        </div>

        <div className="flex h-[35px] w-full gap-[10px] lg:h-11">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            className={[
              "flex h-[35px] flex-1 items-center justify-center lg:h-11",
              "rounded-[5px] bg-[#42444C] p-[10px]",
              "font-['SUIT'] text-[14px] font-medium leading-[21px] lg:text-[16px] lg:leading-6",
              "tracking-[-0.48px] text-[#FAFAFA]",
              "transition-colors hover:bg-[#4E5058]",
            ].join(" ")}
          >
            돌아가기
          </button>

          <button
            type="button"
            onClick={
              onDeleteConfirm
            }
            className={[
              "flex h-[35px] flex-1 items-center justify-center lg:h-11",
              "rounded-[5px] bg-[#917DEC] p-[10px]",
              "font-['SUIT'] text-[14px] font-medium leading-[21px] lg:text-[16px] lg:leading-6",
              "tracking-[-0.48px] text-[#FAFAFA]",
              "transition-colors hover:bg-[#856FE5]",
            ].join(" ")}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachingMapDeleteModal;
