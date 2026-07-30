const EmptyArchiveData = () => {
  return (
    <div className="flex flex-col items-center pt-[180px]">
      <img
        src="/character/NotFound.png"
        alt="자료 없음"
        className="mb-8 h-[200px] w-[200px]"
      />

      <p className="text-center text-[24px] font-semibold not-italic leading-[150%] tracking-[-0.72px] text-[#717379]">
        자료가 존재하지 않습니다.
      </p>
    </div>
  );
};

export default EmptyArchiveData;