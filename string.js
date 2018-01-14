//#include ./sys.js

/** -------------------------------------------------------------------------------------------------------------------
 * string.js
 *  字符串功能扩展
 */

/**
 * function format(format:string, ...args:any): string
 * 
 * 格式化文本
 * @param {string} format - 含替换符的模板字符串
 * @param {*} args        - 替换参数列表
 * @returns {string}
 * @type {function}
 */
const format = bind(
  function (_split, format, ...args) {
    this.raw = _split(format);
    return String.raw(this, ...args);
  },
  {},
  wrap(String_prototype.split, /%[sdifoO]/)
);

/**
 * function indent(text, space): string
 * 
 * 缩进文本行
 * @type {function}
 */
const indent = wrap(String_prototype.replace, /^/gm);
