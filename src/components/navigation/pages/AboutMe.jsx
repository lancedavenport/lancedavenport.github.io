import { Col, Container, Row } from "react-bootstrap";
import "../../../styles/AboutMe.css";
import myPhoto from "../../../assets/me.jpg";

export default function AboutMe() {
  return (
    <div>
      <Container className="mt-5 about-me-container">
        <Row className="global-text align-items-center">
          <Col md={4} className="text-right">
            <h1 style={{textAlign:'center', marginTop:'10px'}}>About Me</h1>
            <div className="my-photo">
              <img src={myPhoto} alt="Lance Davenport" />
              <Col md={8}>
              <div className="about-me-text">
                <p>
                 I am a recent graduate from the University of Wisconsin-Madison,
                 where I studied Computer Science.
                </p>
                <h2>Languages</h2>
                <ul>
                  <li>Jave</li>
                  <li>Python</li>
                  <li>MySQL</li>
                  <li>JavaScript (React, Node.js)</li>
                  <li>HTML & CSS</li>
                  <li>Swift</li>
                  <li>C</li>
                </ul>
                <h2>Technologies</h2>
                <ul>
                  <li>Git/Github</li>
                  <li>Google Cloud Platform</li>
                  <li>Microsoft Azure</li>
                  <li>Vercel</li>
                  <li>Docker</li>
                  <li>Generative AI</li>
                </ul>
                <h2>Hobbies & Interests</h2>
                <p>
                  In my free time, I enjoy skiing, surfing, and exploring
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
