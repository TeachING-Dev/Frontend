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
    <article
      className={[
        "flex h-[468px] w-[352px] shrink-0 flex-col items-center rounded-[10px]",
        "bg-[linear-gradient(180deg,rgba(145,125,236,0)_0%,rgba(145,125,236,0.3)_100%)]",
        selected
          ? "opacity-100 shadow-[0_0_50px_0_rgba(145,125,236,0.5)]"
          : "opacity-50",
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

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={[
          "mb-[20px] flex h-[50px] w-[310px] shrink-0 items-center justify-center rounded-[5px] p-[10px]",
          "text-[18px] font-medium leading-[150%] tracking-[-0.54px]",
          selected
            ? "bg-[#917DEC] text-[#FAFAFA]"
            : "bg-[#2B2C35] text-[#717379]",
        ].join(" ")}
      >
        선택하기
      </button>
    </article>
  );
};

export default TeachingStyleCard;
