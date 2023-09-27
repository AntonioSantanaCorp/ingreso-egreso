import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/pages/auth/core/services/auth.service';
import { IngresoEgresoType } from '../types/main.type';
import { defer, map, shareReplay, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setItems } from '../store/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/main.model';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoHttpService {
  ingresoEgresoList$ = this.auth.fbUser$.pipe(
    switchMap(({ uid }) =>
      this.db
        .list(`ingresos-egresos/${uid}`)
        .valueChanges([], { idField: '$key' })
        .pipe(
          map((items) =>
            items.map(
              ({ $key, ...item }) =>
                ({ ...item, uid: $key } as IngresoEgresoType)
            )
          ),
          tap((items) => {
            this.store.dispatch(setItems({ items }));
          })
        )
    )
  );

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoType) {
    const uid = this.auth?.uid;
    return this.db.list(`ingresos-egresos/${uid}`).push({ ...ingresoEgreso });
  }

  actualizarIngresoEgreso({
    descripcion,
    monto,
    tipo,
    uid,
  }: IngresoEgresoType) {
    return this.db
      .object(`ingresos-egresos/${this.auth.uid}/${uid}`)
      .update({ descripcion, monto, tipo });
  }

  borrarIngresoEgreso(uidItem: string) {
    return this.db
      .object(`ingresos-egresos/${this.auth.uid}/${uidItem}`)
      .remove();
  }

  obtenerIngresoEgreso(uidItem: string) {
    return this.auth.user$.pipe(
      switchMap(({ uid }) =>
        this.db
          .object<IngresoEgresoType>(`ingresos-egresos/${uid}/${uidItem}`)
          .valueChanges()
          .pipe(map((result) => ({ ...result, uid: uidItem } as IngresoEgresoType)))
      )
    );
  }
}
