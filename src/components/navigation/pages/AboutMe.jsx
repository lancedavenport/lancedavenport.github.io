import { Col, Container, Row } from "react-bootstrap";
import "../../../styles/AboutMe.css";
import myPhoto from "../../../assets/me.jpg";

export default function AboutMe() {
  return (
    <div>
      <Container className="mt-5 about-me-container">
        <Row className="global-text align-items-center">
          <Col md={4} className="text-right">
            <h1 style={{textAlign:'center'}}>About Me</h1>
            <div className="my-photo">
              <img src={myPhoto} alt="Lance Davenport" />
              <Col md={8}>
              <div className="about-me-text">
                <p>
                  I am a full stack developer who is passionate about creating
                  user-friendly applications. I have experience with React,
                  Node, Express, and SQL. I am always looking for new projects
                  to work on and new technologies to learn.
                </p>
                <h2>Skills</h2>
                <ul>
                  <li>JavaScript (React, Node.js)</li>
                  <li>HTML & CSS</li>
                  <li>Python</li>
                  <li>SQL & NoSQL Databases</li>
                </ul>
                <h2>Hobbies & Interests</h2>
                <p>
                  In my free time, I enjoy hiking, photography, and exploring
                  new technologies. I'm always eager to learn and take on new
                  challenges.
                </p>
              </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
