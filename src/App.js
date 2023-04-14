import React, { useState, useEffect } from 'react'
import { db } from "./db"
import { onValue, ref } from "firebase/database";
import "./App.css"
import TableDisplay from './table';
import { Container, Table } from 'react-bootstrap';
// import { useGeolocated } from "react-geolocated";
function App() {
  const [Currentvoltage, setCurrentvoltage] = useState();
  const [volts, setHistory] = useState();


  useEffect(() => {
    const MainVoltageQuery = ref(db, "/currentvoltage");
    return onValue(MainVoltageQuery, (snapshot) => {
      const data = snapshot.val();
      setCurrentvoltage(data)
    })
  }, []);
  useEffect(() => {
    const HistoryVoltageQuery = ref(db, "/volt");
    return onValue(HistoryVoltageQuery, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setHistory(data.reverse());
      }
    })
  }, []);
  // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //   useGeolocated({
  //     positionOptions: {
  //       enableHighAccuracy: false,
  //     },
  //     userDecisionTimeout: 5000,
  //   });
  return (
    <>
      <div className='text-center'>
        <div className='maindisplay d-flex flex-column align-items-center justify-content-center mt-5'>

          <h1>Current Voltage</h1>
          <h1 className='text-success mainVoltage'>
            {
              Currentvoltage?.Voltage ? Currentvoltage?.Voltage : 3.27
            }
            {" "}
            v
          </h1>
        </div>
        {
          volts ?
            <Container className='border border-2 rounded'>
              <Container>
                <h3 className='text-center text-danger mt-3'>History</h3>
                <hr></hr>
                <Table>
                  <thead>
                    <tr>
                      <th className='col-md-2'>Date</th>
                      <th className='col-md-2'>Time</th>
                      <th className='col-md-2'>Voltage</th>
                    </tr>
                  </thead>
                </Table>
              </Container>
              <Container className='parent'>
                <TableDisplay data={volts} />
              </Container>
            </Container>
            :
            <p>No Data</p>
        }

      </div>
      {/* {

        !isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : coords ? (
          <div>
            <p>{coords.latitude}</p>
            <p>{coords.longitude}</p>
          </div>
        ) : (
          <div>Getting the location data&hellip; </div>
        )
      } */}

    </>
  )
}

export default App