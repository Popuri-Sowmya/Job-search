import './App.css';
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 10,
      "offset": 0
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    const response = fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
      setData(jsonData.jdList);
    })
    .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h2">
                <img src={item.logoUrl} alt={item.title} style={{width: 50, height: 50 }}/>
                &nbsp; &nbsp;
                  {item.companyName}
                </Typography>
                <Typography variant="h6" component="h4">
                  {item.jobRole}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.jobDetailsFromCompany}
                  <br/>
                  <br/>
                <a href={item.jdLink} target="_blank" rel="noopener noreferrer">
                <Button variant="contained" color="info">
                  Apply Now
                </Button>
                </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
