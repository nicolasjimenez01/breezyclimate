'use client'
import Image from "next/image";
import Link from "next/link";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DialogWithForm from "@/components/modal/PedidosPopover";
import { useState } from "react";

interface Ducto {
  nombre: string;
  imagen: string;
  descripcion: string;
  path: string;
}

export default function LeerPedidosCard({ nombre, imagen, descripcion, path }: Ducto) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="bg-darkblue">
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={imagen}
          alt="green iguana"
          className="px-1 pt-1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="text-white">
            {nombre}
          </Typography>
          <Typography variant="body2" className="text-white">
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={path}>
            <Button 
              size="small" 
              className="text-mentaHover">
              Leer pedidos
            </Button>
        </Link>
        <DialogWithForm isOpen={dialogOpen} onClose={handleCloseDialog}/>
      </CardActions>
    </Card>
  );
}