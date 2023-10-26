'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PedidosCard from '@/components/cards/PedidosCard';

export const ductos = [
  {
    nombre: 'Ductos Rectangular en Lámina',
    imagen: '/ductoRectangularLamina.png',
    descripcion: 'Descripción del ducto rectangular en lámina.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Circular en Lámina   ',
    imagen: '/circular.jpg',
    descripcion: 'Descripción del ducto circular en lámina.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Lamina con Soldadura',
    imagen: '/laminaconsoldadura.png',
    descripcion: 'Descripción del ducto de lámina con soldadura.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Fibra de Vidrio',
    imagen: '/fibravidrio.png',
    descripcion: 'Descripción del ducto de fibra de vidrio.',
    path: '/pedidos/reclamina',
  },
  {
    nombre: 'Ductos Polisocianorato',
    imagen: '/polisocianorato.png',
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
              <PedidosCard nombre={ducto.nombre} imagen={ducto.imagen} descripcion={ducto.descripcion} path={ducto.path}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}