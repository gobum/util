/** -------------------------------------------------------------------------------------------------------------------
 * sysfs.js
 */

const SysFS = function(){
  var fs = require("fs");
  
  return class {
    getText(path) {
      return fs.readFileSync(path, "utf-8");
    }
    
    readText(path) {
      return readFile(path, "utf-8");
    }

    readData(path) {
      return readFile(path);
    }
  }

  function readFile(...args) {
    return new Promise(function(resolve, reject){
      fs.readFile(...args, function(err, data){
        err ? reject(err) : resolve(data);
      });
    });
  }

}();