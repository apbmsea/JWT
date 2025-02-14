import React, {ButtonHTMLAttributes} from "react";
import cls from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({variant = "primary", ...props}) => {
    return <button className={`${cls.button} ${cls[variant]}`} {...props}></button>
}

export default Button