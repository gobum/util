//#include ./func.js

/** -------------------------------------------------------------------------------------------------------------------
 * sys.js
 */

/* Object：-------------------------------------------------------------------------------------- */

/**
 * 判断目标是否是对象
 * @param {*} any
 * @returns {boolean}
 */
function isObject(any) {
  return any && (typeof any === 'object' || typeof any === 'function');
}

/**
 * 判断目标是否是非函数对象
 * @param {*} any
 * @returns {boolean}
 */
function isObjective(any) {
  return any && (typeof any === 'object');
}

/**
 * 创建对象
 * @type {function}
 */
const create = Object.create;

/**
 * 获取对象原型
 * @type {function}
 */
const getPrototype = Object.getPrototypeOf;

/**
 * 设置对象原型
 * @type {function}
 */
const setPrototype = Object.setPrototypeOf;

/**
 * function assign(target, ...sources): target
 * 
 * 赋值对象属性
 * @type {function}
 */
const assign = Object.assign;

/**
 * function defineProperty(obj, prop, descriptor): obj
 * 
 * 定义对象单个属性
 * @type {function}
 */
const defineProperty = Object.defineProperty;

/**
 * function getOwnPropertyDescriptor(obj)
 * 
 * 获取对象单个属性描述
 * @type {function}
 */
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

/**
 * function defineProperties(obj, props): obj
 * 
 * 定义对象多个属性
 * @type {function}
 */
const defineProperties = Object.defineProperties;

/**
 * function getOwnPropertyDescriptors(obj)
 * 
 * 获取对象多个属性描述
 * @type {function}
 */
const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

/**
 * 定义对象属性原型
 * @param {*} obj 
 * @param {*} prototype 
 */
function define(target, props) {
  return defineProperties(target, getOwnPropertyDescriptors(setPrototype(props, getPrototype(target))));
}

const Object_prototype = Object.prototype;

/**
 * function hasOwnProperty(obj, prop): boolean;
 * 
 * 判断自有属性
 * @type {function}
 */
const hasOwnProperty = wrap(Object_prototype.hasOwnProperty);

/**
 * function stringof(any): string;
 * 
 * 获取标记
 * @type {function}
 */
const stringof = wrap(Object_prototype.toString);

/* Functiion: ---------------------------------------------------------------------------------------- */

/**
 * 空函数
 * @type {function}
 */
const nop = Function.prototype;  // 同时也是函数原型

/**
 * 判断对象是否为函数
 * @param {*} any
 * @returns {boolean} 
 */
function isFunction(any) {
  return typeof any === 'function';
}

/**
 * 判断是否为同步函数
 * @param {*} any 
 * @returns {boolean} 
 */
function isSyncFunction(any) {
  return stringof(any) === "[object Function]";
}

/**
 * 判断是否为异步函数
 * @param {*} any 
 * @returns {boolean} 
 */
function isAsyncFunction(any) {
  return stringof(any) === "[object AsyncFunction]";
}

/**
 * 判断是否为生成器函数
 * @param {*} any 
 * @returns {boolean} 
 */
function isGeneratorFunction(any) {
  return stringof(any) === "[object GeneratorFunction]";
}

/* String：-------------------------------------------------------------------------------------- */

/**
 * 判断字符串
 * @param {*} any
 * @returns {boolean} 
 */
function isString(any) {
  return typeof any === 'string';
}

const String_prototype = String.prototype;

/**
 * function indexof(str: string, substr: string): number
 * 
 * 获取字符串中子字符串的位置索引
 * @type {function}
 */
const indexof = wrap(String_prototype.indexOf);

/**
 * function piece(str, begin, [end]): string
 * 
 * 获取字符串部分子字符串
 * @type {function}
 */
const piece = wrap(String_prototype.slice);

/**
 * function split(str, separator, [limit]): Array
 * 
 * 分隔字符串为数组
 * @type {function}
 */
const split = wrap(String_prototype.split);

/**
 * function replace(str, regexp|substr, newSubstr|function)
 * 
 * 替换字符串内容
 * @type {function}
 */
const replace = wrap(String_prototype.replace);

/**
 * function match(str, regexp)
 * 
 * 匹配正则式
 * @type {functiion}
 */
const match = wrap(String_prototype.match);

/* Array：--------------------------------------------------------------------------------------- */

/**
 * function isArray(any): boolean
 * 
 * 判断数组
 * @type {function}
 */
const isArray = Array.isArray;

const Array_prototype = Array.prototype;

/**
 * function seek(array, element, [fromIndex]): number
 * 
 * 获取数组中元素的位置索引
 * @type {function}
 */
const seek = wrap(Array_prototype.indexOf);

/**
 * function join(array, [separator]): string
 * 
 * 将数组中元素连接为字符串
 * @type {function}
 */
const join = wrap(Array_prototype.join);

/**
 * piece(array, begin, [end]): Array
 * 
 * 获取数组元素片段
 * @type {function}
 */
const slice = wrap(Array_prototype.slice);

/**
 * splice(array, start, deleteCount, ...items): Array
 * 
 * 删除和添加数组元素
 * @type {function}
 */
const splice = wrap(Array_prototype.splice);

/**
 * 获取数组（堆栈）顶端元素
 * @param {Array} array
 * @returns {*} 
 */
function peak(array) {
  return array[array.length - 1];
}

/* RegExp：-------------------------------------------------------------------------------------- */

/**
 * 判断正则表达式对象
 * @param {*} any
 * @returns {boolean} 
 */
function isRegExp(any) {
  return any instanceof RegExp;
}

const RegExp_prototype = RegExp.prototype;

/**
 * function test(regexp, str): boolean
 * 
 * 测试匹配字符串
 * @type {function}
 */
const test = wrap(RegExp_prototype.test);

/**
 * function scan(regexp, str): Array|null
 * 
 * 扫描字符串搜索匹配子字符串
 * @type {function}
 */
const scan = wrap(RegExp_prototype.exec);

/* JSON：---------------------------------------------------------------------------------------- */

const stringify = JSON.stringify;
const parse = JSON.parse;
