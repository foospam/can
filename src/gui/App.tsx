import React from "react";
import { Container, Row } from "react-bootstrap";
import MainDisplay from "./MainDisplayArea";
import StatsDisplay from "./StatsDisplay";
import PriceDisplay from "./PriceDisplay";

function App() {
  return (
    <Container fluid>
      <Row>
        {/* Left Main Display */}
        <MainDisplay />

        {/* Right Column */}
        <StatsDisplay
          imageUrl="your-image-url.jpg"
          iconUrl1="icon-url1.png"
          iconUrl2="icon-url2.png"
          text1="Text 1"
          text2="Text 2"
        />
        <PriceDisplay
          imageUrl="your-image-url.jpg"
          iconUrl1="icon-url3.png"
          iconUrl2="icon-url4.png"
          text1="Text 3"
          text2="Text 4"
        />
      </Row>
    </Container>
  );
}

export default App;