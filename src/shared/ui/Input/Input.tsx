import React from "react";
import cls from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className={cls.inputWrapper}>
            {label && <label className={cls.label}>{label}</label>}
            <input className={`${cls.input} ${error ? cls.error : ""}`} {...props} />
            {error && <span className={cls.errorText}>{error}</span>}
        </div>
    );
};
