//This is not intresting, it's just a bunch of click handlers for the demo
Array.prototype.slice.call(document.querySelectorAll('.error')).forEach(function (e) {
  e.addEventListener('click', function () {
    throw new Error('Ouch');
  })
});

//
// The code after is interesting!!
//
//
//This line shows how to initialize the logger
var logger = peopleLogger('test', {location: '//localhost:8088/log' });
console.info('The logger has been automatically registered to handle uncaught errors');

