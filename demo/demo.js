Array.prototype.slice.call(document.querySelectorAll('.error')).forEach(function (e) {
  e.addEventListener('click', function () {
    throw new Error('Ouch');
  })
});
