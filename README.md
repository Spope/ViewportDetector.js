<p align="center"><a href="https://spope.github.io/ViewportDetector.js/" target="_blank"><img width="100" height="100" src="https://spope.github.io/ViewportDetector.js/icon.png"></a></p>

# ViewportDetector.js

Javascript viewport element visibility library

ViewportDetector is a **lightweight** (1kb Gzipped) dependancy free library to detect if an element is shown in the viewport (or another container) or not. It use **requestAnimationFrame** API to be without any impact on the performance.

## Installation

Just include the minified version of ViewportDetector.js on your website :


```html
<script src="viewportdetector/build/viewportdetector.min.js"></script>
```

## Usage

To use viewport detector, create a new instance :

```javascript
var detector = new ViewportDetector({
    selector: '.element',
    callback: myCallback
});
```
## Parameters

Here is the list of available parameters :

Name | Default value | Description
-----|---------------|------------
callback|Null|Callback to execute on visibility change. Callback receive **2 parameters**, the DOMElement and the Visibility (boolean). **Required**
selector|Null|Element selector. **Required**
opts.marge|Null|Marge to expand or reduce element detection size.
opts.container|window|Container selector within detection should happen.

## API

Here is the list of available APIs :

Name|Description
----|-----------
add(selector, callback, opts)|Add en element to detect into a instance of ViewportDetector.

## Example

[See website](https://spope.github.io/ViewportDetector.js/)

## License

MIT

Made by [Spope](https://spope.fr/)
