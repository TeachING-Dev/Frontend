import * as Popover from "@radix-ui/react-popover";

type FolderPopoverProps = {
  trigger: React.ReactNode;
  onMoveToTrash?: () => void;
};

const FolderPopover = ({
  trigger,
  onMoveToTrash,
}: FolderPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={6}
          onClick={(event) => event.stopPropagation()}
          className="z-50 w-[134px] rounded-[5px] bg-[#11101D] p-[5px] shadow-[0_0_40px_rgba(134,111,241,0.35)] lg:w-[230px] lg:p-2"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMoveToTrash?.();
            }}
            className="flex h-[36px] w-full items-center gap-[5px] whitespace-nowrap rounded-[4px] px-[5px] py-[6px] text-left text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#D8CCFF] transition hover:bg-[#24242E] lg:h-[44px] lg:gap-3 lg:px-3 lg:py-0 lg:text-[16px]"
          >
            <img
              src="/icon/purple_휴지통.svg"
              alt=""
              aria-hidden="true"
              className="h-[15.64px] w-[15.64px] shrink-0 object-contain lg:h-[24px] lg:w-[24px]"
            />

            <span>휴지통으로 이동하기</span>
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FolderPopover;
