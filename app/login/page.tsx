"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { Button, Card, Input } from "@dangerous-tigers/framehub-ui-kit/components";

import { LOGIN_ADMIN, LoginAdminMutation, LoginAdminMutationVariables } from "@/queries/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [loginMutation, { loading }] = useMutation<LoginAdminMutation, LoginAdminMutationVariables>(
    LOGIN_ADMIN
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (data?.loginAdmin?.logged) {
        router.push("/users");
      } else {
        setError("Неверный email или пароль");
      }
    } catch {
      setError("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <div className="login-card-header">
          <h2 className="login-title">Вход в систему</h2>
        </div>
        <div className="login-card-content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="error-message">{error}</div>
            )}
            <Button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}