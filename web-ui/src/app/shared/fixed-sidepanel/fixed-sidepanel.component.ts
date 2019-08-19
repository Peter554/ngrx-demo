import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-fixed-sidepanel',
  templateUrl: './fixed-sidepanel.component.html',
  styleUrls: ['./fixed-sidepanel.component.scss']
})
export class FixedSidepanelComponent {
  @Input()
  @HostBinding('style.width')
  public width: string = '30vw';
}
