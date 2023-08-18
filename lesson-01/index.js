setImmediate(() => {
  console.log("Был диван,");
});

setTimeout(() => {
  console.log("Выйди вон!");
}, 10);

setImmediate(() => {
  console.log("На диване");
});

process.nextTick(() => {
  console.log("Чемодан,");
});

setTimeout(() => {
  console.log("Кто не верит –");
}, 9);

setImmediate(() => {
  console.log("Ехал слон.");
});

process.nextTick(() => {
  console.log("В чемодане");
});

console.log("Плыл по морю");
