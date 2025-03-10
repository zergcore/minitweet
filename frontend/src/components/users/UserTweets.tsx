import { Spinner, Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getUserTweets } from "../../services/tweetService";
import TweetItem from "../tweets/TweetItem";
import PropTypes from "prop-types";
import { AxiosError } from "axios";

const UserTweets = ({ userId }: { userId: string }) => {
  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userTweets", userId],
    queryFn: () => getUserTweets(userId),
  });

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border">
          <output className="visually-hidden">Loading...</output>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error loading tweets:{" "}
        {(error as AxiosError).response?.data?.message || error.message}
      </Alert>
    );
  }

  if (!tweets || tweets.length === 0) {
    return <Alert variant="info">No tweets yet.</Alert>;
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

UserTweets.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserTweets;
