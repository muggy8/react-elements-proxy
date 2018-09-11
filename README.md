# About
This is a simple library that masks react's React.createElement and makes it easier to use it to create web apps without having to import the entire jsx toolchain for simple web projects

## Usage
If you are using this on the browser, you would be able to do the following
```html
    <div id="app"><div>
    <script src="/path/to/react.js"></script>
    <script src="/path/to/react-dom.js"></script>
    <script src="/path/to/REP.js"></script>
```
```javascript
var customView = REP.customElement({className: "my-element"}, [
    REP.customLi("list 1"),
    REP.customLi("list 2"),
    REP.customLi("list 3"),
])
ReactDOM.render(customView, document.getElementById('app'))
```
