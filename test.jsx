/**
 * Created by daisy on 15/6/17.
 */
var React = require('react');
const WEB = 'http://www.example.com';
const LINK = 'example:///users/1001';
const DOWNLOAD = {
    android: 'http://app.qq.com/#id=detail&appid=1101116004',
    iOS: 'https://itunes.apple.com/cn/app/xxx?l=en&mt=8',
    other: WEB
};
var AppLink = require('./lib/applink');
React.render((
    <div>
        <AppLink href={DOWNLOAD} link={LINK} immediate={false}>
            DOWNLOAD
        </AppLink>
    </div>
), document.body);