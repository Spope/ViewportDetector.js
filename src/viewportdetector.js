var ViewportDetector = function(selector, callback, opts) {

    this._listeners = {};

    this.init(selector, callback, opts);

    return this;
};

ViewportDetector.prototype.init = function(selector, callback, opts) {
    if (Array.isArray(selector)) {
        for (var i in selector) {
            this.add(selector[i].selector, selector[i].callback, selector[i].opts);
        }
    } else {
        this.add(selector, callback, opts);
    }

    this.bind();
}

ViewportDetector.prototype.add = function(selector, callback, opts) {
    if (callback == undefined) {
        throw new Error('Missing callback for ' + selector + ' element');
    }
    if (!this._listeners[selector]) {
        this._listeners[selector] = {
            el: null,
            opts: {},
            callbacks: []
        };
    }

    this._listeners[selector].element = document.querySelector(selector);
    this._listeners[selector].opts = opts || {};
    if (this._listeners[selector].opts.container) {
        this._listeners[selector].opts.container = document.querySelector(this._listeners[selector].opts.container);
    }
    this._listeners[selector].callbacks.push(callback);
    this._listeners[selector].visible = false;

    if (this._listeners[selector].element == undefined) {
        throw new Error('Element ' + selector + ' not found');
    }
}

ViewportDetector.prototype.bind = function() {
    window.addEventListener('DOMContentLoaded', this.handler.bind(this), false);
    window.addEventListener('load', this.handler.bind(this), false);
    window.addEventListener('scroll', this.handler.bind(this), false);
    window.addEventListener('resize', this.handler.bind(this), false);

    for (var i in this._listeners) {
        if (this._listeners[i].opts.container) {
            this._listeners[i].opts.container.addEventListener('DOMContentLoaded', this.handler.bind(this), false);
            this._listeners[i].opts.container.addEventListener('load', this.handler.bind(this), false);
            this._listeners[i].opts.container.addEventListener('scroll', this.handler.bind(this), false);
            this._listeners[i].opts.container.addEventListener('resize', this.handler.bind(this), false);
        }
    }
}

ViewportDetector.prototype.handler = function() {
    window.requestAnimationFrame(this.detectAll.bind(this));
}

ViewportDetector.prototype.detectAll = function() {
    for (var i in this._listeners) {
        this.onVisibilityChange(this._listeners[i]);
    }
}

ViewportDetector.prototype.onVisibilityChange = function(listener) {

    var visible = this.isElementInViewport(listener.element, listener.opts);
    if (visible != listener.visible) {
        listener.visible = visible;
        for (var i in listener.callbacks) {
            var callback = listener.callbacks[i];
            if (typeof callback == 'function') {
                callback(listener.element, visible);
            }
        }
    }
}

ViewportDetector.prototype.isElementInViewport = function(el, opts) {
    var rect = el.getBoundingClientRect();
    var marge = opts.marge || 0;
    var container = opts.container;

    if (opts.container) {
        var containerRect = container.getBoundingClientRect();
        return (
            rect.top    <= (0 + containerRect.top + containerRect.height + marge) &&
            rect.bottom >= (0 + containerRect.top - marge)
        );
    } else {
        return (
            rect.top    <= (0 + window.innerHeight + marge) &&
            rect.bottom >= (0 - marge)
        );
    }
}
