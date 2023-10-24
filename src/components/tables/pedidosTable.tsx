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
import { useEffect } from 'react';
import { useObrasStore } from '@/context/ObrasContext';
import { format } from 'date-fns'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from "@/components/modal/ConfirmDelete";
import { usePedidosStore } from '@/context/PedidosContext';
import { toast } from 'sonner';

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


export default function PedidosTable() {

  const deletePedido = usePedidosStore((state) => state.deletePedido)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async (id: number) => {
    await deletePedido(id)
    toast.success('Se ha eliminado la el pedido correctamente')
    handleClose()
  };

  const [
    obras,
    getObras
   ] = useObrasStore((state) => [
    state.obras,
    state.getObras
   ])

  const [
    pedidos,
    getPedidos
   ] = usePedidosStore((state) => [
    state.pedidos,
    state.getPedidos
   ])


   useEffect(() => {
    getPedidos()
   },[getPedidos])


  return (
    <TableContainer component={Paper} sx={{ mt: 0}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: 50 }}>Código de obra</StyledTableCell>
            <StyledTableCell align="center">Ciudad</StyledTableCell>
            <StyledTableCell align="center">ID Obra</StyledTableCell>
            <StyledTableCell align="center">Dirección</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Longitud Soportes</StyledTableCell>
            <StyledTableCell align="center">Longitud Ductos</StyledTableCell>
            <StyledTableCell align="center">Perimetro</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((row) => (
            <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="center">{row.ciudad}</StyledTableCell>
            <StyledTableCell align="center">{row.obraId}</StyledTableCell>
            <StyledTableCell align="center">{row.direccion}</StyledTableCell>
            <StyledTableCell align="center">{format(new Date(row.fecha), 'dd/MM/yyyy')}</StyledTableCell>
            <StyledTableCell align="center">{row.longSoportes}</StyledTableCell>
            <StyledTableCell align="center">{row.longitudDuctos}</StyledTableCell>
            <StyledTableCell align="center">{row.perimetro}</StyledTableCell>
            <StyledTableCell align="center">
              <Button
                color="primary"
                sx={{p:0}}
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              />
              <DeleteDialog isOpen={open} onClose={handleClose} onEliminar={()=>handleEliminar(row.id)}/>
            </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}