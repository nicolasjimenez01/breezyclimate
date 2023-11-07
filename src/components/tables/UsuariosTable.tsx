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
import { useUserStore } from '@/context/UserContext';


function UsersTable() {

  const [
    users,
    getUsers,
    deleteUser,
    setSelectedUser,
    findUser
  ] = useUserStore(state => [
    state.users,
    state.getUsers,
    state.deleteUser,
    state.setSelectedUser,
    state.findUser
  ])
  const [open, setOpen] = React.useState(false);
  // const [obra, setObra] = React.useState<Obra | undefined>(undefined);

  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async (id: number) => {
    await deleteUser(id)
    toast.success('Se ha eliminado el usuario correctamente')
    handleClose()
  };

  const handleEditar = async (id: number) => {
    const userData = await findUser(id)
    // setObra(obraData);
    router.push( `/users/edit/${id}`);
  };


  useEffect(() => {
    getUsers()
  }, [getUsers])
  
  return (
    <>
    <TableContainer component={Paper} sx={{ mt: 0}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: 50 }}>Id</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Celular</StyledTableCell>
            <StyledTableCell align="center">Cédula</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Edad</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.nombre}</StyledTableCell>
              <StyledTableCell align="center">{row.celular}</StyledTableCell>
              <StyledTableCell align="center">{row.idNumber}</StyledTableCell>
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="center">{row.edad}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">
                <Stack direction="row" spacing={-3}>
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    sx={{p:0, fontSize: '0.8rem'}}
                    onClick={() => {
                      handleEditar(row.id)
                      setSelectedUser(row)
                      console.log(setSelectedUser(row))
                    }}
                  />
                  <Button
                    color="primary"
                    sx={{p:0}}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpen}
                  />
                  <DeleteDialog isOpen={open} onClose={handleClose} onEliminar={()=>handleEliminar(row.id)} mensaje='Este usuario se eliminará'/>
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

export default UsersTable;