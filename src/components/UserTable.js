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

const rows = [
    {
        id:1,
        name:'John Fred',
        email:'jojo@makeitall.co.uk',
        
    },
    {
        id:2,
        name:'Bob Baker',
        email:'bob@makeitall.co.uk',
    },
    {
        id:3,
        name:'Paul Smith',
        email:'paul@makeitall.co.uk',
  },
];

function userTable() {
    //const classes = userStyles;
    
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (event, row) => {
        setSelectedRow(row);
    };

    return (
        <TableContainer component={Paper}>
          <Table sx={{ 
        minWidth: "650px",
        //mx: "20px",
        }}
        aria-label="user table">
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