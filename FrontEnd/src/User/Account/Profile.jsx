import React, { useEffect, useState } from "react";
import NavigationBar from "../common/NavigationBar";
import { getProfile } from "../../services/ProfileService";
import { Tab, Tabs, Container, Row, Col, Card, Button } from "react-bootstrap";
import UserDonDatBan from "./UserDonDatBan";
import UserHoaDon from "./UserHoaDon";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword"; // Import UpdatePassword component

const Profile = () => {
  const username = sessionStorage.getItem("username");
  const [profile, setProfile] = useState(null);
  const [dataUpdate, setDataUpdate] = useState({});
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [ModalUpdatePass, setModalUpdatePass] = useState(false);

  const handleClose = () => {
    setModalUpdate(false);
    setModalUpdatePass(false); // Close the password update modal as well
  };

  useEffect(() => {
    if (username) {
      getProfiles(username);
      console.log(username);
    }
  }, [username, ModalUpdate]);

  function getProfiles(username) {
    getProfile(username)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const UpdateThongTin = (profile) => {
    setDataUpdate(profile);
    setModalUpdate(true);
    console.log(profile);
  };

  const HandleUpdatePassword = () => {
    console.log("Update password");
    setModalUpdatePass(true);
    console.log(ModalUpdatePass);
  };

  return (
    <div>
      <NavigationBar />
      <Container style={{ marginTop: "100px", marginBottom: "300px" }}>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Tabs defaultActiveKey="personal-detail" id="profile-tabs">
                  <Tab eventKey="personal-detail" title="Personal Detail">
                    {profile ? (
                      <div>
                        <h2>Profile</h2>
                        <p>
                          <strong>Username:</strong> {profile.username}
                        </p>
                        <p>
                          <strong>Password:</strong> **********
                        </p>
                        <p>
                          <strong>Full Name:</strong> {profile.hoTen}
                        </p>
                        <p>
                          <strong>Phone Number:</strong> {profile.soDT}
                        </p>
                        <div>
                          <Button onClick={() => UpdateThongTin(profile)}>
                            Edit Profile
                          </Button>
                          <Button
                            style={{ marginLeft: "20px" }}
                            onClick={() => HandleUpdatePassword()} // Call the function directly
                          >
                            Update Password
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Tab>
                  <Tab eventKey="reservation-table" title="Table Reservation">
                    <h2>Table Reservation</h2>
                    <UserDonDatBan />
                  </Tab>
                  <Tab eventKey="transaction-history" title="Transaction History">
                    <h2>Transaction History</h2>
                    <UserHoaDon />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <UpdateProfile
          show={ModalUpdate}
          handleClose={handleClose}
          dataupdate={dataUpdate}
          reload={getProfiles}
        />
        <UpdatePassword
          show={ModalUpdatePass}
          handleClose={handleClose}
          username={username}
        />
      </Container>
    </div>
  );
};

export default Profile;
