import { Component, OnInit } from '@angular/core';
import { ScoreService } from "./services/score.service";
import { GameService } from "./services/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  nUserScore: number = 0;
  nComputerScore: number = 0;
  sGameState: string = 'off';
  nTimePerSquare: number = 1000;
  nTimeLeft: number = 0;  // Переменная для отображения оставшегося времени в миллисекундах

  constructor(private oScoreService: ScoreService, private oGameService: GameService) {}

  ngOnInit() {
    this.onSubscribeToLiveVariables();
  }

  onSubscribeToLiveVariables = () => {
    this.oScoreService.onSubscribeToComputerScore().subscribe((nComputerScore: number) => {
      this.nComputerScore = nComputerScore;
    });

    this.oScoreService.onSubscribeToUserScore().subscribe((nUserScore: number) => {
      this.nUserScore = nUserScore;
    });

    this.oGameService.onSubscribeToGameState().subscribe((sState) => {
      this.sGameState = sState;
    });

    // Подписываемся на обновление оставшегося времени
    this.oGameService.getTimeLeftObservable().subscribe((nTimeLeft: number) => {
      this.nTimeLeft = nTimeLeft;  // Оставляем значение времени в миллисекундах
    });
  }

  onStartGame = () => {
    if (this.sGameState === 'off') {
      this.oGameService.onSetGameState('on', () => {});
    }
  }

  getTimeLeft = () => {
    return this.nTimeLeft;  // Возвращаем текущее оставшееся время в миллисекундах
  }
}
