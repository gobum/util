/** -------------------------------------------------------------------------------------------------------------------
 * func.js
 *  函数式编程支持
 */

/**
 * 调用方法
 * call(m, me, 1, 2) 相当于 me.m(1, 2)
 * @param {function} method 
 * @param {*} args 
 */
function call(method, ...args) {
  return method.call(...args);
}

/**
 * 应用方法
 * apply(m, me, args) 相当于 me.m(...args)
 * @param {function} method
 * @param {*} args
 */
function apply(method, ...args) {
  return method.apply(...args);
}

/**
 * 创建绑定前置参数的函数
 * 若 ff = func(f, 1) 则 ff(2) 相当于 f(1, 2)
 * @param {function} func
 * @param {*} fixes 
 * @returns {function} 
 */
function func(func, ...fixes) {
  return function () {
    return func(...fixes, ...arguments);
  }
}

/**
 * 创建绑定后置参数的函数
 * 若 ff = func(f, 2) 则 ff(1) 相当于 f(1, 2)
 * @param {function} func
 * @param {*} fixes 
 * @returns {function} 
 */
function funcs(func, ...fixes) {
  return function () {
    return func(...arguments, ...fixes);
  }
}

/**
 * 包装方法为绑定前置参数的方法
 * 若 fm = fixup(m, 1) 则 me.fm(2) 相当于 me.m(1, 2)
 * @param {function} method
 * @param {*} fixes 
 * @returns {function} 
 */
function fixup(method, ...fixes) {
  return fixes.length
    ? function () {
      return method.call(this, ...fixes, ...arguments);
    }
    : method;
}

/**
 * 包装方法为绑定后置参数的方法
 * 若 fm = fixup(m, 2) 则 me.fm(1) 相当于 me.m(1, 2)
 * @param {function} method
 * @param {*} fixes 
 * @returns {function} 
 */
function fixups(method, ...fixes) {
  return fixes.length
    ? function () {
      return method.call(this, ...arguments, ...fixes);
    }
    : method;
}

/**
 * 包装方法为调用函数（可绑定前置参数）
 * 若 f = warp(m, 1) 则 f(me, 2) 相当于 me.m(1, 2)
 * @param {function} method
 * @param {*} fixes 
 * @returns {function} 
 */
function wrap(method, ...fixes) {
  return fixes.length
    ? function (me, ...args) {
      return method.call(me, ...fixes, ...args);
    }
    : function () {
      return method.call(...arguments);
    }
}

/**
 * 包装方法为调用函数（可绑定后置参数）
 * 若 f = warps(m, 2) 则 f(me, 1) 相当于 me.m(1, 2)
 * @param {function} method
 * @param {*} fixes 
 * @returns {function} 
 */
function wraps(method, ...fixes) {
  return fixes.length
    ? function (me, ...args) {
      return method.call(me, ...args, ...fixes);
    }
    : function () {
      return method.call(...arguments);
    }
}


/**
 * 绑定方法为调用函数（可绑定前置参数）
 * 若 f = bind(me, 1) 则 f(2) 相当于 me.m(1, 2)
 * @param {function} method 
 * @param {*} me
 * @param {*} fixes
 * @returns {function}
 */
function bind(method, me, ...fixes) {
  return fixes.length
    ? function () {
      return method.call(me, ...fixes, ...arguments);
    }
    : function () {
      return method.apply(me, arguments);
    }
}

/**
 * 绑定方法为调用函数（可绑定后置参数）
 * 若 f = binds(me, 2) 则 f(1) 相当于 me.m(1, 2)
 * @param {function} method
 * @param {*} me
 * @param {*} fixes
 * @returns {function}
 */
function binds(method, me, ...fixes) {
  return fixes.length
    ? function () {
      return method.call(me, ...arguments, ...fixes);
    }
    : function () {
      return method.apply(me, arguments);
    }
}

