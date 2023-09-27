import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'type-ingreso-egreso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeIngresoEgresoComponent),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      class="btn btn-primary btn-block"
      *ngIf="value === 'egreso'"
      (click)="setValue('ingreso')"
    >
      Ingreso
    </button>
    <button
      type="button"
      class="btn btn-warning btn-block"
      *ngIf="value === 'ingreso'"
      (click)="setValue('egreso')"
    >
      Egreso
    </button>
  `,
})
export class TypeIngresoEgresoComponent implements ControlValueAccessor {
  private _onChange: any = () => {};

  private _onTouch: any = () => {};

  protected isDisable = false;

  protected value: 'ingreso' | 'egreso' = 'ingreso';

  protected setValue(value: 'ingreso' | 'egreso') {
    this.value = value;
    this._onChange(value);
    this._onTouch();
    this.changeDetectorRef.markForCheck();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  writeValue(value: any): void {
    this.setValue(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisable = isDisabled;
    this.changeDetectorRef.markForCheck();
  }
}
