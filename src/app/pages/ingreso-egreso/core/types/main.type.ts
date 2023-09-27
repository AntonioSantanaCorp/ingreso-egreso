export type IngresoEgresoType = {
  descripcion: string;
  monto: number;
  tipo: 'ingreso' | 'egreso';
  uid?: string;
};
