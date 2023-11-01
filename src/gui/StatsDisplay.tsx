import React from "react";
import { Col, Image, Table } from "react-bootstrap";

interface StatsDisplayProps {
  imageUrl: string;
  iconUrl1: string;
  iconUrl2: string;
  text1: string;
  text2: string;
}

function StatsDisplay({
  imageUrl,
  iconUrl1,
  iconUrl2,
  text1,
  text2,
}: StatsDisplayProps) {
  return (
    <Col className="mb-3">
      <div className="rounded-lg bg-secondary p-3">
        <Image src={imageUrl} roundedCircle width="100" height="100" className="mb-3" />
        <Table striped bordered>
          <tbody>
            <tr>
              <td>
                <img src={iconUrl1} alt="Icon 1" width="20" height="20" />
              </td>
              <td>{text1}</td>
            </tr>
            <tr>
              <td>
                <img src={iconUrl2} alt="Icon 2" width="20" height="20" />
              </td>
              <td>{text2}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Col>
  );
}

export default StatsDisplay;
