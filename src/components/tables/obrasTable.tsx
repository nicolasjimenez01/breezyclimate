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
import { useContext, useEffect } from 'react'
import { useObrasStore } from '@/context/ObrasContext';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import DeleteDialog from "@/components/modal/ConfirmDelete";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Obra } from '@prisma/client';
import { format } from 'date-fns'


async function findObra(id: number): Promise<Obra>{
  const res = await fetch('http://localhost:3000/api/obras/' + id)
  const obra: Obra = await res.json()
  return obra
}

function ObrasTable() {

  const [
    obras, 
    getObras, 
    deleteObra, 
    setSelectedObra
  ] = useObrasStore(state => [
    state.obras,
    state.getObras,
    state.deleteObra,
    state.setSelectedObra
  ])

  const [open, setOpen] = React.useState(false);
  const [obra, setObra] = React.useState<Obra | undefined>(undefined);

  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async (id: number) => {
    await deleteObra(id)
    toast.success('Se ha eliminado la obra correctamente')
    handleClose()
  };

  const handleEditar = async (id: number) => {
    const obraData = await findObra(id)
    setObra(obraData);
    router.push( `/obras/edit/${id}`);
  };


  useEffect(() => {
    getObras()
  }, [getObras])
  
  return (
    <>
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
          {obras.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.nomObra}</StyledTableCell>
              <StyledTableCell align="center">{row.nomOficial}</StyledTableCell>
              <StyledTableCell align="center">{row.celOficial}</StyledTableCell>
              <StyledTableCell align="center">{row.contactoObra}</StyledTableCell>
              <StyledTableCell align="center">{row.ciudad}</StyledTableCell>
              <StyledTableCell align="center">{row.celContacto}</StyledTableCell>
              <StyledTableCell align="center">{format(new Date(row.fecha), 'dd/MM/yyyy')}</StyledTableCell>
              <StyledTableCell align="center">
                <Stack direction="row" spacing={-3}>
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    sx={{p:0, fontSize: '0.8rem'}}
                    onClick={() => {
                      handleEditar(row.id)
                      setSelectedObra(row)
                    }}
                  />
                  <Button
                    color="primary"
                    sx={{p:0}}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpen}
                  />
                  <DeleteDialog isOpen={open} onClose={handleClose} onEliminar={()=>handleEliminar(row.id)}/>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}

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

export default ObrasTable;