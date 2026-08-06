const TrashHeader = () => {
  return (
    <header className="flex flex-col items-start">
      <h1 className="font-suit text-[24px] font-bold leading-[36px] tracking-[-0.72px] text-[#FAFAFA] lg:text-[36px] lg:leading-[54px] lg:tracking-[-1.08px]">
        휴지통
      </h1>

      <p className="font-suit text-[14px] font-semibold leading-[20px] tracking-[-0.42px] text-[#A1A1A5] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.6px]">
        삭제 후, 30일간 보관됩니다.
      </p>
    </header>
  );
};

export default TrashHeader;
