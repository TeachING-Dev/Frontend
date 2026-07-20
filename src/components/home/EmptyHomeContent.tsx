type EmptyHomeContentProps = {
  message: string;
  iconSrc: string;
};

const EmptyHomeContent = ({
  message,
  iconSrc,
}: EmptyHomeContentProps) => {
  return (
    <div className="flex h-[285px] w-full flex-col items-center justify-center gap-[16px]">
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="h-[60px] w-[60px] object-contain opacity-40"
      />

      <p className="font-['SUIT'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#3A3946]">
        {message}
      </p>
    </div>
  );
};

export default EmptyHomeContent;