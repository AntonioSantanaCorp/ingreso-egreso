import { FormControl, FormGroup, Validators } from '@angular/forms';

export function setLoginForm() {
  return new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
}