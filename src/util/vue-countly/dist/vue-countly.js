/*! vue-countly v2.0.0 | (c) 2019-present Chen Fengyuan | MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueCountly = factory());
})(this, (function () { 'use strict';

  function VueCountly(app, Countly, options) {
      app.config.globalProperties.$Countly = Countly;
      Countly.init(options);
  }

  return VueCountly;

}));
