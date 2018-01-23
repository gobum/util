//#include ./sys.js

/** -------------------------------------------------------------------------------------------------------------------
 * coding.js
 */

const [dataToBase64, base64ToData, textToBase64, base64ToText] = function () {
  var textEncoder, textDecoder;
  if (ENV_NODE) {
    textEncoder = new (require("util").TextEncoder);
    textDecoder = new (require("util").TextDecoder);
  }
  else {
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
  }
  var str64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var char = textEncoder.encode(str64);
  var code = {};
  for (var i = 0; i < 64; i++)
    code[str64[i]] = i;

  function dataToBase64(data) {
    var data = new Uint8Array(data);
    var bufLen = data.length;
    var pad = 2 - (bufLen + 2) % 3;
    var padLen = (bufLen + pad) * 4 / 3;
    var basLen = (bufLen * 4 + pad) / 3;
    var base = new Uint8Array(new ArrayBuffer(padLen));

    for (var bufIdx = 0, basIdx = 0; bufIdx < bufLen;) {
      var b0 = data[bufIdx++], b1 = data[bufIdx++], b2 = data[bufIdx++];
      base[basIdx++] = char[b0 >>> 2];
      base[basIdx++] = char[((b0 & 3) << 4) + (b1 >>> 4)];
      base[basIdx++] = char[((b1 & 15) << 2) + (b2 >>> 6)];
      base[basIdx++] = char[b2 & 63];
    }
    //   return s;
    base[basLen++] = 61;    // 61: '='
    base[basLen] = 61;
    return textDecoder.decode(base);
  }

  function base64ToData(base) {
    var basLen = base.length;
    for (var bufLen = base.length; base[bufLen - 1] === '='; bufLen--);
    var data = new Uint8Array(bufLen * 3 / 4);
    for (var basIdx = 0, bufIdx = 0; basIdx < basLen;) {
      var b0 = code[base[basIdx++]], b1 = code[base[basIdx++]], b2 = code[base[basIdx++]], b3 = code[base[basIdx++]];
      data[bufIdx++] = b0 << 2 | b1 >> 4;
      data[bufIdx++] = b1 << 4 | b2 >> 2;
      data[bufIdx++] = b2 << 6 | b3;
    }
    return data.buffer;
  }

  function textToBase64(text) {
    return dataToBase64(textEncoder.encode(text));
  }

  function base64ToText(base) {
    return textDecoder.decode(base64ToData(base));
  }

  return [dataToBase64, base64ToData, textToBase64, base64ToText];
}();

function dataUrlToText(url) {
  url = url.slice(url.indexOf(',') + 1);
  return base64ToText(url);
}

function textToDataUrl(text, mediatype) {
  mediatype = 'data:' + (mediatype || 'text/plain') + ';base64,';
  return mediatype + textToBase64(text);
}

function dataUrlToData(url) {
  url = url.slice(url.indexOf(',') + 1);
  return base64ToData(url);
}

function dataToDataUrl(data, mediatype) {
  mediatype = 'data:' + (mediatype || 'text/plain') + ';base64,';
  return mediatype + dataToBase64(data);
}

