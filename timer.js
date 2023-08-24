import { EventEmitter } from 'node:events';

// №1
// Создайте таймер, который будет генерировать событие tick
// и выводить сообщение в консоль.
// Используйте EventEmitter.

class Timer extends EventEmitter {
  constructor(step) {
    super();
    this._step = step; // шаг задержки
    this._summaryDelay = 0; // задержка перед вызовом события
  }

  // при вызове каждого следующего события
  // суммарная задержка увеличивается
  emit(name, ...args) {
    this._summaryDelay += this._step;
    setTimeout(() => {
      super.emit(name, ...args);
    }, this._summaryDelay);
  }
}

const timer = new Timer(500);
timer.addListener('tick', x => {
  console.log('Timer -', x);
});

timer.emit('tick', 1);
timer.emit('tick', 2);
timer.emit('tick', 3);
timer.emit('tick', 4);
timer.emit('tick', 5);
timer.emit('tick', 6);
timer.emit('tick', 7);
timer.emit('tick', 8);
