import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { setIngresoEgresoForm } from '../../core/utils/ingreso-form.util';
import { IngresoEgresoType } from '../../core/types/main.type';
import {
  IngresoEgreso,
  ingresoEgresoDefault,
} from '../../core/models/main.model';

@Component({
  selector: 'ingreso-egreso-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="ingresoForm">
      <div class="form-group">
        <label>Descripción</label>
        <input
          type="text"
          class="form-control"
          placeholder="Descripción"
          name="descripcion"
          formControlName="descripcion"
        />
      </div>

      <div class="form-group">
        <label>Monto</label>
        <input
          type="number"
          class="form-control"
          placeholder="Monto"
          name="monto"
          formControlName="monto"
        />
        <p>Debe de ser un monto positivo</p>
      </div>

      <div class="form-group">
        <label>
          Tipo seleccionado:
          {{ ingresoForm.get('tipo')?.value | titlecase }}
        </label>
        <br />
        <type-ingreso-egreso formControlName="tipo"></type-ingreso-egreso>
      </div>

      <hr />
      <button
        type="button"
        class="btn btn-success mr-2"
        *ngIf="!isEdit"
        (click)="onCreate()"
        [disabled]="ingresoForm.invalid || isLoading"
      >
        <i class="fa fa-save" *ngIf="!isLoading"></i>
        <i class="fa fa-spin fa-sync" *ngIf="isLoading"></i>
        {{ isLoading ? 'Guardando' : 'Agregar' }}
      </button>

      <button
        type="button"
        class="btn btn-success mr-2"
        *ngIf="isEdit"
        (click)="onUpdate()"
        [disabled]="ingresoForm.invalid || isLoading"
      >
        <i class="fa fa-save" *ngIf="!isLoading"></i>
        <i class="fa fa-spin fa-sync" *ngIf="isLoading"></i>
        {{ isLoading ? 'Guardando' : 'Guardar Cambios' }}
      </button>

      <button
        type="button"
        class="btn btn-light mr-2"
        *ngIf="isEdit"
        (click)="reset()"
      >
        Reset
      </button>

      <a class="btn btn-light" routerLink="/detalle"> Cancelar </a>
    </form>
  `,
})
export class IngresoEgresoFormComponent implements OnChanges {
  protected ingresoForm = setIngresoEgresoForm();

  @Input({
    transform: (value: IngresoEgresoType | null) =>
      value ?? ingresoEgresoDefault,
  })
  public ingresoEgreso!: IngresoEgresoType;

  @Input()
  public isLoading: boolean | null = false;

  @Input()
  public isEdit: boolean | null = false;

  @Output()
  public crear = new EventEmitter<IngresoEgresoType>();

  @Output()
  public guardarCambios = new EventEmitter<IngresoEgresoType>();

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(_: SimpleChanges): void {
    this.setInitFormValue();
  }

  protected onCreate() {
    if (this.ingresoForm.invalid) return;

    this.crear.emit(this.ingresoForm.value as IngresoEgresoType);
  }

  protected onUpdate() {
    if (this.ingresoForm.invalid) return;

    this.guardarCambios.emit({
      ...this.ingresoEgreso,
      ...this.ingresoForm.value,
    } as IngresoEgresoType);
  }

  public reset(ingresoEgreso?: IngresoEgresoType) {
    this.ingresoForm.reset({ ...ingresoEgreso } ?? this.ingresoEgreso);
    // this.changeDetector.markForCheck();
  }

  private setInitFormValue() {
    if (!this.ingresoEgreso) return;

    this.ingresoForm.patchValue(this.ingresoEgreso);
  }
}
