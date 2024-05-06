import React, { useState } from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const FilterComponent = ({ onFilterChange }) => {
    const data = useSelector(state => state.data);
    const uniqueJobRoles = [...new Set(data.map((item) => item.jobRole))];
    const [searchTerm, setSearchTerm] = useState('');

    const [filters, setFilters] = useState({
        jobRole: '',
        experience: '',
        remote: '',
        minBaseSalary: '',
        companyName: ''
    });

    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        handleFilterChange('companyName',searchTerm);
    };

    return (
        <Grid marginTop={1} container spacing={2} marginBottom={6}>
            <Grid item lg={2}>
                <TextField
                    label="Roles"
                    select
                    fullWidth
                    value={filters.jobRole}
                    onChange={(e) => handleFilterChange('jobRole', e.target.value)}
                >
                    {uniqueJobRoles.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item lg={2}>
                <TextField
                    label="Number of Employees"
                    select
                    fullWidth
                    value={filters.numEmployees}
                    onChange={(e) => handleFilterChange('numEmployees', e.target.value)}
                >
                    <MenuItem value="">No. of Employees</MenuItem>
                    <MenuItem value="1-10">1 - 10</MenuItem>
                    <MenuItem value="11-20">11 - 20</MenuItem>
                    <MenuItem value="21-50">21 - 50</MenuItem>
                    <MenuItem value="51-100">51 - 100</MenuItem>
                    <MenuItem value="101-200">101 - 200</MenuItem>
                    <MenuItem value="201-500">201 - 500</MenuItem>
                    <MenuItem value="500+">500+</MenuItem>
                </TextField>
            </Grid>

            <Grid item lg={2}>
                <TextField
                    label="Experience"
                    select
                    fullWidth
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((exp, index) => (
                        <MenuItem key={index} value={exp}>{exp}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item lg={2}>
                <TextField
                    label="Remote"
                    select
                    fullWidth
                    value={filters.remote}
                    onChange={(e) => handleFilterChange('remote', e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="in-office">In-Office</MenuItem>
                </TextField>
            </Grid>
            <Grid item lg={2}>
                <TextField
                    label="Minimum Base Pay Salary"
                    select
                    fullWidth
                    value={filters.minBaseSalary}
                    onChange={(e) => handleFilterChange('minBaseSalary', e.target.value)}
                >
                    {[0, 10, 20, 30, 40, 50, 60, 70].map((value, index) => (
                        <MenuItem key={index} value={value}>
                            {value}L
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item lg={2}>
                <TextField
                    label="Search Company Name"
                    placeholder="Search for companies..."
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {/* {filteredCompanies.map((company, index) => (
                    <MenuItem key={index} onClick={() => handleFilterChange('companyName', company.companyName)}>
                    </MenuItem>
                ))} */}
            </Grid>
        </Grid>
    );
};

export default FilterComponent;
