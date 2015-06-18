/**
 * Created by daisy on 15/6/17.
 */
var React = require('react');
const WEB = 'http://www.example.com';
const LINK = 'example:///users/1001';
const DOWNLOAD = {
    android: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.example.xxx',
    iOS: 'https://itunes.apple.com/cn/app/xxx?l=en&mt=8',
    other: WEB
};
var AppLink = require('./lib/applink');
React.render((
    <div>
        <AppLink href={WEB} link={LINK}>
            WEB
        </AppLink>
        <br/>
        <AppLink href={DOWNLOAD}link={LINK} >
            DOWNLOAD
        </AppLink>
    </div>
), document.body);