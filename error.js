//#include ./string.js

/** -------------------------------------------------------------------------------------------------------------------
 * error.js
 */

const Error = function(){
  return this.Error(format(...arguments));
};

const EvalError = function(){
  return this.EvalError(format(...arguments));
};

const RangeError = function(){
  return this.RangeError(format(...arguments));
};

const ReferenceError = function(){
  return this.ReferenceError(format(...arguments));
};

const SyntaxError = function(){
  return this.SyntaxError(format(...arguments));
};

const TypeError = function(){
  return this.TypeError(format(...arguments));
};

const URIError = function(){
  return this.URIError(format(...arguments));
};
