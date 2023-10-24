'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LeerPedidosCard from '@/components/cards/LeerPedidoCard';

const ductos = [
  {
    nombre: 'Ductos Rectangular en Lámina',
    imagen: 'https://mundialdegasyagua.com/wp-content/uploads/2021/06/ducto-4x2.40.jpg',
    descripcion: 'Descripción del ducto rectangular en lámina.',
    path: '/pedidos/leer/reclamina',
  },
  {
    nombre: 'Ductos Circular en Lámina',
    imagen: 'https://mundialdegasyagua.com/wp-content/uploads/2021/06/ducto-4x2.40.jpg',
    descripcion: 'Descripción del ducto circular en lámina.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Lamina con Soldadura',
    imagen: 'https://mundialdegasyagua.com/wp-content/uploads/2021/06/ducto-4x2.40.jpg',
    descripcion: 'Descripción del ducto de lámina con soldadura.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Fibra de Vidrio',
    imagen: 'https://mundialdegasyagua.com/wp-content/uploads/2021/06/ducto-4x2.40.jpg',
    descripcion: 'Descripción del ducto de fibra de vidrio.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Polisocianorato',
    imagen: 'https://mundialdegasyagua.com/wp-content/uploads/2021/06/ducto-4x2.40.jpg',
    descripcion: 'Descripción del ducto de polisocianorato.',
    path: '/pedidos/reclamina',
  },
];

export default function CrearPedidos() {


  return (
    <div className='mx-5 my-5'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {ductos.map((ducto, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <LeerPedidosCard nombre={ducto.nombre} imagen={ducto.imagen} descripcion={ducto.descripcion} path={ducto.path}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}