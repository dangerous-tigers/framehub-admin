"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { Button, Input, InputWithIcon } from "@dangerous-tigers/framehub-ui-kit/components";
import { Eye, EyeOff } from "@dangerous-tigers/framehub-ui-kit/icons";

import { LOGIN_ADMIN, LoginAdminMutation, LoginAdminMutationVariables } from "@/queries/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        setError("Invalid email or password");
      }
    } catch {
      setError("Connection error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">
          <span className="logo-text">Inctagram</span>
          <span className="logo-subtext">Super Admin</span>
        </div>
      </div>

      <div className="login-card">
        <h2 className="login-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label className="form-label">Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <Button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}