import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'finanza-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card card-statistics">
      <div class="card-body">
        <div class="clearfix">
          <div class="float-left">
            <ng-content select="i.icon-lg"></ng-content>
          </div>
          <div class="float-right">
            <ng-content select="p"></ng-content>

            <div class="fluid-container">
              <h3 class="font-weight-medium text-right mb-0">{{ amount }}</h3>
            </div>
          </div>
        </div>

        <p class="text-muted mt-3 mb-0">
          <i class="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i>
          <span> {{ lowerPercentage }} lower growth</span>
        </p>
      </div>
    </div>
  `,
})
export class FinanzaCardComponent {
  @Input({ required: true })
  public amount!: string;

  @Input({ required: true })
  public lowerPercentage!: string;
}
