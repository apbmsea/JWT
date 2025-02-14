import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    checkAuthRequest,
    confirmCodeRequest,
    loginRequest,
    logoutRequest,
    registrationRequest
} from "../../../app/store/authSlice.ts";
import {RootState} from "../../../app/store/store.ts";
import {Button} from "../../../shared/ui/Button";

const AuthForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const dispatch = useDispatch();
    const {isRegistered, isAuth, email: storedEmail} = useSelector((state: RootState) => state.auth);

    const handleRegistration = () => {
        dispatch(registrationRequest({name, email, password}));
    };

    const handleConfirmCode = () => {
        dispatch(confirmCodeRequest({email: storedEmail || email, code}));
    };

    const handleLogin = () => {
        dispatch(loginRequest({email, password}));
    };

    const handleLogout = () => {
        dispatch(logoutRequest());
    };

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            dispatch(checkAuthRequest());
        }
    }, [])

    return (
        <div>
            {isAuth ? (<div>
                <p>Hello {storedEmail}</p>
                <button onClick={handleLogout}>Выйти</button>
            </div>) : (<div>
                {!isRegistered ? (
                    <>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Имя"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Почта"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Пароль"
                        />
                        <Button variant="primary" onClick={handleRegistration}>Зарегистрироваться</Button>
                        <button onClick={handleLogin}>Войти</button>
                    </>
                ) : (
                    <>
                        <p>Введите код подтверждения, отправленный на {storedEmail}</p>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            placeholder="Код подтверждения"
                        />
                        <button onClick={handleConfirmCode}>Подтвердить</button>
                    </>
                )}
            </div>)}
        </div>
    );
};

export default AuthForm;