import { Injectable } from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { Usuario } from '../models/main.model';
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from '../store/auth.actions';

@Injectable()
export class AuthService {
  private userSubscription!: Subscription;

  get isAuth() {
    return this.auth.authState.pipe(map(Boolean));
  }

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fbUser) => {
      if (!fbUser) {
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        return;
      }

      this.userSubscription = this.db
        .object(`usuarios/${fbUser.uid}`)
        .valueChanges()
        .subscribe((userInfo: any) => {
          const [key] = Object.keys(userInfo);
          this.store.dispatch(authActions.setUser(userInfo[key]));
        });
    });
  }

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
