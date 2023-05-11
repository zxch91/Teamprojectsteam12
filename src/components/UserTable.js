import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { CheckBox } from '@mui/icons-material';

/*const userStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});*/


function userTable(props) {
    //const classes = userStyles;

    const {rows, setrowInfo} = props
    
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (event, row) => {
        setSelectedRow(row);
        setrowInfo(row.id);
    };

    return (
      <TableContainer 
        component={Paper} 
        style={{
          borderRadius: '15px', // makes the corners rounded
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', // adds a layered shadow effect
          overflow: 'hidden', // to apply borderRadius to inner table
        }}
      >
        <Table 
          sx={{ 
            minWidth: "650px",
            backgroundColor: '#f8f9fa', // sets background color to light grey
            border: '2px solid #007bff', // sets border color to #007bff
            '& th': {
              color: '#007bff', // sets header text color to #007bff
              fontWeight: 'bold',
            },
            '& tr:hover': {
              backgroundColor: '#e9ecef', // change row color on hover
            }
          }}
          aria-label="user table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={(event) => handleRowClick(event, row)}
                selected={selectedRow && selectedRow.id === row.id}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton aria-label="select">
                    <CheckBox />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
    
};

export default userTable;