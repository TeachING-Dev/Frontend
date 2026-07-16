const EmptyArchiveData = () => {
  return (
    <div className="flex flex-col items-center pt-[140px]">
      <img
        src="/NotFound.png"
        alt="자료 없음"
        className="mb-8 h-[200px] w-[200px]"
      />

      <p className="font-['42dot_Sans'] text-center text-[28px] font-semibold leading-[150%] tracking-[-0.84px] text-[#F5F2FF]">
        자료가 존재하지 않습니다.
      </p>
    </div>
  );
};

export default EmptyArchiveData;