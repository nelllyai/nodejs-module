import { EventEmitter } from 'node:events';

// №2
// Создайте программу, которая выводит сообщения.
// Пользователи смогут отправлять сообщения
// с помощью функции sendMessage,
// а функция receiveMessage будет получать и отображать эти сообщения.
// sendMessage принимает два параметра: username и message.

class Messenger extends EventEmitter {
  constructor() {
    super();
  }

  sendMessage(username, message) {
    this.emit('sendMessage', username, message);
  }
}

const messenger = new Messenger();

function receiveMessage(username, message) {
  console.log(`${username}: ${message}`);
}

messenger.on('sendMessage', receiveMessage);

messenger.sendMessage('Katya', 'Всем привет!');
messenger.sendMessage('Katya', 'Я новенькая в этом чате');
messenger.sendMessage('Viktor', 'Утро доброе, какие сегодня планы?');
messenger.sendMessage('Sveta', 'Иду гулять');
messenger.sendMessage('Katya', 'О, можно с тобой? Через полчаса буду в центре');
