import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUserRequestSelector,
  registerUserErrorSelector,
  registerUser
} from '../../services/slices/user';
import { TRegisterData, registerUserApi } from '@api';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError(new Error('Заполните все поля'));
      return;
    }

    const registerData: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };

    setError(null);
    setIsLoading(true);

    registerUserApi(registerData)
      .then((response) => {
        // Сохраняем токены
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        // Перенаправляем пользователя
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error('Ошибка регистрации:', err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <RegisterUI
      errorText={error?.message || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
