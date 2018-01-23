/** -------------------------------------------------------------------------------------------------------------------
 * webfs.js
 */

const WebFS = function(){

  return class {
    getText(path) {
      var req = new XMLHttpRequest;
      req.open("GET", path, false);
      req.send();
      if (req.status / 100 ^ 2)
        throw WebFS.error(req);
      return req.response;
    }
  
    readText(path) {
      return readFile(path, "");
    }
  
    readData(path) {
      return readFile(path, "arraybuffer");
    }
  }

  function readFile(path, type) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest;
      req.responseType = type;
      req.open("GET", path);
      req.onload = function () {
        if (req.status / 100 ^ 2) {
          reject(error());
        }
        else {
          resolve(req.response);
        }
      }
      req.onerror = req.onabort = () => {
        reject(error());
      }
 
      req.send();
    });

    function error() {
      return Error("GET " + req.responseURL + " " + req.status + " (" + req.statusText + ")");
    }
  }

}();
