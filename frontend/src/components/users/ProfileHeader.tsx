import { useContext, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import ProfileEditModal from "./ProfileEditModal";
import { ProfileHeaderProps } from "./types";

const ProfileHeader = ({ profile, tweetsCount }: ProfileHeaderProps) => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const [showEditModal, setShowEditModal] = useState(false);

  const isOwner = user && user.id === profile.id;

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: "100px", height: "100px", fontSize: "2rem" }}
                >
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </Col>
            <Col md={9}>
              <h3>{profile.username}</h3>
              <p className="text-muted">@{profile.username}</p>
              {profile.bio && <p>{profile.bio}</p>}
              <div className="d-flex">
                <div className="me-3">
                  <strong>{tweetsCount}</strong> Tweets
                </div>
                <div>
                  <strong>Joined:</strong>{" "}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </div>
              </div>

              {isOwner && (
                <Button
                  variant="outline-primary"
                  className="mt-2"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {showEditModal && (
        <ProfileEditModal
          profile={profile}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;
