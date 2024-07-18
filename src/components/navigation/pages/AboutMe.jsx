import "../../../styles/AboutMe.css";
import myPhoto from "../../../assets/me.jpg";

export default function AboutMe() {
  return (
    <div className="about-me-wrapper">
      <div className="about-me-container">
        <div className="about-me-content">
          <div className="text-left">
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>About Me</h1>
            <div className="my-photo">
              <img src={myPhoto} alt="Lance Davenport" />
              <div className="about-me-text">
                <p>
                  I am a recent graduate from the University of
                  Wisconsin-Madison with a BS, where I studied Computer Science.
                </p>
                <h2>Languages</h2>
                <ul>
                  <li>Java</li>
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

                <a href={"/resume.pdf"}  target="_blank" rel="noopener noreferrer"><b>Click here to view my resume</b></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
