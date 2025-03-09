import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { AxiosError } from "axios";
import { LoginData, LoginResponse } from "./types";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const context = useContext(AuthContext);
  const login = context?.login;
  const navigate = useNavigate();

  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginData
  >({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">Login to MiniTweet</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={loginMutation.isPending}
        className="w-100"
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;
