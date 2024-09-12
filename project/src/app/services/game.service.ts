import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  oBehaviorSubject_GameState = new BehaviorSubject<string>('off');
  private oIntervalSubscription: Subscription | null = null;

  private nStartTime: number = 0;
  private nTimePerSquare: number = 1000;  // Время на квадрат в миллисекундах (моковое, позже пересечивается в случае изменения)
  private nRemainingTime: BehaviorSubject<number> = new BehaviorSubject<number>(0);  // Оставшееся время в миллисекундах
  private countdownSubscription: Subscription | null = null;

  constructor() {}

  onSetGameState = (sState: string, triggerRandomSquare: () => void) => {
    this.oBehaviorSubject_GameState.next(sState);
    if (sState === 'on') {
      this.startGameLoop(triggerRandomSquare);
    } else {
      this.stopGameLoop();
    }
  }

  onSubscribeToGameState = () => {
    return this.oBehaviorSubject_GameState;
  }

  private startGameLoop = (triggerRandomSquare: () => void) => {
    this.oIntervalSubscription = interval(1000).subscribe(() => {
      triggerRandomSquare();
    });
  }

  private stopGameLoop = () => {
    if (this.oIntervalSubscription) {
      this.oIntervalSubscription.unsubscribe();
    }
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  setSquareTime = (time: number) => {
    this.nTimePerSquare = time;
  }

  // Начало отсчета
  startSquareTimer = () => {
    this.nStartTime = Date.now();
    this.startCountdown();
  }

  // Плавный отсчет оставшегося времени
  private startCountdown = () => {
    const intervalMs = 1;
    const duration = this.nTimePerSquare;

    this.countdownSubscription = interval(intervalMs)
      .pipe(
        map(() => Date.now() - this.nStartTime),
        takeWhile(elapsed => elapsed <= duration),
        map(elapsed => Math.max(0, duration - elapsed))  // Возвращаем оставшееся время в миллисекундах
      )
      .subscribe(timeLeft => {
        this.nRemainingTime.next(timeLeft);  // Обновляем оставшееся время в миллисекундах
      });
  }

  stopCountdown = (forceZero: boolean = false) => {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();  // Останавливаем таймер
    }

    if (forceZero) {
      this.nRemainingTime.next(0);  // Принудительно устанавливаем таймер на 0
    }
  }

  getTimeLeftObservable = () => {
    return this.nRemainingTime.asObservable();  // Возвращаем оставшееся время в миллисекундах
  }
}
