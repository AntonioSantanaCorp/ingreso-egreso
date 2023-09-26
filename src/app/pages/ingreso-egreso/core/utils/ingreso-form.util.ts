import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export function setIngresoEgresoForm() {
  const formBuilder = inject(FormBuilder);

  return formBuilder.group({
    description: ['', Validators.required],
    monto: [0, Validators.required],    
  });
}
