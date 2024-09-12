import {Component, Input} from '@angular/core';
import {Square} from "../../models/square";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input() oSquare!: Square;
  @Input() onClickSquare!: (nID: number) => void;

  getsSquareClassName = (sState: string) => {
    let sSquareClassName_Return = '';
    if (sState === 'user') {
      sSquareClassName_Return = 'user'
    }else if (sState === 'computer') {
      sSquareClassName_Return = 'computer'
    }else if (sState === 'progress') {
      sSquareClassName_Return = 'progress';
    }else if (sState === 'default') {
      sSquareClassName_Return = 'default';
    }

    return sSquareClassName_Return;
  }
}
