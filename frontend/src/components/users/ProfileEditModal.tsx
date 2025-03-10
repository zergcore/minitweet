import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../services/userService";
import {
  ProfileEditModalProps,
  UpdateProfileData,
  UpdateProfileError,
} from "./types";

const ProfileEditModal = ({ profile, show, onHide }: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    bio: profile.bio ?? "",
    avatar: profile.avatar ?? "",
  });
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation<
    void,
    UpdateProfileError,
    UpdateProfileData
  >({
    mutationFn: async (data: UpdateProfileData) => {
      await updateUserProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", profile.username],
      });
      onHide();
    },
    onError: (error: UpdateProfileError) => {
      setError(error.response?.data?.message ?? "Failed to update profile");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/your-image.jpg"
            />
            <Form.Text className="text-muted">
              Enter a URL for your profile picture
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
          }}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEditModal;
