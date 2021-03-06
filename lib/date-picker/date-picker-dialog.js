var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var CssEvent = require('../utils/css-event');
var KeyCode = require('../utils/key-code');
var Calendar = require('./calendar');
var DialogWindow = require('../dialog-window');
var FlatButton = require('../flat-button');

var DatePickerDialog = React.createClass({displayName: "DatePickerDialog",

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onClickAway: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    showYearSelector: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getInitialState: function() {
    return {
      isCalendarActive: false,
      showMonthDayPicker: true
    };
  },

  render: function() {
    var $__0=
      
      
      
      
      this.props,initialDate=$__0.initialDate,onAccept=$__0.onAccept,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{initialDate:1,onAccept:1,style:1});

    var styles = {
      root: {
        fontSize: '14px',
        color: this.context.muiTheme.component.datePicker.calendarTextColor
      },

      dialogContents: {
        width: this.props.mode === 'landscape' ? '560px' : '280px'
      },

      actions: {
        marginRight: 8,
      }
    };

    var actions = [
      React.createElement(FlatButton, {
        key: 0, 
        label: "Cancel", 
        secondary: true, 
        style: styles.actions, 
        onTouchTap: this._handleCancelTouchTap}),
      React.createElement(FlatButton, {
        key: 1, 
        label: "OK", 
        secondary: true, 
        disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(), 
        style: styles.actions, 
        onTouchTap: this._handleOKTouchTap})
    ];

    if(this.props.autoOk){
      actions = actions.slice(0, 1);
    }

    return (
      React.createElement(DialogWindow, React.__spread({},  other, 
        {ref: "dialogWindow", 
        style: styles.root, 
        contentStyle: styles.dialogContents, 
        actions: actions, 
        onDismiss: this._handleDialogDismiss, 
        onShow: this._handleDialogShow, 
        onClickAway: this._handleDialogClickAway, 
        repositionOnUpdate: false}), 
        React.createElement(Calendar, {
          ref: "calendar", 
          onSelectedDate: this._onSelectedDate, 
          initialDate: this.props.initialDate, 
          isActive: this.state.isCalendarActive, 
          minDate: this.props.minDate, 
          maxDate: this.props.maxDate, 
          shouldDisableDate: this.props.shouldDisableDate, 
          shouldShowMonthDayPickerFirst: this.state.showMonthDayPicker, 
          hideToolbarYearChange: this.props.hideToolbarYearChange, 
          showYearSelector: this.props.showYearSelector, 
          mode: this.props.mode})
      )
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  _onSelectedDate: function(e) {
    if(this.props.autoOk) {
      setTimeout(this._handleOKTouchTap, 300);
    }
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleOKTouchTap: function() {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.dismiss();
  },

  _handleDialogShow: function() {
    this.setState({
      isCalendarActive: true
    });

    if(this.props.onShow) this.props.onShow();
  },

  _handleDialogDismiss: function() {
    CssEvent.onTransitionEnd(this.refs.dialogWindow.getDOMNode(), function() {
      this.setState({
        isCalendarActive: false,
        showMonthDayPicker: true
      });
    }.bind(this));

    if(this.props.onDismiss) this.props.onDismiss();
  },

  _handleDialogClickAway: function() {
    CssEvent.onTransitionEnd(this.refs.dialogWindow.getDOMNode(), function() {
      this.setState({
        isCalendarActive: false,
        showMonthDayPicker: true
      });
    }.bind(this));

    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;
