var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var YearButton = React.createClass({displayName: "YearButton",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    year: React.PropTypes.number,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      selected: false
    };
  },

  getInitialState: function() {
    return {
      hover: false
    };
  },

  getTheme: function() {
    return this.context.muiTheme.component.datePicker;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      this.props,className=$__0.className,year=$__0.year,onTouchTap=$__0.onTouchTap,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,year:1,onTouchTap:1,selected:1});

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        display: 'block',
        margin: '0 auto',
        width: 36,
        fontSize: '14px',
        padding: '8px 2px'
      },

      label: {
        position: 'relative',
        top: '-1px',
        color: this.context.muiTheme.palette.textColor
      },

      buttonState: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        backgroundColor: this.getTheme().selectColor
      },
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = '0.6';
      styles.buttonState.transform = 'scale(1.5)';
    }

    if (selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1.5)';
    }

    if (year === new Date().getFullYear()) {
      styles.root.color = this.getTheme().color;
    }

    return (
      React.createElement(EnhancedButton, React.__spread({},  other, 
        {style: styles.root, 
        disableFocusRipple: true, 
        disableTouchRipple: true, 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut, 
        onTouchTap: this._handleTouchTap}), 
        React.createElement("div", {style: styles.buttonState}), 
        React.createElement("span", {style: styles.label}, year)
      )
    );
  },

  _handleMouseOver: function() {
    this.setState({hover: true});
  },

  _handleMouseOut: function() {
    this.setState({hover: false});
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.year);
  }

});

module.exports = YearButton;
