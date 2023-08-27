import { EventEmitter } from 'node:events';
import fs from 'node:fs/promises';

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this._filename = filename; // имя файла лога
    this._maxSize = maxSize; // макс. размер файла (байт)
    this._logQueue = []; // очередь логов
    this._writing = false; // флаг записи
  }

  async log(message) {
    this._logQueue.unshift(message);
    if (!this._writing) {
      this._writing = true;
      await this.writeLog();
    }
  }

  async writeLog() {
    const message = this._logQueue.shift();

    const fileText = await fs.readFile(this._filename, 'utf-8');
    await fs.writeFile(this._filename, message + '\n' + fileText);
    this.emit('messageLoaded', message);
    this.checkFileSize();

    if (this._logQueue.length) {
      this.writeLog();
    } else {
      this._writing = false;
    }
  }

  async getFileSize() {
    try {
      const stats = await fs.stat(this._filename);
      return stats.size;
    } catch {
      return 0;
    }
  }

  async checkFileSize() {
    const fileSize = await this.getFileSize();
    if (fileSize > this._maxSize) {
      this.rotateLog();
    }
  }

  async rotateLog() {
    await fs.copyFile(
      this._filename,
      this._filename.slice(0, this._filename.indexOf('.') + 1) + 'bak',
    );

    await fs.truncate(this._filename, this._maxSize);
  }
}
