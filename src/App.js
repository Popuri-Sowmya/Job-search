import './App.css';
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(10, 0); // Initial fetch with limit 10 and offset 0
  }, []);

  const fetchData = async (limit, offset) => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        "limit": limit,
        "offset": offset
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      const newData = [...data, ...jsonData.jdList];
      setData(newData);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    console.log("inside handleScroll");
    const scrollThreshold = 50;
    const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - document.documentElement.scrollTop;
    // Check if the user has scrolled to the bottom of the page and data is not loading
    console.log("1st condition",window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight)
    console.log("window.innerHeight",window.innerHeight)
    console.log("document.documentElement.scrollTop",document.documentElement.scrollTop)
    console.log("document.documentElement.offsetHeight",document.documentElement.offsetHeight)
    console.log("second condition",!loading)
    if (
      scrollBottom < scrollThreshold && !loading
    ) {
      // Log a message indicating that more items should be fetched
      console.log("More items should be fetched...");
      // Fetch more data with an increased offset
      fetchData(10, data.length);
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data,handleScroll]); // Listen for changes to the data state

  return (
    <div className="App">
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent style={{ position: 'relative' }}>
                <Typography variant="h4" component="h2">
                  <img src={item.logoUrl} alt="logo" style={{ width: 50, height: 50 }} />
                  &nbsp; &nbsp;
                  {item.companyName}
                </Typography>
                <Typography variant="h6" component="h4">
                  {item.jobRole}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.jobDetailsFromCompany}
                  <br />
                  <br />
                  <a href={item.jdLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" color="info">
                      <FontAwesomeIcon icon={faBolt} style={{ color: "#FFD43B" }} />&nbsp;
                      Easy Apply
                    </Button>
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
