  import './App.css';
  import React, { useState, useEffect } from 'react';
  import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faBolt, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
  import '@fontsource/roboto/300.css';
  import '@fontsource/roboto/400.css';
  import '@fontsource/roboto/500.css';
  import '@fontsource/roboto/700.css';
  import FilterComponent from './FilterComponent';
  import { getData } from './actions';
  import { useDispatch } from 'react-redux';

  function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [isFiltering, setisFiltering] = useState('false');

    useEffect(() => {
      console.log("useeffect fired...")
      fetchData(10, 0);// Initial fetch with limit 10 and offset 0
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
        setFilteredJobs(newData);
        console.log("before dispatching",data.length);
        dispatch(getData(newData));
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
      if (
        scrollBottom < scrollThreshold && !loading
      ) {
        // Log a message indicating that more items should be fetched
        console.log("More items should be fetched...");
        // Fetch more data with an increased offset
        if(isFiltering==='true'){
          return;
        }
        fetchData(10, data.length);
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [data, handleScroll]); // Listen for changes to the data state

    const onFilterChange = (filters) => {
      setisFiltering('true');
      console.log("filters received are", filters);
      const filteredDataWithoutRemote = data.filter(item => {
          const roleCondition = !filters.jobRole || item.jobRole === filters.jobRole;
          const expCondition = !filters.experience || (item.minExp <= filters.experience && filters.experience <= item.maxExp);
          const baseSalaryCondition = !filters.minBaseSalary || filters.minBaseSalary <= item.minJdSalary;
          const companyNameCondition = !filters.companyName || item.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
          return roleCondition && expCondition && baseSalaryCondition && companyNameCondition;
      });
  
      const remoteJobs = filters.remote === 'remote' ? filteredDataWithoutRemote.filter(item => item.location === 'remote') : [];
      const nonRemoteJobs = filters.remote === 'remote' ? [] : filteredDataWithoutRemote.filter(item => item.location !== 'remote');
  
      const filteredJobs = filters.remote === 'remote' ? remoteJobs : nonRemoteJobs;
      setFilteredJobs(filteredJobs);
  };
  
  
  

    return (
      <div className="App">
        <Grid sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
          <FilterComponent onFilterChange={onFilterChange} />
          <Grid container spacing={4} marginLeft={2}>
            {filteredJobs.length > 0 && (
              filteredJobs.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} spacing={1}>
                  <Card elevation={2} sx={{
                    width: '400px', height: '610px', border: '1px solid #e0e0e0',
                    borderRadius: '16px', ':hover': { transform: 'scale(1.01)', }
                  }} >
                    <CardContent style={{ position: 'relative' }}>
                      <img src={item.logoUrl} alt="logo"
                        style={{ position: 'absolute', top: '8px', left: '8px', width: '35px', height: '50px' }} />
                      <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center' }}>
                        <Typography fontFamily="Roboto" variant="h3" component="h3"
                          style={{
                            fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px',
                            color: '#8b8b8b',
                          }}>
                          {item.companyName}
                        </Typography>
                      </div>
                      <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center' }}>
                        <Typography fontFamily="Roboto" variant="h1" component="p"
                          style={{ fontSize: '17px', fontWeight: 400, marginBottom: '3px', color: '#595959', }}>
                          {item.jobRole}
                        </Typography>
                      </div>
                      <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center' }}>
                        <Typography fontFamily="Roboto" variant="h6" component="h6"
                          style={{ fontSize: '12px', marginBottom: '3px', }}>
                          {item.location}
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography fontFamily="Roboto" variant="h1" component="h6" style={{
                          margin: '0px',
                          fontSize: '1rem',
                          fontWeight: 390,
                          color: 'rgb(77, 89, 106)',
                          fontFamily: 'Roboto',
                          lineHeight: 1.43,
                          marginBottom: '3px',
                          marginTop: '5px',
                        }}>
                          Estimated Salary: {item.salaryCurrencyCode} {item.minJdSalary} - {item.maxJdSalary}
                          &nbsp;
                          <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#00cc66", }} />
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography fontFamily="Roboto" variant="h1" component="h6" style={{
                          margin: '0px',
                          fontSize: '16px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          marginBottom: '3px',
                          marginTop: '5px',
                        }}>
                          About Company:
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography fontFamily="Roboto" variant="h1" component="h6" style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: 1.5,
                        }}>
                          About us
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                        <div>
                          <Typography fontFamily="Roboto" variant="body2" component="p" fontWeight={390} style={{ position: 'relative' }}>
                            {item.jobDetailsFromCompany}
                            <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '120px', background: 'linear-gradient(transparent, white)' }} />
                            <br />
                            <p style={{ textAlign: 'center', color: 'blue', position: 'absolute', bottom: '0', width: '100%', fontWeight: 390 }}>View Job</p>
                          </Typography>
                        </div>
                      </div>
                      <>
                        {item.minExp !== null ? (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography fontFamily="Roboto" variant="h3" component="h3"
                                style={{
                                  fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px',
                                  color: '#8b8b8b',
                                }}>
                                Minimum Experience
                              </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography fontFamily="Roboto" variant="h1" component="p"
                                style={{ fontSize: '15px', fontWeight: 400, marginBottom: '3px', color: '#595959', }}>
                                {item.minExp} years
                              </Typography>
                            </div>
                          </div>
                        ) : (
                          <>
                            <br />
                          </>
                        )}
                      </>
                      <br />
                      <a href={item.jdLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" style={{
                          textAlign: 'center', borderRadius: '8px', backgroundColor: '#55efc4',
                          color: '#000000', fontWeight: 500, width: '50vh', height: '6vh', textTransform: 'none', fontSize: '17px', fontFamily: 'Roboto'
                        }}>
                          <FontAwesomeIcon icon={faBolt} style={{ color: "#eb9834" }} />&nbsp;
                          Easy Apply
                        </Button>
                      </a>
                      <br/> <br/>
                      <a href='#' target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" style={{
                          textAlign: 'center', borderRadius: '8px', backgroundColor: '#4943da',
                          color: '#FFFFFF', fontWeight: 300, width: '50vh', height: '6vh', textTransform: 'none', fontSize: '17px', fontFamily: 'Roboto'
                        }}>
                          <img src="https://miro.medium.com/v2/resize:fit:988/1*4itGuaSECeDfqYxS3T0fJQ.png" alt="Blurred face" style={{ width: '20px', height: '20px', borderRadius: '50%', filter: 'blur(2px)'}} /> &nbsp;
                          <img src="https://img.freepik.com/free-photo/portrait-man-with-closed-eyes-close-up_23-2148239996.jpg" alt="Blurred face" style={{ width: '20px', height: '20px', borderRadius: '50%', filter: 'blur(2px)'}} /> &nbsp;
                          Unlock referral asks
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          {loading && <p>Loading...</p>}
        </Grid>
      </div>
    );    
  }

  export default App;
