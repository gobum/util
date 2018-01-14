//#include ./sys.js

/** -------------------------------------------------------------------------------------------------------------------
 * path.js
 */

/**
 * function pathed(path: string): string
 * 
 * 规范化路径
 * @param {string} path
 * @returns {string} 
 */
const pathed = function () {
  var reSlash = /\/+/;
  return function (path) {
    if (path) {
      var pathed = [], paths = split(path, reSlash), len, end;
      for (var i = 0; i < paths.length; i++) {
        path = paths[i];
        if (path === ".") {
          pathed.length || (pathed[pathed.length] = path);
        }
        else if (path === "..") {
          end = pathed[pathed.length - 1];
          if (end === undefined || end === ".") {
            pathed[0] = path;
          }
          else if (end === "..") {
            pathed[pathed.length] = path;
          }
          else if (end) {
            if (pathed.length === 1) {
              pathed[0] = ".";
            }
            else {
              pathed.length--;
            }
          }
        }
        else if (path) {
          if (pathed[pathed.length - 1] === ".") {
            pathed[pathed.length - 1] = path;
          }
          else {
            pathed[pathed.length] = path;
          }
        }
        else {
          pathed[pathed.length] = path;
        }
      }
      path = pathed.join("/");
    }
    else {
      path = ".";
    }
    return path;
  }
}();

/**
 * function pathof(path: stirng, [base: string]): string
 * 
 * 计算相对路径
 * @type {function}
 */
const pathof = function () {
  //#define URI 1
  //#define PATH 2
  //#define ROOT 3
  //#define REST 4
  var rePath = /^((?:https?|file):\/\/[^/]*|)((\/|)[^?#\n]*)(.*)$/;
  var reBase = /^((?:https?|file):\/\/[^/]*|)((?:[^/?#\n]*\/)*)/;

  return function (path, base) {
    var ms;
    if ((ms = match(path || "", rePath)) && !ms[URI]) {
      if (base && (base = match(base, reBase))) {
        path = ms[PATH];
        if (!ms[ROOT])
          path = base[PATH] + path;
        path = base[URI] + pathed(path) + ms[REST];
      }
      else {
        path = pathed(path);
      }
    }
    return path;
  }

}();

