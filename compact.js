//#include ./sys.js

/** -------------------------------------------------------------------------------------------------------------------
 * compact.js
 *   浏览器兼容处理
 */

if(ENV_AGENT)
  (function(){

    // 兼容 Safari 不支持鼠标事件的 buttons 属性：
    var proto = MouseEvent.prototype;
    if(!hasOwnProperty(proto, 'buttons')){
      this.addEventListener('mousedown', (e)=>{
        proto.buttons = 1 << e.button;
      });
      this.addEventListener("mouseup", ()=>{
        proto.buttons = 0;
      });
    }
  
  })();
