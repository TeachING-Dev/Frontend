type TeachingMapDescriptionInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const TeachingMapDescriptionInput = ({
  value,
  onChange,
}: TeachingMapDescriptionInputProps) => {
  return (
    <section>
      <label
        htmlFor="teaching-map-description"
        className="block font-['SUIT'] text-[18px] font-semibold leading-[27px] tracking-[-0.45px] text-[#F5F2FF] lg:text-[28px] lg:font-bold lg:leading-[42px] lg:tracking-[-0.84px] lg:text-[#E8E8E8]"
      >
        설명
      </label>

      <textarea
        id="teaching-map-description"
        value={value}
        maxLength={150}
        rows={1}
        placeholder="티칭맵 설명을 입력해주세요."
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-[10px] h-[42px] w-full resize-none rounded-[4px] border-none bg-[#F5F2FF] px-[10px] py-[10px] font-['SUIT'] text-[14px] font-normal leading-[21px] tracking-[-0.35px] text-[#5D5D5D] outline-none placeholder:text-[#B7B7B7] lg:mt-4 lg:h-[64px] lg:px-5 lg:py-[18px] lg:text-[20px] lg:font-semibold lg:leading-[28px] lg:tracking-[-0.6px]"
      />
    </section>
  );
};

export default TeachingMapDescriptionInput;
