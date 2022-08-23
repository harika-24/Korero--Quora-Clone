import React from "react";
import "./css/Korero.css";
import "./css/About.css";
import { Carousel } from "react-bootstrap";
const About = () =>{

    return(
        <div className="Korero-contents">
            <div className="Korero-about">
                <div >
                    <h3>About Us</h3>
                    <h4>Korero is an information sharing application designed for people who want to keep their circle small. The aim of this app is to share information between friend, ask question and have general discussion</h4>
                </div>
                <br/>
                <div>
                    <h3 style = {{color: "red"}}> Meet the Team</h3>
                </div>
                <div className="carousel-div">
                    <Carousel slide={true}>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="./images/developers/rudra.png"
                            alt="First slide"
                            
                            />
                            <Carousel.Caption>
                            <h3>Rudra Mohan Mishra</h3>
                            <h4>Front-End Developer</h4>
                            <h5>MSCS Graduate Candidate,Northeastern University</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="./images/developers/harika.png"
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Harika Gundala </h3>
                            <h4>Backend-End Developer</h4>
                            <h5>MSCS Graduate Candidate,Northeastern University</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="./images/developers/lavina.png"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Lavina Talreja</h3>
                            <h4>Backend-End Developer</h4>
                            <h5>MSCS Graduate Candidate,Northeastern University</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div> 
        </div>
       
    )
}

export default About;