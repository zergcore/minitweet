import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { register } from "../../services/authService";
import { AxiosError } from "axios";
import { RegisterData, RegisterResponse } from "./types";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const context = useContext(AuthContext);
  const login = context?.login;
  const navigate = useNavigate();

  const registerMutation = useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterData
  >({
    mutationFn: register,
    onSuccess: (data) => {
      if (login) {
        login(
          {
            id: data.id,
            username: data.username,
            email: data.email,
          },
          data.token
        );
      }
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setError(error.response?.data?.message ?? "Registration failed");
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
    registerMutation.mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">Create a MiniTweet Account</h2>

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
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
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
          minLength={6}
        />
        <Form.Text className="text-muted">
          Password must be at least 6 characters long
        </Form.Text>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={registerMutation.isPending}
        className="w-100"
      >
        {registerMutation.isPending ? "Creating account..." : "Register"}
      </Button>
    </Form>
  );
};

export default RegisterForm;
