'use client'

// import { create } from 'zustand';

// interface OperationsStore {
//   medidaMayorA: number;
//   medidaMenorA: number;
//   medidaMayorB: number;
//   medidaMenorB: number;
//   longitud: number;
//   distSoportes: number;

//   setMedidaMayorA: (value: number | null) => void;
//   setMedidaMenorA: (value: number | null) => void;
//   setMedidaMayorB: (value: number | null) => void;
//   setMedidaMenorB: (value: number | null) => void;
//   setLongitud: (value: number | null) => void;
//   setDistSoportes: (value: number | null) => void;

//   promMedA: () => number;
//   promMedB: () => number;
//   promedioPerimetro: () => number;
//   cantPiezas: () => number;
//   area: () => number;
//   cantSoportes: () => number;
// }

// // Definir el hook Zustand
// export const useStore = create<OperationsStore>((set) => ({
//   medidaMayorA: 0,
//   medidaMenorA: 0,
//   medidaMayorB: 0,
//   medidaMenorB: 0,
//   longitud: 0,
//   distSoportes: 0,

//   setMedidaMayorA: (value) => set({ medidaMayorA: value }),
//   setMedidaMenorA: (value) => set({ medidaMenorA: value }),
//   setMedidaMayorB: (value) => set({ medidaMayorB: value }),
//   setMedidaMenorB: (value) => set({ medidaMenorB: value }),
//   setLongitud: (value) => set({ longitud: value }),
//   setDistSoportes: (value) => set({ distSoportes: value }),

//   promMedA: () => {
//     const state = set.getState();
//     const input1 = state.medidaMayorA || 0;
//     const input2 = state.medidaMenorA || 0;
//     return (input1 + input2) / 2;
//   },

//   promMedB: () => {
//     const state = set.getState();
//     const input1 = state.medidaMayorB || 0;
//     const input2 = state.medidaMenorB || 0;
//     return (input1 + input2) / 2;
//   },

//   promedioPerimetro: () => {
//     const state = set.getState();
//     const promedioA = state.promMedA();
//     const promedioB = state.promMedB();
//     return (((promedioA + promedioB) * 2) * 2.542) / 100;
//   },

//   cantPiezas: () => {
//     const state = set.getState();
//     const input1 = state.longitud || 0;
//     return input1 / 0.80;
//   },

//   area: () => {
//     const state = get();
//     const input1 = state.promedioPerimetro();
//     const input2 = state.longitud || 0;
//     return input2 * input1;
//   },

//   cantSoportes: () => {
//     const state = set.getState();
//     const input1 = state.longitud || 0;
//     const input2 = state.distSoportes || 0;

//     if (input2 === null || input2 === 0) {
//       return 0;
//     }

//     return input1 / input2;
//   },
// }));
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const medidaMayorAState = atom({
  key: 'medidaMayorA',
  default: null,
});

export const medidaMenorAState = atom({
  key: 'medidaMenorA',
  default: null,
});

export const medidaMayorBState = atom({
  key: 'medidaMayorB',
  default: null,
});

export const medidaMenorBState = atom({
  key: 'medidaMenorB',
  default: null,
});

export const longitudState = atom({
  key: 'longitudDuctos',
  default: null,
});

export const distSoportes = atom({
  key: 'distSoportes',
  default: null,
});


export const promMedA = selector({
  key: 'promedioA',
  get: ({get}) => {
    const input1 = get(medidaMayorAState) || 0;
    const input2 = get(medidaMenorAState) || 0;
    return (input1 + input2) / 2; // Puedes cambiar la lógica aquí
  },
});

export const promMedB = selector({
  key: 'promedioB',
  get: ({get}) => {
    const input1 = get(medidaMayorBState) || 0;
    const input2 = get(medidaMenorBState) || 0;
    return (input1 + input2) / 2; // Puedes cambiar la lógica aquí
  },
});

export const promedioPerimetro = selector({
  key: 'perimetro',
  get: ({ get }) => {
    const promedioA = get(promMedA);
    const promedioB = get(promMedB);
    return (((promedioA + promedioB)*2)*2.542)/100
  },
});

export const cantPiezas = selector({
  key: 'cantPiezas',
  get: ({get}) => {
    const input1 = get(longitudState) || 0;
    return (input1) / 0.80; // Puedes cambiar la lógica aquí
  },
});

export const area = selector({
  key: 'areaM2',
  get: ({get}) => {
    const input1 = get(promedioPerimetro) || 0;
    const input2 = get(longitudState) || 0;
    return input2*input1; // Puedes cambiar la lógica aquí
  },
});

export const cantSoportes = selector({
  key: 'cantSoportes',
  get: ({get}) => {
    const input1 = get(longitudState) || 0;
    const input2 = get(distSoportes) || 0;

    if (input2 === null || input2 === 0) {
      
      return 0; 
    }
    return input1 / input2; // Puedes cambiar la lógica aquí
  },
});


export const useMedidaMayorA = () => useRecoilState(medidaMayorAState);
export const useMedidaMenorA = () => useRecoilState(medidaMenorAState);
export const usePromMedA = () => useRecoilValue(promMedA);

export const useMedidaMayorB = () => useRecoilState(medidaMayorBState);
export const useMedidaMenorB = () => useRecoilState(medidaMenorBState);
export const usePromMedB = () => useRecoilValue(promMedB);

export const usePromedioPerimetro = () => useRecoilValue(promedioPerimetro);

export const useLongitud = () => useRecoilState(longitudState);
export const useCantPiezas = () => useRecoilValue(cantPiezas);

export const useArea = () => useRecoilValue(area);

export const useDistSoportes = () => useRecoilState(distSoportes)
export const useCantSoportes = () => useRecoilValue(cantSoportes);
