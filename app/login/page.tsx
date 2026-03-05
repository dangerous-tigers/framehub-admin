// =============================================
// Login Page (App Router)
// =============================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { Button } from '@dangerous-tigers/framehub-ui-kit/components';
import { Eye, EyeOff } from '@dangerous-tigers/framehub-ui-kit/icons';

import { LOGIN_ADMIN, LoginAdminMutation, LoginAdminMutationVariables } from '@/queries/login';

import styles from './page.module.scss';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation, { loading }] = useMutation<LoginAdminMutation, LoginAdminMutationVariables>(
    LOGIN_ADMIN
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (data?.loginAdmin?.logged) {
        router.push('/users');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={`${styles.page} login-page`}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles['logo__text']}>Inctagram</span>
          <span className={styles['logo__subtext']}>Super Admin</span>
        </div>

        <select className={styles['language-select']} defaultValue="en">
          <option value="en">🇬🇧 English</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="uk">🇺🇦 Українська</option>
          <option value="be">🇧🇾 Беларуская</option>
        </select>
      </header>

      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Epam@epam.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles['password-field']}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className={styles['password-toggle']}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className={styles.submit} disabled={loading}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
