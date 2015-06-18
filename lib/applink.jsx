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
        var clickEvt = window.CustomEvent ? new window.CustomEvent('click', {canBubble: true,cancelable: true}) : document.createEvent('Event');
        clickEvt.initEvent && clickEvt.initEvent('click', true, true);
        return clickEvt;
    },
    onClick() {
        md.is('AndroidOS') && this.refs.link.getDOMNode().dispatchEvent(this.clickEvent());
        md.is('iOS') && this.setState({iframe: true});
    },
    componentDidMount() {
        if (!this.props.immediate) {
            return;
        }
        this.onClick();
        location.href = this.getUrl();
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