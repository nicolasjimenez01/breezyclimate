
import { Insumo } from "@prisma/client"; // Ajusta la ruta según sea necesario

export interface OperacionesPorInsumo {
  [key: string]: (cantSoportes: number, insumoso: Insumo, formik: any, longitudSoportes: number | null, cantPiezas: number, promedioPerimetro: number, area: number, promedioMedA: number) => void;
}

export const operacionesPorInsumo: OperacionesPorInsumo = {
  'Chazo Rl 3/8': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Chazo Rl 1/4': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total:nuevoTotal.toString(),
    });
  },
  'Chazo poli': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total:nuevoTotal.toString(),
    });
  },
  'Chazo de ojo 5/16': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total:nuevoTotal.toString(),
    });
  },
  'Varilla Roscada 3/8': (cantSoportes, insumoso, formik, longitudSoportes) => {
    const nuevaCantidad = cantSoportes * 2;
    const varillaros38Value = longitudSoportes !== null
    ? (nuevaCantidad * longitudSoportes) / 3
    : 0;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(varillaros38Value).toString(),
      total: (varillaros38Value * insumoso.precio).toString(),
    });
  },
  'Varilla Roscada 1/4': (cantSoportes, insumoso, formik, longitudSoportes) => {
    const nuevaCantidad = (cantSoportes * 2) * (longitudSoportes || 0) / 3;
    const nuevoTotal = nuevaCantidad * insumoso.precio;
  
    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Waya de 1/8': (cantSoportes, insumoso, formik, longitudSoportes) => {
    const nuevaCantidad = (cantSoportes * 2) * (longitudSoportes || 0);
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Grilletes 3/16': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 4;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Tensor n°9': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Perfil mecano 1/2 altura': (cantSoportes, insumoso, formik, _, __, prom, area, promedioMedA) => {
    const nuevaCantidad = (cantSoportes * (promedioMedA * 2.54 / 100) / 3);
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },

  'Perfil mecano doble altura': (cantSoportes, insumoso, formik, _, __, prom, area, promedioMedA) => {
    const nuevaCantidad = (cantSoportes * (promedioMedA * 2.54 / 100) / 3);
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total:nuevoTotal.toString(),
    });
  },
  'Angulo de 1 1/2 x 1/8': (cantSoportes, insumoso, formik, _, __, prom, area, promedioMedA) => {
    const nuevaCantidad = (cantSoportes * (promedioMedA * 2.54 / 100) / 6);
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Angulo de 2x3/16': (cantSoportes, insumoso, formik, _, __, prom, area, promedioMedA) => {
    const nuevaCantidad = (cantSoportes * (promedioMedA * 2.54 / 100) / 6);
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Oreja en angulo': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Tornillo 3/8 x 3/4': (cantPiezas, insumoso, formik) => {
    const nuevaCantidad = cantPiezas * 4;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Tornillo 1/4 x 3/4': (cantPiezas, insumoso, formik) => {
    const nuevaCantidad = cantPiezas * 4;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Tuerca 3/8': (cantSoportes, insumoso, formik, _, cantPiezas) => {
    const nuevaCantidad = (cantPiezas * 4) + cantSoportes * 2
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Tuerca 1/4': (cantSoportes, insumoso, formik, _, cantPiezas) => {
    const nuevaCantidad = (cantPiezas * 4) + (cantSoportes * 2);
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },

  'Arandelas 3/8': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Arandelas 1/4': (cantSoportes, insumoso, formik) => {
    const nuevaCantidad = cantSoportes * 2;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Silicona tranparente': (_, insumoso, formik, __, cantidadPiezas, promedioPerimetro) => {
    const nuevaCantidad = (promedioPerimetro * cantidadPiezas) / 10;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Silicona roja': (_, insumoso, formik, __, cantidadPiezas, promedioPerimetro) => {
    const nuevaCantidad = (promedioPerimetro * cantidadPiezas) / 10;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },

  'Syka flex ducto interperie': (_, insumoso, formik, __, cantidadPiezas, promedioPerimetro) => {
    const nuevaCantidad = (promedioPerimetro * cantidadPiezas) / 10;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'P25': (_, insumoso, formik, __, cantidadPiezas, promedioPerimetro) => {
    const nuevaCantidad = (promedioPerimetro * cantidadPiezas) / 60;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Pega amarilla xl 1714': (_, insumoso, formik, __, cant, prom, area) => {
    const nuevaCantidad = area / 7;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },
  'Pega amarilla pl 285': (_, insumoso, formik, __, cant, prom, area) => {
    const nuevaCantidad = area / 7;
    const nuevoTotal = nuevaCantidad * insumoso.precio;

    formik.setValues({
      ...formik.values,
      cantidad: Math.ceil(nuevaCantidad).toString(),
      total: nuevoTotal.toString(),
    });
  },

    'Jumbolon': (_, insumoso, formik, __, cant, prom, area) => {
      const nuevaCantidad = area / 36;
      const nuevoTotal = nuevaCantidad * insumoso.precio;

      formik.setValues({
        ...formik.values,
        cantidad: Math.ceil(nuevaCantidad).toString(),
        total: nuevoTotal.toString(),
      });
    },
    'Lona': (_, insumoso, formik, __, cant, promedioPerimetro, area) => {
      const nuevaCantidad = promedioPerimetro;
      const nuevoTotal = nuevaCantidad * insumoso.precio;

      formik.setValues({
        ...formik.values,
        cantidad: Math.ceil(nuevaCantidad).toString(),
        total: nuevoTotal.toString(),
      });
    },

    'Correas pisa lona': (_, insumoso, formik, __, cant, promedioPerimetro, area) => {
      const nuevaCantidad = promedioPerimetro / 2.4;
      const nuevoTotal = nuevaCantidad * insumoso.precio;

      formik.setValues({
        ...formik.values,
        cantidad: Math.ceil(nuevaCantidad).toString(),
        total: nuevoTotal.toString(),
      });
    },


}