import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedSidepanelComponent } from './fixed-sidepanel/fixed-sidepanel.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [FixedSidepanelComponent, SpinnerComponent, ReversePipe],
  imports: [CommonModule],
  exports: [FixedSidepanelComponent, SpinnerComponent, ReversePipe]
})
export class SharedModule {}
