import { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TweetForm from "../components/tweets/TweetForm";
import TweetList from "../components/tweets/TweetList";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated;

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="mb-4">
            <Card.Header>
              <h4>Home</h4>
            </Card.Header>
            <Card.Body>
              {isAuthenticated ? (
                <TweetForm />
              ) : (
                <div className="text-center py-3">
                  <p>Log in to post a tweet</p>
                </div>
              )}
              <TweetList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
