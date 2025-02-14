import React, {useState} from 'react';

import styles from './Header.module.scss';
import {Button} from "../../../shared/ui/Button";
import {LoginForm} from "../../../features/LoginForm/ui/LoginForm.tsx";
import {AuthModal} from "../../../features/AuthModal/ui/AuthModal.tsx";
import {RegisterForm} from "../../../features/RegistrationForm/ui/RegistrationForm.tsx";

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authType, setAuthType] = useState<"login" | "register">("login");

    const openLogin = () => {
        setAuthType("login");
        setIsModalOpen(true);
    };

    const openRegister = () => {
        setAuthType("register");
        setIsModalOpen(true);
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>Каталог</li>
                    <li>Доставка и оплата</li>
                    <li>Компания</li>
                    <li>Контакты</li>
                </ul>
            </nav>
            <div className={styles.searchInput}>
                <input type="text" placeholder="Быстрый поиск"/>
                <span className={styles.searchIcon}><img src="../../../../public/icons/search.svg" alt="Поиск"/></span>
            </div>
            {/*<div className={styles.icons}>*/}
            {/*    <img src="../../../../public/icons/Component%202.svg" alt="Favorite"/>*/}
            {/*    <img src="../../../../public/icons/mdi_account%20(1).svg" alt="Account"/>*/}
            {/*</div>*/}
            <Button variant="primary" onClick={openRegister}>Регистрация</Button>
            <Button variant="secondary" onClick={openLogin}>Вход</Button>

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {authType === "login" ? <LoginForm/> : <RegisterForm/>}
            </AuthModal>
        </header>
    );
};

export default Header;

// import React, { useState } from "react";
// import { Button } from "../../../shared/ui/Button";
// import { AuthModal } from "../../../features/AuthModal/ui/AuthModal.tsx";
// import { LoginForm } from "../../../features/LoginForm/ui/LoginForm.tsx";
// import { RegisterForm } from "../../../features/RegistrationForm/ui/RegistrationForm.tsx";
//
// const Header: React.FC = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [authType, setAuthType] = useState<"login" | "register">("login");
//
//     const openLogin = () => {
//         setAuthType("login");
//         setIsModalOpen(true);
//     };
//
//     const openRegister = () => {
//         setAuthType("register");
//         setIsModalOpen(true);
//     };
//
//     return (
//         <header>
//             <Button variant="primary" onClick={openRegister}>Регистрация</Button>
//             <Button variant="secondary" onClick={openLogin}>Вход</Button>
//
//             <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//                 {authType === "login" ? <LoginForm /> : <RegisterForm />}
//             </AuthModal>
//         </header>
//     );
// };
//
// export default Header;