import React from "react";
import "./Aboutus.css";
import aboutusimage from "./aboutusimage.png";
import { Card,Button} from "react-bootstrap";
import Helmet from 'react-helmet'

const AboutUs = () => {
  return (
    <>
    <Helmet>
            <title>About Us</title>
    </Helmet>

    <div className="aboutuse_container">
    <h2>
        About Us
    </h2>
      <h3>
        StarMart is guided by four principles: customer obsession rather than
        competitor focus, passion for invention, commitment to operational
        excellence, and long-term thinking. StarMart strives to be Earth’s most
        customer-centric company, Earth’s best employer, and Earth’s safest
        place to work. Customer reviews, 1-Click shopping, personalized
        recommendations, Prime, Fulfillment by StarMart, AWS, Kindle Direct
        Publishing, Kindle, Career Choice, Fire tablets, Fire TV, StarMart Echo,
        Alexa, Just Walk Out technology, StarMart Studios, and The Climate
        Pledge are some of the things pioneered by StarMart.
      </h3>

      <div className="aboutus_cards">
        <Card className='aboutus_singlecard'>
          <Card.Body>
            <Card.Title style={{color:'brown',fontWeight:'700'}}>Leadership Principles</Card.Title>
            <Card.Text style={{color:'white' , fontWeight:'600'}}>
              Our Leadership Principles are more than inspirational wall
              hangings. The 16 principles guide our discussions and decisions
              every day.
            </Card.Text>
            <Button variant="warning">Learn More</Button>
          </Card.Body>
        </Card>

        <Card className='aboutus_singlecard'>
          <Card.Body style={{color:'black'}}>
            <Card.Title style={{color:'brown',fontWeight:'700'}}> Awards and Recognition</Card.Title>
            <Card.Text style={{color:'white' , fontWeight:'600'}}>
              We are honoured to be recognised for the work we do on behalf of
              our customers, employees, and communities every day.
            </Card.Text>
            <Button variant="warning">Learn More</Button>
          </Card.Body>
        </Card>

        <Card className='aboutus_singlecard'>
          <Card.Body style={{color:'black'}}>
            <Card.Title style={{color:'brown',fontWeight:'700'}}> Facts About StarMart</Card.Title>
            <Card.Text style={{color:'white' , fontWeight:'600'}}>
              Captivating facts about StarMart, its history, families, partners, employees, communities, customers.
            </Card.Text>
            <Button variant="warning">Learn More</Button>
          </Card.Body>
        </Card>
      </div>

      <div className="aboutus_image">
        <img src={aboutusimage} alt="aboutusimage" />
      </div>

      <div className="aboutus_text">
        <h5>
          StarMart’s “Day 1” mentality is our approach of doing everything with
          the energy and entrepreneurial spirit of a new organisation on its
          first day.
        </h5>
        <h5></h5>
        Working to earn and keep our customers’ trust is the single biggest
        driver of StarMart’s Day 1 approach. StarMart’s decision-making process
        asks employees to consider whether an action is a one-way
        door—consequential and nearly irreversible—or a two-way door, easy to
        change course and go back. Discover more about who we are through our
        Annual Letters to Shareholders from 1997 through today.
      </div>
    </div>
    </>
  );
};

export default AboutUs;
