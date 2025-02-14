import React from "react";
import cls from "./AuthModal.module.scss";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={cls.overlay} onClick={onClose}>
            <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
                <button className={cls.close} onClick={onClose}>✖</button>
                {children}
            </div>
        </div>
    );
};
