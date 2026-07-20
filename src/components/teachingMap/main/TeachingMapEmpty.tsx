const TeachingMapEmpty = () => {
  return (
    <section className="flex min-h-[650px] w-full items-center justify-center">
      <div className="flex -translate-y-[35px] flex-col items-center">
        <img
          src="/EmptyStar.svg"
          alt=""
          aria-hidden="true"
          className="h-[195px] w-[195px] object-contain"
        />

        <p className="mt-[18px] whitespace-nowrap text-center font-['SUIT'] text-[28px] font-bold leading-[42px] tracking-[-0.84px] text-[#D9CDFF]">
          나만의 과외 노트를 만들어보세요!
        </p>
      </div>
    </section>
  );
};

export default TeachingMapEmpty;