import { Injectable } from '@angular/core';
import { Subscription, filter, map, of, switchMap, tap } from 'rxjs';
import { Usuario } from '../models/main.model';
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from '../store/auth.actions';
import * as ingresoEgresoActions from 'src/app/pages/ingreso-egreso/core/store/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: Usuario | null = null;

  public readonly user$ = this.auth.authState.pipe(
    switchMap((fbUser) => {
      if (!fbUser) {
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());

        return of(null);
      }

      return this.db
        .object(`usuarios/${fbUser.uid}`)
        .valueChanges()
        .pipe(
          map((result: any) => {
            const [key] = Object.keys(result);
            return result[key];
          }),
          tap((userInfo) => {
            this._user = userInfo;
            this.store.dispatch(authActions.setUser({ user: userInfo }));
          })
        );
    })
  );

  get isAuth() {
    return this.auth.authState.pipe(map(Boolean));
  }

  get fbUser$() {
    return this.auth.authState.pipe(filter(Boolean));
  }

  get uid() {
    return this._user?.uid;
  }

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {}

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
