import { useCallback, useState } from "react";

import {
  LOGIN_ADMIN,
  LoginAdminMutation,
  LoginAdminMutationVariables,
} from "@/queries/login";
import { useMutation } from "@apollo/client/react";

interface UseAuthLoginReturn {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useAuthLogin(onSuccess: () => void): UseAuthLoginReturn {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginMutation, { loading }] = useMutation<
    LoginAdminMutation,
    LoginAdminMutationVariables
  >(LOGIN_ADMIN);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
          onSuccess();
        } else {
          setError("Invalid email or password");
        }
      } catch {
        setError("Connection error");
      }
    },
    [email, password, loginMutation, onSuccess],
  );

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
