'use client'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const medidaMayorAState = atom({
  key: 'medidaMayorA',
  default: 0,
});

export const medidaMenorAState = atom({
  key: 'medidaMenorA',
  default: 0,
});

export const resultadoState = selector({
  key: 'resultadoState',
  get: ({get}) => {
    const input1 = get(medidaMayorAState);
    const input2 = get(medidaMenorAState);
    return input1 + input2 / 2; // Puedes cambiar la lógica aquí
  },
});

export const useMedidaMayorA = () => useRecoilState(medidaMayorAState);
export const useMedidaMenorA = () => useRecoilState(medidaMenorAState);
export const useResultado = () => useRecoilValue(resultadoState);