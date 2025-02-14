import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../../app/store/authSlice.ts";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input/Input.tsx";

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(loginRequest({ email, password }));
    };

    return (
        <div>
            <h2>Вход</h2>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Почта" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
            <Button variant="primary" onClick={handleLogin}>Войти</Button>
        </div>
    );
};
