import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Usuario } from '../models/main.model';
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable()
export class AuthService {
  private currentUser: firebase.User | null = null;

  readonly authUserState$ = this.auth.authState.pipe(
    tap((user) => (this.currentUser = user))
  );

  get isAuth() {
    return this.auth.authState.pipe(map(Boolean));
  }

  get uid() {
    return this.currentUser?.uid;
  }

  get user() {
    return this.currentUser;
  }

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user!.uid, nombre, user!.email!);
        return this.db.list(`usuarios/${user!.uid}`).push({ ...newUser });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
