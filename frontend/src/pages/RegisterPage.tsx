import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body className="p-4">
              <RegisterForm />
              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
