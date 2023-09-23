export interface AuthUser {
  email: string;
  password: string;
}

export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}
}
