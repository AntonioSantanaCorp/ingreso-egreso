import { FormControl, FormGroup, Validators } from '@angular/forms';

export function setRegisterForm() {
  return new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
}
