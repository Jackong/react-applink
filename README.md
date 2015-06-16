# react-applink
### app link for react

## cases:
* For installed device, it will call your APP.
* For uninstall device, it will directly jump to your page.

## usage:
* install:
> npm i --save react-applink

* code:

```js
const WEB = 'http://www.example.com';
const LINK = 'example://users/1001';
const DOWNLOAD = {
    android: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.exmaple.xxx',
    iOS: 'https://itunes.apple.com/cn/app/xxx?l=en&mt=8',
    other: WEB
};
var AppLink = require('react-applink');
React.render((
    <div>
        <AppLink href={WEB} link={LINK} >
            WEB
        </AppLink>
        <br/>
        <AppLink href={DOWNLOAD}link={LINK} >
            DOWNLOAD
        </AppLink>
    </div>
), document.body);
```
