var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Paper = React.createClass({displayName: "Paper",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    circle: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5]),
    transitionEnabled: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      rounded: true,
      zDepth: 1,
      transitionEnabled: true
    };
  },

  getStyles: function() {
    var styles = {
      root: {
        backgroundColor: this.context.muiTheme.component.paper.backgroundColor,
        transition: this.props.transitionEnabled && Transitions.easeOut(),
        boxSizing: 'border-box',
        fontFamily: this.context.muiTheme.contentFontFamily,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        boxShadow: this._getZDepthShadows(this.props.zDepth),
        borderRadius: this.props.circle ? '50%' :
          this.props.rounded ? '2px' : '0px'
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      
         this.props,style=$__0.style,circle=$__0.circle,rounded=$__0.rounded,zDepth=$__0.zDepth,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1,circle:1,rounded:1,zDepth:1});

    var styles = this.getStyles();

    return (
      React.createElement("div", React.__spread({},  other, {style: this.mergeAndPrefix(styles.root, this.props.style)}), 
        this.props.children
      )
    );
  },

  _getZDepthShadows: function(zDepth) {
    var shadows = [
      '',
      '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
      '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
      '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)',
      '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)',
      '0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22)'
    ];

    return shadows[zDepth];
  }

});

module.exports = Paper;
