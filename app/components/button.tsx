import { ReactNode } from "react";

export const Button = ({
  icon,
  label,
  onClick,
  disabled = false,
  outline = false,
  invert = false,
  className,
  type,
}: {
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
  invert?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 p-2 sm:p-3 md:p-4 md:px-5 text-lg font-semibold rounded-md transition-all ${
        outline
          ? invert
            ? `border-2 border-white text-white bg-transparent hover:text-black hover:border-transparent`
            : `border-2 border-black text-black bg-transparent hover:border-transparent`
          : invert
          ? `bg-white text-black`
          : `bg-black text-white hover:text-black`
      } ${
        disabled ? `bg-gray-500 text-gray-300 cursor-not-allowed hover:bg-gray-500` : "hover:scale-95 hover:bg-teal-400"
      }  ${className}`}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
};
