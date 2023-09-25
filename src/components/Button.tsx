import { type } from "os";
import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
    title: string;
    type?: 'button' | 'submit';
    leftIcon?: React.ReactNode | null;
    rightIcon?: React.ReactNode | null;
    isSubmitting?: boolean;
    handleClick?: MouseEventHandler;
    bgColor?: string;
    textColor?: string;
}

const Button = ({title, type, leftIcon, rightIcon, isSubmitting, handleClick, bgColor, textColor}: Props) => {
  return (
    <button
        type={type || 'button'}
        disabled={isSubmitting}
        className={`flex justify-center items-center gap-3 px-4 py-3 
        ${textColor || 'text-white'}
        ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-secondarygreen'} rounded-xl text-sm font-medium max-md:w-full`}
        onClick={handleClick}
    >
        {leftIcon && leftIcon}
        {title}
        {rightIcon && rightIcon}

    </button>
  )
}

export default Button