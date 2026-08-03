interface TeachingStyleCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  selected: boolean;
  onSelect: () => void;
}

const TeachingStyleCard = ({
  title,
  imageSrc,
  imageAlt,
  selected,
  onSelect,
}: TeachingStyleCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "flex h-[468px] w-[352px] shrink-0 flex-col items-center rounded-[10px] border",
        "bg-[linear-gradient(180deg,rgba(145,125,236,0)_0%,rgba(145,125,236,0.3)_100%)]",
        selected
          ? "border-[#917DEC] opacity-100 shadow-[0_0_50px_0_rgba(145,125,236,0.5)]"
          : "border-transparent opacity-50",
      ].join(" ")}
    >
      <h2
        className={[
          "mt-[21px] text-center text-[28px] font-semibold leading-[150%] tracking-[-0.84px]",
          selected ? "text-[#F5F2FF]" : "text-[#42444C]",
        ].join(" ")}
      >
        {title}
      </h2>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={[
            "shrink-0 object-contain",
            selected
              ? "h-[319px] w-[319px]"
              : "h-[312px] w-[312px]",
          ].join(" ")}
        />
      </div>

    </button>
  );
};

export default TeachingStyleCard;