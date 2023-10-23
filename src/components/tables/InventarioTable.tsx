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
import { useInsumosStore } from '@/context/InsumoContext';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Obra } from '@prisma/client';
import EditInsumoDialog from '../modal/EditInsumo';
import { Insumo } from '@prisma/client';

function InventarioTable() {

  const [ 
    insumos,
    getInsumos,
    setSelectedInsumo,
    findInsumo,
    selectedInsumo
  ] = useInsumosStore(state => [
    state.insumos,
    state.getInsumos,
    state.setSelectedInsumo,
    state.findInsumo,
    state.selectedInsumo
  ])

  const [open, setOpen] = React.useState(false);
  // const [obra, setObra] = React.useState<Obra | undefined>(undefined);

  // const router = useRouter()

  const handleClickOpen = (insumo: Insumo) => {
    setSelectedInsumo(insumo)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditar = async (id: number) => {
    const insumoData = await findInsumo(id)
    setSelectedInsumo(insumoData)
    
    // router.push(`/insumos/edit/${id}`)
  };

  useEffect(() => {
    getInsumos()
  }, [getInsumos])
  
  return (
    <>
    <TableContainer component={Paper} sx={{ mt: 0}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: 50 }}>Id</StyledTableCell>
            <StyledTableCell align="center">Insumo</StyledTableCell>
            <StyledTableCell align="center">Proveedor</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Precio</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {insumos.sort((a, b) => a.id - b.id).map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.nomInsumo}</StyledTableCell>
              <StyledTableCell align="center">{row.proveedor}</StyledTableCell>
              <StyledTableCell align="center">{row.cantStock}</StyledTableCell>
              <StyledTableCell align="center">{row.precio}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{p:0, fontSize: '0.8rem'}}
                  onClick={() => {
                    handleClickOpen(row)
                    handleEditar(row.id)
                  }}
                />
                {selectedInsumo && <EditInsumoDialog isOpen={open} onClose={handleClose} insumo={selectedInsumo} />}
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

export default InventarioTable;