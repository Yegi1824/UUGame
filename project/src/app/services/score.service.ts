import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  oBehaviorSubject_UserScore = new BehaviorSubject<number>(0);
  oBehaviorSubject_ComputerScore = new BehaviorSubject<number>(0);

  constructor() {}

  onResetScore = () => {
    this.oBehaviorSubject_UserScore.next(0);
    this.oBehaviorSubject_ComputerScore.next(0);
  }

  onAddPoint = (sKey_Winner: string, nAmount?: number) => {
    if (sKey_Winner === 'user') {
      let nCurrentScore = this.oBehaviorSubject_UserScore.value;
      let nFinalScore = nCurrentScore + (nAmount ? nAmount : 1);

      this.oBehaviorSubject_UserScore.next(nFinalScore)
    }else if (sKey_Winner === 'computer') {
      let nCurrentScore = this.oBehaviorSubject_ComputerScore.value;
      let nFinalScore = nCurrentScore + (nAmount ? nAmount : 1);

      this.oBehaviorSubject_ComputerScore.next(nFinalScore)
    }
  }

  onSubscribeToUserScore = () => {
    return this.oBehaviorSubject_UserScore;
  }

  onSubscribeToComputerScore = () => {
    return this.oBehaviorSubject_ComputerScore;
  }

}
