const TrashHeader = () => {
  return (
    <header className="flex flex-col items-start">
      <h1 className="font-suit text-[36px] font-bold leading-[54px] tracking-[-1.08px] text-[#FAFAFA]">
        휴지통
      </h1>

      <p className="font-suit text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-[#A1A1A5]">
        삭제 후, 30일간 보관됩니다.
      </p>
    </header>
  );
};

export default TrashHeader;
