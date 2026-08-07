interface TeachingStyleCardProps {
  title: string;
  description?: string[];
  imageSrc: string;
  imageAlt: string;
  selected: boolean;
  onSelect: () => void;
}

const TeachingStyleCard = ({
  title,
  description,
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
        "flex h-[322px] w-full shrink-0 flex-col items-center rounded-[10px] border p-[20px] lg:h-[468px] lg:w-[352px] lg:p-0",
        "bg-[linear-gradient(180deg,rgba(145,125,236,0)_0%,rgba(145,125,236,0.3)_100%)]",
        selected
          ? "border-[#917DEC] opacity-100 shadow-[0_0_50px_0_rgba(145,125,236,0.5)]"
          : "border-transparent opacity-50",
      ].join(" ")}
    >
      <h2
        className={[
          "order-2 mt-0 text-center text-[20px] font-semibold leading-[150%] tracking-[-0.5px] lg:order-none lg:mt-[21px] lg:text-[28px] lg:tracking-[-0.84px]",
          selected ? "text-[#F5F2FF]" : "text-[#42444C]",
        ].join(" ")}
      >
        {title}
      </h2>

      <div className="order-1 flex min-h-0 flex-1 items-center justify-center lg:order-none">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={[
            "h-[199px] w-[238px] shrink-0 object-contain lg:h-auto lg:w-auto",
            selected
              ? "lg:h-[319px] lg:w-[319px]"
              : "lg:h-[312px] lg:w-[312px]",
          ].join(" ")}
        />
      </div>

      {description && (
        <p className="order-3 mt-[2px] text-center text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#D0D0D2] lg:hidden">
          {description.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </p>
      )}

    </button>
  );
};

export default TeachingStyleCard;
