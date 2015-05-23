var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transition = require('../styles/transitions');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var DayButton = React.createClass({displayName: "DayButton",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      selected: false,
      disabled: false
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
      
      
      
      
      this.props,date=$__0.date,onTouchTap=$__0.onTouchTap,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{date:1,onTouchTap:1,selected:1});

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        position: 'relative',
        float: 'left',
        width: 36,
        padding: '4px 2px'
      },

      label: {
        position: 'relative',
        color: this.context.muiTheme.palette.textColor
      },

      buttonState: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: this.getTheme().selectColor,
      }
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = '0.6';
      styles.buttonState.transform = 'scale(1)';
    }

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1)';
    }
    else if (this.props.disabled) {
      styles.root.opacity = '0.6';
    }

    if (DateTime.isEqualDate(this.props.date, new Date()) && !this.props.selected) {
        styles.label.color = this.getTheme().color;
    }

    return this.props.date ? (
      React.createElement(EnhancedButton, React.__spread({},  other, 
        {style: styles.root, 
        hoverStyle: styles.hover, 
        disabled: this.props.disabled, 
        disableFocusRipple: true, 
        disableTouchRipple: true, 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut, 
        onTouchTap: this._handleTouchTap, 
        onKeyboardFocus: this._handleKeyboardFocus}), 
        React.createElement("div", {style: styles.buttonState}), 
        React.createElement("span", {style: styles.label}, this.props.date.getDate())
      )
    ) : (
      React.createElement("span", {style: styles.root})
    );
  },

  _handleMouseOver: function() {
    if (!this.props.disabled) this.setState({hover: true});
  },
  
  _handleMouseOut: function() {
    if (!this.props.disabled) this.setState({hover: false});
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (!this.props.disabled && this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  } 

});

module.exports = DayButton;
