const TrashEmpty = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/sad-empty-star.svg"
        alt="휴지통 빈 상태"
        className="h-[200px] w-[200px] shrink-0 object-contain"
      />

      <p className="mt-10 w-full text-center font-suit text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#42444C]">
        휴지통이 비어있습니다.
      </p>
    </div>
  );
};

export default TrashEmpty;