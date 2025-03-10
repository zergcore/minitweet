import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTweet } from "../../services/tweetService";
import { Tweet } from "../../services/types";
import { AxiosError } from "axios";

const TweetEditModal = ({
  tweet,
  show,
  onHide,
}: {
  tweet: Tweet;
  show: boolean;
  onHide: () => void;
}) => {
  const [content, setContent] = useState(tweet.content);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updatedTweet: { content: string }) =>
      updateTweet(tweet.id, updatedTweet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["userTweets", tweet.userId] });
      onHide();
    },
    onError: (error: AxiosError) => {
      setError(error.response?.data?.message || "Failed to update tweet");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === "") return;

    updateMutation.mutate({ content });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
            />
            <small className="text-muted d-block text-end mt-2">
              {280 - content.length} characters remaining
            </small>
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
          disabled={!content.trim() || updateMutation.isPending}
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TweetEditModal;
