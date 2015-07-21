Array.prototype.slice.call(document.querySelectorAll('.error')).forEach(function (e) {
  e.addEventListener('click', function () {
    throw new Error('Ouch');
  })
});

//Initializing the logger
var logger = peopleLogger('test', {location: '//localhost:8088/log' });
console.log("Here's your logger:", logger);
