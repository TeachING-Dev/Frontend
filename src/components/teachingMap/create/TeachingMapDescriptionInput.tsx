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
        className="block font-['SUIT_Variable'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#E8E8E8]"
      >
        설명
      </label>

      <textarea
        id="teaching-map-description"
        value={value}
        maxLength={150}
        rows={1}
        placeholder="티칭맵 설명을 입력해주세요."
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 h-[64px] w-full resize-none rounded-[4px] border-none bg-[#F5F2FF] px-5 py-[18px] font-['SUIT_Variable'] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#5D5D5D] outline-none placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-[#917DEC]"
      />
    </section>
  );
};

export default TeachingMapDescriptionInput;