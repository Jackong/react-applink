/**
 * Created by daisy on 15/6/16.
 */
var React = require('react');
var MobileDetect = require('mobile-detect');
var md = new MobileDetect(window.navigator.userAgent);

var AppLink = React.createClass({
    getInitialState() {
        return {link: null, iframe: false};
    },
    clicked: false,
    propTypes: {
        href: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.shape({
                iOS: React.PropTypes.string,
                android: React.PropTypes.string,
                other: React.PropTypes.string
            })
        ]),
        link: React.PropTypes.string
    },
    getUrl() {
        if (typeof this.props.href === 'string') {
            return this.props.href;
        }
        if (md.is('AndroidOS')) {
            return this.props.href.android;
        }
        if (md.is('iOS')) {
            return this.props.href.iOS;
        }
        return this.props.href.other;
    },
    clickEvent: function () {
        var clickEvt = window.CustomEvent ? new window.CustomEvent('click', {canBubble: false, cancelable: true}) : document.createEvent('Event');
        clickEvt.initEvent && clickEvt.initEvent('click', false, true);
        return clickEvt;
    },
    onClick() {
        this.callAndroid();
        this.calliOS();
    },
    callAndroid() {
        if (!md.is('AndroidOS')) {
            return;
        }
        this.refs.link.getDOMNode().dispatchEvent(this.clickEvent());
    },
    calliOS() {
        if (!md.is('iOS')) {
            return;
        }
        this.setState({iframe: true});
    },
    componentDidMount() {
        if (!this.props.immediate) {
            return;
        }
        this.callAndroid();
        this.calliOS();
        setTimeout(function () {
            location.href = this.getUrl();
        }.bind(this), 700);
    },
    render() {
        var {href, link, ...props} = this.props;

        var linkElement = (
            <a ref='link' href={link} style={{display: 'none'}}></a>
        );
        var frameElement = null;
        if (this.state.iframe) {
            frameElement = (
                <iframe src={link} style={{display: 'none'}}></iframe>
            );
        }
        href = this.getUrl();
        return (
            <a href={href} {...props} onClick={this.onClick}>
                {this.props.children}
                {frameElement}
                {linkElement}
            </a>

        );
    }
});

module.exports = AppLink;