import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-atama',
  templateUrl: './atama.component.html',
  styleUrls: ['./atama.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AtamaComponent {
  @Output('ngModelChange') update = new EventEmitter();

  constructor() {}

  SetValue(value: number) {
    this.update.emit(value);
  }
}
