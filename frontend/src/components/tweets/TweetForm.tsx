import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet } from "../../services/tweetService";
import { AxiosError } from "axios";

const TweetForm = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const createTweetMutation = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      // Invalidate and refetch the tweets list query
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      setContent("");
    },
    onError: (error: AxiosError) => {
      setError(error.response?.data?.message || "Failed to create tweet");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === "") return;

    createTweetMutation.mutate({ content });
  };

  return (
    <div className="mb-4 p-3 border rounded">
      <h5>What's happening?</h5>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            maxLength={280}
          />
          <div className="d-flex justify-content-between mt-2">
            <small className="text-muted">
              {280 - content.length} characters remaining
            </small>
            <Button
              variant="primary"
              type="submit"
              disabled={!content.trim() || createTweetMutation.isPending}
            >
              {createTweetMutation.isPending ? "Posting..." : "Tweet"}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TweetForm;
