import { Spinner, Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getAllTweets } from "../../services/tweetService";
import TweetItem from "./TweetItem";
import { AxiosError } from "axios";
import { Tweet } from "../../services/types";

const TweetList = () => {
  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery<Tweet[], AxiosError>({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
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
        Error loading tweets: {error.response?.data?.message || error.message}
      </Alert>
    );
  }

  if (!tweets || tweets.length === 0) {
    return <Alert variant="info">No tweets found. Be the first to post!</Alert>;
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList;
