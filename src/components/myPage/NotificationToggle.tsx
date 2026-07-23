interface NotificationToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const NotificationToggle = ({
  checked,
  onChange,
}: NotificationToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative flex h-[22px] w-[50.286px] items-center rounded-full p-[1.571px]",
        checked ? "justify-end bg-[#917DEC]" : "justify-start bg-[#717379]",
      ].join(" ")}
    >
      <span className="block h-[18.857px] w-[30.643px] rounded-full bg-white" />
    </button>
  );
};

export default NotificationToggle;