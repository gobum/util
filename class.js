//#include ./sys.js

/** -------------------------------------------------------------------------------------------------------------------
 * class.js
 */

/**
 * 创建 ES6 兼容类
 * @param {function} base - 基类
 * @param {function} props - 类的属性定义
 * @returns {function}
 */
function Class(base, props, statics) {
  "use strict";     // 防止所有 type 的默认 this 为 global
  var prototype = base && base.prototype || null;
  setPrototype(props, prototype);   // 确保方法的 super 正确

  if (prototype)
    base = prototype.constructor;   // 跳过伪类

  prototype = hasOwnProperty(props, "constructor")
    ? props.constructor
    : prototype && prototype.constructor;

  var type;
  if (isSyncFunction(prototype)) {
    if (!hasOwnProperty(prototype, "prototype") || hasOwnProperty(prototype, "arguments")) {
      type = function () {
        var me = this || create(type.prototype), newme;
        newme = prototype.apply(me, arguments) || me;
        if (newme !== me)
          setPrototype(newme, getPrototype(me));
        return newme;
      }
    }
    else { // 构造函数是类
      type = function () {
        return setPrototype(new prototype(...arguments), this && getPrototype(this) || type.prototype);
      }
    }
  }
  // V8 有 BUG：
  // else if (isAsyncFunction(prototype)) {
  //   type = async function() {
  //     var me = this || create(type.prototype), newme;
  //     newme = (await prototype.apply(me, arguments)) || me;
  //     if (newme !== me)
  //       setPrototype(newme, getPrototype(me));
  //     return newme;
  //   }
  // }
  else {
    type = function () {
      return this || create(type.prototype);
    }
  }

  type.prototype = props;

  props.constructor = type;    // 确保 instanceof 正确

  if (base)
    setPrototype(type, base);   // 确保静态方法继承关系正确

  if (statics)
    define(type, statics);      // 确保静态方法 super 正确

  return type;
}

