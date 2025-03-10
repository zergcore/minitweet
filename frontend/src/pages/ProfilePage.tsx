import { useContext } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/userService";
import TweetForm from "../components/tweets/TweetForm";
import { AuthContext } from "../context/AuthContext";
import { UserProfileData } from "../services/types";
import ProfileHeader from "../components/users/ProfileHeader";
import UserTweets from "../components/users/UserTweets";

const ProfilePage = () => {
  const { username } = useParams();
  const context = useContext(AuthContext);
  const user = context?.user;
  const isAuthenticated = context?.isAuthenticated;

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfileData, Error>({
    queryKey: ["userProfile", username],
    queryFn: () => {
      if (!username) throw new Error("Username is required");
      return getUserProfile(username);
    },
  });

  const { data: tweets } = useQuery({
    queryKey: ["userTweets", profile?.id],
    queryFn: () => profile?.id && getUserTweets(profile.id),
    enabled: !!profile?.id,
  });

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border">
          <output className="visually-hidden">Loading...</output>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Error loading profile:{" "}
          {error.response?.data?.message || error.message}
        </Alert>
      </Container>
    );
  }

  const isOwner = isAuthenticated && user.id === profile.id;

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <ProfileHeader profile={profile} tweetsCount={tweets?.length || 0} />

          {isOwner && (
            <div className="mb-4">
              <TweetForm />
            </div>
          )}

          <Card>
            <Card.Header>
              <h5>Tweets</h5>
            </Card.Header>
            <Card.Body>
              <UserTweets userId={profile.id} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
