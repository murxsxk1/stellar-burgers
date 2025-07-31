import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(new Error('Введите email'));
      return;
    }

    setError(null);
    setIsLoading(true);

    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        console.error('Ошибка отправки email для сброса пароля:', err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
