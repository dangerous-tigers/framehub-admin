'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { LOGIN_ADMIN } from '@/queries/login';
import { LoginAdminMutation, LoginAdminMutationVariables } from '@/queries/login.generated';
import { AUTH_CONFIG } from '@/shared/config/auth';
import { useMutation } from '@apollo/client/react';
import { Button } from '@dangerous-tigers/framehub-ui-kit/components';
import { Eye, EyeOff } from '@dangerous-tigers/framehub-ui-kit/icons';

import styles from './page.module.scss';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');

  const [loginMutation, { loading }] = useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LOGIN_ADMIN);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return email && password && isValidEmail(email) && password.length >= AUTH_CONFIG.MIN_PASSWORD_LENGTH;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    if (!isFormValid()) {
      if (!email || !password) {
        setError('Пожалуйста, заполните все поля');
      } else if (!isValidEmail(email)) {
        setError('Пожалуйста, введите действительный email адрес');
      } else if (password.length < AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
        setError(`Пароль должен содержать не менее ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} символов`);
      }
      return;
    }

    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (data?.loginAdmin?.logged) {
        const credentials = btoa(`${email}:${password}`);
        const cookieParts = [
          `${AUTH_CONFIG.COOKIE_NAME}=${credentials}`,
          `path=${AUTH_CONFIG.COOKIE_PATH}`,
          `max-age=${AUTH_CONFIG.COOKIE_MAX_AGE}`,
          `SameSite=${AUTH_CONFIG.COOKIE_SAME_SITE}`,
        ];
        document.cookie = cookieParts.join('; ');
        router.push('/users');
      } else {
        setError('Неверный email или пароль');
      }
    } catch {
      setError('Ошибка при попытке входа. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isFormValid()) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='email'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              className={styles.input}
              placeholder='Epam@epam.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='password'
            >
              Password
            </label>
            <div className={styles.passwordField}>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder='••••••••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                type='button'
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff
                    width={18}
                    height={18}
                  />
                ) : (
                  <Eye
                    width={18}
                    height={18}
                  />
                )}
              </button>
            </div>
          </div>

          <Button
            type='submit'
            className={styles.submit}
            disabled={loading}
          >
            Sign In
          </Button>

          {error && (
            <div className={styles.error}>
              <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
