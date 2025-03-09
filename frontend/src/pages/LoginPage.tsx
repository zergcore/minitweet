import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body className="p-4">
              <LoginForm />
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
