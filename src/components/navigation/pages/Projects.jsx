import "../../../styles/Projects.css";
import OrangeButton from "../../../assets/orangebutton.png";
import Fix from "../../../assets/fix.png";
import MySite from "../../../assets/my_site.png";

export default function Projects() {
  return (
    <div className="project-wrapper">
      <div className="project-container">
        <h1 style={{ textAlign: "center", marginTop: "10px", color: "white" }}>
          Projects
        </h1>
        <div className="project-content">
          <div className="project-text-left">
            <div className="project-text">
              <h2>Senior Capstone Project (Orange Button)</h2>
              <a
                href="https://github.com/cthao17/OrangeButtonPDF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={OrangeButton}
                  alt="Homepage of site created for Orange Button"
                ></img>
              </a>
              <p className="project-blurb">
                A web-tool to easily convert a solar module PDF to Orange
                Button's taxonomy.
              </p>
              <p className="project-discription">
                Developed in a team of 4, we designed and impliment a custom
                user interface using React, Javascript, and CSS. I was
                responsible for creating an API with Flask and Python,
                leveraging Google Cloud Platform, Vertex AI, and LangChain to
                automate PDF conversion.
              </p>
            </div>
          </div>
          <div className="project-text-left">
            <div className="project-text">
              <h2>My Portfolio Website</h2>
              <a
                href="https://github.com/lancedavenport/lancedavenport.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={MySite}
                  alt="Homepage of site created for Orange Button"
                ></img>
              </a>
              <p className="project-blurb">
                My portfolio website built using React, Node.JS, and Vercel.
              </p>
              <p className="project-discription">
                Developed a portfolio website featuring diverse projects,
                including a backend API, built with Node.JS and Express and
                hosted on Vercel, that connects to SQL databases to dynamically
                populate a globe with website visitors' locations, utilizing
                modern web technologies for a clean and organized presentation.
              </p>
            </div>
          </div>
          <div className="project-text-left">
            <div className="project-text">
              <h2>Fix</h2>
              <a
                href="https://github.com/lancedavenport/Fix"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Fix} alt="Logo created for Fix app"></img>
              </a>
              <p className="project-blurb">
                A Solution to the Artificial Nature of Online Dating
              </p>
              <p className="project-discription">
                A unique blind dating app built with Swift and Firebase that
                allows users to be set up on blind dates by friends. I
                implimented the feed and matching functionality as well as
                designed and developed the user creation screens, settings,
                profile editing functions, handling both front-end interfaces
                and back-end integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
