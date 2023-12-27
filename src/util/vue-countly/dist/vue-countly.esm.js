/*! vue-countly v2.0.0 | (c) 2019-present Chen Fengyuan | MIT */
function VueCountly(app, Countly, options) {
    app.config.globalProperties.$Countly = Countly;
    Countly.init(options);
}

export { VueCountly as default };
