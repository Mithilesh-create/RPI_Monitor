import React, { useState, useEffect } from 'react'
import { db } from "./db"
import { onValue, ref } from "firebase/database";
import "./App.css"
import TableDisplay from './table';
import { Container, Table } from 'react-bootstrap';
import { useGeolocated } from "react-geolocated";
import ForecastTable from './forecastTable';
import ParamTable from './parametertables';
function App() {
  const [Currentvoltage, setCurrentvoltage] = useState();
  const [volts, setHistory] = useState();
  const [datavals, setData] = useState();
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
  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  useEffect(() => {
    if (!coords) return
    const getdata = async () => {
      const dat = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude.toFixed(2)}&longitude=${coords.longitude.toFixed(2)}&hourly=weathercode,windspeed_10m,rain,is_day,direct_radiation,windspeed_1000hPa,winddirection_1000hPa&forecast_days=1&timezone=auto`);
      const datjson = await dat.json();
      const objArr = []

      for (let i = 0; i < 24; i++) {
        objArr.push({
          weathercode: datjson.hourly.weathercode[i],
          isDay: datjson.hourly.is_day[i],
          time: datjson.hourly.time[i],
          winddirection: datjson.hourly.winddirection_1000hPa[i],
          windspeed10m: datjson.hourly.windspeed_10m[i],
          windspeed: datjson.hourly.windspeed_1000hPa[i],
          solar: datjson.hourly.direct_radiation[i],
          rain: datjson.hourly.rain[i],
        })
      }
      setData(objArr);
    }
    getdata();
  }, [coords]);
  return (
    <>

      <div className='text-center'>
        <div className='maindisplay d-flex flex-column align-items-center justify-content-center mt-5'>

          <h1 className='text-white'>Current Voltage</h1>
          <h1 className='mainVoltage text-white'>
            {
              Currentvoltage?.Voltage ? Currentvoltage?.Voltage : 0
            }
            {" "}
            v

          </h1>

        </div>

        <div className='img'>
          <img src="https://cdn-icons-png.flaticon.com/512/124/124550.png" alt="logo" width={200} height={200}></img>
        </div>
        <div className='twotables'>
          <div className='tableOne'>
            {
              volts ?
                <Container className='border border-2'>
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
          <div className='tableTwo'>
            {
              datavals ?
                <Container className='border border-2'>
                  <Container>
                    <h3 className='text-center text-primary mt-3'>Forecasted Data</h3>
                    <hr></hr>
                    <Table>
                      <thead>
                        <tr>
                          <th className='col-md-2'>Date</th>
                          <th className='col-md-2'>Time</th>
                          <th className='col-md-2'>Weather Code</th>
                        </tr>
                      </thead>
                    </Table>
                  </Container>
                  <Container className='parent'>
                    <ForecastTable data={datavals} />
                  </Container>
                </Container>
                :
                <p>Forecast Data unavailable !!!!</p>
            }
          </div>


        </div>


      </div>
      {
        datavals ?
          <Container className='border border-2 bg-white mb-5'>
            <Container>
              <h3 className='text-center text-primary mt-3'>Forecasted Parmeters Data (24hrs)</h3>
              <hr></hr>
              <Table>
                <thead>
                  <tr>
                    <th className='col-md-2'>Date</th>
                    <th className='col-md-2'>Time</th>
                    <th className='col-md-2'>DayOrNight</th>
                    <th className='col-md-2'>SolarRadiation (W/m^2)</th>
                    <th className='col-md-2'>Windspeed (Km/s)</th>
                    <th className='col-md-2'>WindDirection (deg)</th>
                    <th className='col-md-2'>Rainfall (mm)</th>
                  </tr>
                </thead>
              </Table>
            </Container>
            <Container className='parent'>
              <ParamTable data={datavals} />
            </Container>
          </Container>
          :
          <p>Forecast Data unavailable !!!!</p>
      }


    </>
  )
}

export default App