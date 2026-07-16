import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
};

const PrimaryButton = ({ children, fullWidth = true, className = "", disabled, ...props }: PrimaryButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex h-14 items-center justify-center gap-2.5 rounded-[5px] px-12 py-5 font-['SUIT_Variable'] text-xl font-semibold leading-8 ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "bg-neutral-800 text-zinc-500" : "bg-[#917DEC] text-violet-50"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
