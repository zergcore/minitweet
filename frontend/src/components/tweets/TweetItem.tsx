import { useContext, useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEllipsisH, FaTrash, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { deleteTweet } from "../../services/tweetService";
import TweetEditModal from "./TweetEditModal";
import { Tweet } from "../../services/types";

const TweetItem = ({ tweet }: { tweet: Tweet }) => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["userTweets", tweet.userId] });
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      deleteMutation.mutate(tweet.id);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOwner = user && user.id === tweet.userId;

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Link
                to={`/profile/${tweet.user.username}`}
                className="text-decoration-none"
              >
                <strong>{tweet.user.username}</strong>
              </Link>
              <small className="text-muted ms-2">
                {formatDate(tweet.createdAt)}
              </small>
            </div>

            {isOwner && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={Button}
                  variant="link"
                  size="sm"
                  className="p-0 text-dark"
                >
                  <FaEllipsisH />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setShowEditModal(true)}>
                    <span className="me-2">
                      <FaEdit /> Edit
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    <span className="me-2">
                      <FaTrash /> Delete
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          <Card.Text className="mt-2">{tweet.content}</Card.Text>
        </Card.Body>
      </Card>

      {showEditModal && (
        <TweetEditModal
          tweet={tweet}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default TweetItem;
