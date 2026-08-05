const EmptyNotification = () => {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center">
      <img
        src="/icon/최근에 저장한 지식.svg"
        alt=""
        aria-hidden="true"
        className="mb-[20px] h-[74px] w-[74px]"
      />

      <p className="text-center font-[SUIT] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#42444C]">
        알림이 없어요.
      </p>
    </div>
  );
};

export default EmptyNotification;