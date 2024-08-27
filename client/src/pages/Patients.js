import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1565c0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#e1f5fe", // Light blue shade for odd rows
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#b3e5fc", // Slightly darker light blue shade for even rows
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Patients(props) {
  
  const [patients, setPatients] = useState([]);

  // Fetch the patients data when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/Doc/Patients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPatients(data); // Store the data in the state
        } else {
          alert('Failed to fetch patients.');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    };

    fetchPatients();
  }, []); 


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        height: '100vh', 
        padding: 2,
        position: 'relative', 
        backgroundColor: '#90caf9',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        <Button variant="contained" color="primary" component={Link} to='/Doc'>
          Back
        </Button>
      </Box>

      <Box
        sx={{
          width: '80%', // Table container width
          height: '75%', // Table container height
          marginTop: '6%', // Margin from the top
          
        }}
      >
        <TableContainer component={Paper} sx={{ height: '90%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">BirthDay</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right">Medical History</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                // key ? email is the unique eliment
                <StyledTableRow key={patient.email}>  
                  <StyledTableCell component="th" scope="row">
                    {patient.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{patient.bday}</StyledTableCell>
                  <StyledTableCell align="right">{patient.gender}</StyledTableCell>
                  <StyledTableCell align="right">{patient.medicalHistory}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}