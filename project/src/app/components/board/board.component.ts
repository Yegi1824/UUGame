import { Component, Input, OnInit } from '@angular/core';
import { Square } from "../../models/square";
import { GameService } from '../../services/game.service';
import { ScoreService } from '../../services/score.service';
import {ResultModalComponent} from "../result-modal/result-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  @Input() nTimePerSquare!: number;

  aSquares: Square[] = [];
  private nSelectedSquareID: number | null = null;
  private nTimeoutHandle: any;
  private oPlayedSquares: Set<number> = new Set();

  private nStartClickTime: number = 0;
  private aClickTimes: number[] = [];
  public nAverageSpeed: number = 0;
  public bShowBackdrop: boolean = false;

  constructor(private oGameService: GameService,
              private oScoreService: ScoreService,
              private oMatDialog: MatDialog
  ) { }

  ngOnInit() {
    this.onResetGame();
    this.oGameService.onSubscribeToGameState().subscribe(sState => {
      if (sState === 'on') {
        this.oGameService.setSquareTime(this.nTimePerSquare);  // Устанавливаем время на квадрат
        this.onHighlightRandomSquare();
      }
    });
  }

  onResetGame = () => {
    this.aSquares = [];
    this.oPlayedSquares.clear();
    const nTotalSquares = 10 * 10;

    for (let i = 1; i <= nTotalSquares; i++) {
      this.aSquares.push({
        nID: i,
        sState: 'default'
      });
    }

    this.oScoreService.onResetScore();
  }

  onClickSquare = (nID: number) => {
    if (this.nSelectedSquareID === nID && this.aSquares[nID - 1].sState === 'progress') {
      const nClickDuration = Date.now() - this.nStartClickTime;

      // Добавляем время нажатия в массив
      this.aClickTimes.push(nClickDuration);

      // Обновляем среднюю скорость
      this.onUpdateAverageSpeed();

      this.aSquares[nID - 1].sState = 'user';
      this.oPlayedSquares.add(nID);
      this.oGameService.stopCountdown();  // Останавливаем таймер при нажатии
      this.onClearSelectedSquare();
      this.oScoreService.onAddPoint('user');
      if (!this.onCheckForEndGame()) {
        setTimeout(() => this.onHighlightRandomSquare(), 1000);
      }
    }
  }

  onUpdateAverageSpeed = () => {
    const nTotalClickTime = this.aClickTimes.reduce((nSum, nTime) => nSum + nTime, 0);
    this.nAverageSpeed = Number((nTotalClickTime / this.aClickTimes.length).toFixed(2));
  }

  onHighlightRandomSquare = () => {
    if (this.onCheckForEndGame()) return;

    if (this.nSelectedSquareID !== null && this.aSquares[this.nSelectedSquareID - 1].sState === 'progress') {
      this.aSquares[this.nSelectedSquareID - 1].sState = 'computer';
      this.oPlayedSquares.add(this.nSelectedSquareID);
      this.oScoreService.onAddPoint('computer');
      this.oGameService.stopCountdown(true);  // Принудительно останавливаем таймер и устанавливаем 0
      if (this.onCheckForEndGame()) return;
    }

    let newSquareId: number;
    do {
      newSquareId = Math.floor(Math.random() * 100) + 1;
    } while (this.oPlayedSquares.has(newSquareId));

    this.nSelectedSquareID = newSquareId;
    this.aSquares[this.nSelectedSquareID - 1].sState = 'progress';

    this.nStartClickTime = Date.now();

    this.oGameService.startSquareTimer();
    this.startSquareTimer();
  }

  startSquareTimer = () => {
    this.nTimeoutHandle = setTimeout(() => {
      if (this.aSquares[this.nSelectedSquareID! - 1].sState === 'progress') {
        this.aSquares[this.nSelectedSquareID! - 1].sState = 'computer';
        this.oPlayedSquares.add(this.nSelectedSquareID!);
        this.oScoreService.onAddPoint('computer');
        this.oGameService.stopCountdown(true);  // Принудительно останавливаем таймер и устанавливаем 0
        this.onClearSelectedSquare();
        if (!this.onCheckForEndGame()) {
          setTimeout(() => this.onHighlightRandomSquare(), 1000);
        }
      }
    }, this.nTimePerSquare);
  }

  onClearSelectedSquare = () => {
    this.nSelectedSquareID = null;
    clearTimeout(this.nTimeoutHandle);
  }

  onCheckForEndGame = (): boolean => {
    if (this.oScoreService.oBehaviorSubject_UserScore.value >= 10) {
      this.endGame('user');
      return true;
    } else if (this.oScoreService.oBehaviorSubject_ComputerScore.value >= 10) {
      this.endGame('computer');
      return true;
    }
    return false;
  }

  onClickBackdrop = () => {
    this.bShowBackdrop = false;
    this.oMatDialog.closeAll();
  }

  endGame = (winner: string) => {
    let oResult = {
      bWin: winner === 'user',
      nAverageSpeed: this.nAverageSpeed
    }

    this.bShowBackdrop = true;

    // Открываем модальное окно с результатом игры
    this.oMatDialog.open(ResultModalComponent, {
      width: '300px',
      data: oResult,
      position: { top: '40vh', left: 'calc(50vw - 150px)' },
    }).afterClosed().subscribe(result => {

      this.bShowBackdrop = false;
      this.oGameService.onSetGameState('off', this.onHighlightRandomSquare);
      this.onResetGame();
    });
  }
}
