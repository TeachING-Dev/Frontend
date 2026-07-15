import * as Popover from "@radix-ui/react-popover";
import { Trash2 } from "lucide-react";

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
          className="z-50 w-[230px] rounded-[5px] bg-[#11101D] p-2 shadow-[0_0_40px_rgba(134,111,241,0.35)]"
        >
          <button
            type="button"
            onClick={onMoveToTrash}
            className="flex h-[44px] w-full items-center gap-3 rounded-[4px] px-3 text-left text-[16px] text-[#D8CCFF] transition hover:bg-[#24242E]"
          >
            <Trash2
              size={20}
              strokeWidth={2.3}
              className="shrink-0"
            />

            <span>휴지통으로 이동하기</span>
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FolderPopover;