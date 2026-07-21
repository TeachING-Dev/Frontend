type AnalysisUrlProps = {
  url: string;
};

const AnalysisUrl = ({
  url,
}: AnalysisUrlProps) => {
  const handleOpenUrl = () => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="rounded-[10px] bg-[#13151F] p-[20px]">
      <h2 className="mb-[10px] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
        저장된 URL
      </h2>

      <div className="flex h-[50px] w-full items-center justify-between rounded-[5px] bg-[#1F212A] px-[20px]">
        <span className="flex-1 truncate font-['Montserrat'] text-[14px] italic font-medium leading-[150%] tracking-[-0.42px] text-[#717379]">
          {url}
        </span>

        <button
          type="button"
          onClick={handleOpenUrl}
          aria-label="URL 열기"
          className="ml-[16px] shrink-0 transition-opacity hover:opacity-80"
        >
          <img
            src="/icon_랑쿠.png"
            alt=""
            aria-hidden="true"
            className="h-[24px] w-[24px] object-contain"
          />
        </button>
      </div>
    </section>
  );
};

export default AnalysisUrl;