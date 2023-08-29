// task 01

const textToBuffer = (text, encoding) => Buffer.from(text, encoding);
const bufferToText = (buffer, encoding) => buffer.toString(encoding);

const text1 = 'Привет, мир!';

const utf8Buffer = textToBuffer(text1, 'utf-8');
console.log(`"${text1}" -> buffer (utf-8):\t`, utf8Buffer);

const decodedUtf8Text = bufferToText(utf8Buffer, 'utf-8');
console.log('buffer (utf-8) -> text:\t\t\t', decodedUtf8Text);

console.log();

const text2 = 'test';

const base64Buffer = textToBuffer(text2, 'base64');
console.log(`"${text2}" -> buffer (base64):\t\t`, base64Buffer);

const decodedBase64Text = bufferToText(base64Buffer, 'base64');
console.log('buffer (base64) -> text:\t\t', decodedBase64Text);
