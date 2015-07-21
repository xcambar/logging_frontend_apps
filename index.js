import StackTrace from 'stacktrace-js';
import { config, log } from './lib/request';

// The appID indicates the name of the app being logged and
// as a side effect, whether the logger has been loaded
let _appId = null;


//Replaces window.onerror with ours if needed
function catchErrors (current) {
  // The actual function that will be called
  function _onerror (error) {
    let p, message;
    if (! (error instanceof Error)) {
      p = StackTrace.get();
      message = error;
    } else {
      p = StackTrace.fromError(error);
      message = error.message;
    }
    p.then(function (err) {
      log({
        application: _appId,
        severity: 'ERR',
        message: message,
        stack: err,
        date: new Date()
      });
      if (current && current.constructor === Function) {
        return current(error);
      }
    }, function (err) {
      console.error(err);
    });
  }
  return _onerror;
}

// The init function
// appId is a String, unique per application
// opts is an object containing a 'location' key that points to the logging service
window.peopleLogger = function (appId, opts) {
  if (_appId) { return; }
  _appId = appId;
  config(opts);
  window.onerror = catchErrors(window.onerror);
  return log;
};
