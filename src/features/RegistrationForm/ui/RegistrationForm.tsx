import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registrationRequest } from "../../../app/store/authSlice.ts";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input/Input.tsx";

export const RegisterForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleRegister = () => {
        dispatch(registrationRequest({ name, email, password }));
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Имя" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Почта" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
            <Button variant="primary" onClick={handleRegister}>Зарегистрироваться</Button>
        </div>
    );
};
