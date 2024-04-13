import TinySpinner from "../../spinner/TinySpinner";
interface ButtonProps {
  children: string | number | React.ReactNode;
  variant?: "ghost" | "focus" | "primary" | "danger";
  rounded?: string;
  type?: "submit" | "button";
  color?: string;
  isLoading?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled?: boolean;
}

const Button = ({
  children,
  variant,
  rounded = "rounded",
  onClick,
  className,
  color,
  isLoading = false,
  type = "button",
  isDisabled = false,
}: ButtonProps) => {
  const style =
    variant === "ghost"
      ? isDisabled
        ? "bg-slate-200 text-black"
        : "border border-slate-200 border-solid  hover:bg-slate-200 hover:text-black "
      : variant === "focus"
      ? isDisabled
        ? "bg-slate-200 text-primary-blue-600"
        : "bg-primary-blue-600 border-none hover:bg-slate-200 hover:text-primary-blue-600 "
      : variant === "primary"
      ? isDisabled
        ? "bg-slate-200 text-primary-blue-100 "
        : "bg-primary-blue-380 border-none hover:bg-slate-200 hover:text-primary-blue-100  "
      : variant === "danger"
      ? isDisabled
        ? "bg-slate-200 text-primary-danger "
        : "bg-primary-danger border-none text-white hover:bg-slate-200 hover:text-primary-danger "
      : "border border-transparent  hover:border-slate-200 hover:border-solid ";

  const disabledStyle = "border border-primary-gray-400 bg-primary-gray-400";

  if (isLoading)
    return (
      <button
        className={`${disabledStyle} ${rounded} ${color} cursor-not-allowed  p-2 px-6 flex gap-1 items-center transition-all duration-300 ease-in text-primary-blue-900`}
        type="button"
        disabled
      >
        <TinySpinner />
      </button>
    );

  return (
    <button
      className={`${style} ${rounded} ${color}  p-2 px-6 flex gap-1 items-center transition-all duration-300 ease-in ${className} ${
        isDisabled ? "cursor-not-allowed" : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

interface ButtonGroupProps {
  children: React.ReactNode;
  margin?: string;
  color?: string;
  otherStyles?: string;
}

Button.Group = ({
  children,
  margin = "",
  color = "",
  otherStyles = "",
}: ButtonGroupProps) => {
  return (
    <div className={`flex gap-4 ${otherStyles} ${margin} ${color} `}>
      {children}
    </div>
  );
};

export default Button;
