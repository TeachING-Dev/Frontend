interface TeachingMapAnalysisDropdownProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

const TeachingMapAnalysisDropdown = ({
  title,
  isOpen,
  onToggle,
}: TeachingMapAnalysisDropdownProps) => {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      className={[
        "flex h-[50px] w-full items-center rounded-[5px] bg-[#13151F] p-[10px]",
        isOpen ? "border border-[#917DEC]" : "border border-transparent",
      ].join(" ")}
    >
      <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-[15px] font-light leading-[180%] tracking-[-0.15px] text-[#F5F2FF]">
        {title}
      </span>

      <img
        src="/dropdown.svg"
        alt=""
        className={`ml-[10px] h-[24px] w-[24px] shrink-0 object-contain ${isOpen ? "scale-[-1]" : ""}`}
      />
    </button>
  );
};

export default TeachingMapAnalysisDropdown;