import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReactCountryFlag from "react-country-flag";


export default function DriverCard(props) {
  const { bestTeamName, bestTeamImg, driver = {}, idx = {}, handleIncreaseScore, handleDecreaseScore } = props;
  const { firstName, lastName, number, team, image, country, points } = driver;



  return (
    <div className="driver_card " style={{ margin: '1rem' }}>
      {bestTeamName ?

        <Card>
            <Card.Header className='d-flex justify-content-center border'>
              <h3>{bestTeamName}</h3>
            </Card.Header>
            <Card.Body className='d-flex flex-column align-items-center border' >
              <img style={{ width: 320 }} src={bestTeamImg[0]}></img>
              <img style={{ width: 320}} src={bestTeamImg[1]}></img>
            </Card.Body>
        </Card> :

        <Card key={number} border="secondary" style={{ width: '17rem' }}>
            <Card.Header className='d-flex flex-row align-items-center'>
              <img style={{ width: 90 }} src={image}></img>
              <h6>{firstName} {lastName}</h6>
            </Card.Header>
            <Card.Body>
              <p>COUNTRY:
                <ReactCountryFlag
                  countryCode={country} svg
                  style={{
                    fontSize: '2em',
                    lineHeight: '2em',
                    margin: '0.2em'
                  }}
                />
              </p>
              <p>TEAM: {team}</p>
              <p>RACE NUMBER: {number}</p>
              <p>POINTS: {points}</p>
              <Button onClick={() => handleIncreaseScore(idx)} variant="primary">+5 POINTS</Button>{' '}
              <Button onClick={() => handleDecreaseScore(idx)} variant="secondary">-5 POINTS</Button>{' '}
            </Card.Body>

        </Card>
      }

    </div>
  )
}
