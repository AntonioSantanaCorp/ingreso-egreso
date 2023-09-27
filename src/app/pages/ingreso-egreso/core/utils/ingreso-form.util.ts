import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export function setIngresoEgresoForm() {
  const formBuilder = inject(FormBuilder);

  return formBuilder.group({
    descripcion: ['', Validators.required],
    monto: [0, { validators: Validators.required, nonNullable: true }],
    tipo: ['ingreso', { validators: Validators.required, nonNullable: true }],
  });
}
