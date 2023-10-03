'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#3DD9BC',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  codObra: number,
  NomObra: string,
  NomOficial: string,
  CelOficial: string,
  CTOObra: number,
  Ciudad: string,
  CELCTO: string,
  Fecha: string,
  Acciones: string,
) {
  return { codObra, NomObra, NomOficial, CelOficial, CTOObra, Ciudad, CELCTO, Fecha, Acciones };
}

const rows = [
  createData(1, "Obra1", "Oficial1", "123456789", 1001, "Ciudad1", "987654321", "2023-01-01", ''),
  createData(2, "Obra2", "Oficial2", "987654321", 1002, "Ciudad2", "123456789", "2023-02-01", ''),
  createData(3, "Obra3", "Oficial3", "555555555", 1003, "Ciudad3", "444444444", "2023-03-01", ''),
  createData(4, "Obra4", "Oficial4", "999999999", 1004, "Ciudad4", "111111111", "2023-04-01", ''),
  createData(5, "Obra5", "Oficial5", "777777777", 1005, "Ciudad5", "666666666", "2023-05-01", '')
];

export default function PedidosTable() {
  return (
    <TableContainer component={Paper} sx={{ mt: 0}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: 50 }}>Código de obra</StyledTableCell>
            <StyledTableCell align="center">Nombre de la obra</StyledTableCell>
            <StyledTableCell align="center">Nombre del oficial</StyledTableCell>
            <StyledTableCell align="center">Celular oficial</StyledTableCell>
            <StyledTableCell align="center">CTO OBRA</StyledTableCell>
            <StyledTableCell align="center">Ciudad</StyledTableCell>
            <StyledTableCell align="center">Celular CTO</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.codObra}>
              <StyledTableCell component="th" scope="row">
                {row.codObra}
              </StyledTableCell>
              <StyledTableCell align="center">{row.NomObra}</StyledTableCell>
              <StyledTableCell align="center">{row.NomOficial}</StyledTableCell>
              <StyledTableCell align="center">{row.CelOficial}</StyledTableCell>
              <StyledTableCell align="center">{row.CTOObra}</StyledTableCell>
              <StyledTableCell align="center">{row.Ciudad}</StyledTableCell>
              <StyledTableCell align="center">{row.CTOObra}</StyledTableCell>
              <StyledTableCell align="center">{row.Fecha}</StyledTableCell>
              <StyledTableCell align="center">{row.Acciones}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}