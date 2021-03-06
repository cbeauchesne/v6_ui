goog.provide('app.DoctypeSelectorController');
goog.provide('app.doctypeSelectorDirective');

goog.require('app');


/**
 * Directive managing the user mailinglists.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
app.doctypeSelectorDirective = function() {
  return {
    restrict: 'E',
    bindToController: {
      'defaultType': '@appDoctype'
    },
    controller: 'appDoctypeSelectorController',
    controllerAs: 'doctypeCtrl',
    templateUrl: '/static/partials/doctypeselector.html'
  };
};


app.module.directive('appDoctypeSelector', app.doctypeSelectorDirective);


/**
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @constructor
 * @ngInject
 * @struct
 */
app.DoctypeSelectorController = function(ngeoLocation) {

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.location_ = ngeoLocation;

  /**
   * @type {string}
   * @export
   */
  this.defaultType;

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.doctypes = [
    {'id': 'routes', 'name': 'Routes'},
    {'id': 'waypoints', 'name': 'Waypoints'},
    {'id': 'outings', 'name': 'Outings'},
    {'id': 'images', 'name': 'Images'},
    {'id': 'books', 'name': 'Books'},
    {'id': 'areas', 'name': 'Areas'}
  ];

  /**
   * @type {?Object}
   * @export
   */
  this.selected;

  this.doctypes.forEach(function(doctype) {
    if (doctype['id'] === this.defaultType) {
      this.selected = doctype;
    }
  }.bind(this));

  /**
   * @type {Array.<string>}
   * @private
   */
  this.params_ = [];
};


/**
 * @export
 */
app.DoctypeSelectorController.prototype.redirect = function() {
  switch (this.selected['id']) {
    case 'outings':
    case 'routes':
    case 'images':
      this.setBbox_();
      this.setAreas_();
      this.setActivities_();
      break;
    case 'waypoints':
      this.setBbox_();
      this.setAreas_();
      break;
    case 'books':
      this.setActivities_();
      break;
    default:
      break;
  }
  var url = '/' + this.selected['id'];
  if (this.params_.length) {
    url += '#' + this.params_.join('&');
  }
  window.location = url;
};


/**
 * @private
 */
app.DoctypeSelectorController.prototype.setBbox_ = function() {
  var bbox = this.location_.getFragmentParam('bbox');
  if (bbox) {
    this.params_.push('bbox=' + bbox);
  }
};


/**
 * @private
 */
app.DoctypeSelectorController.prototype.setAreas_ = function() {
  var a = this.location_.getFragmentParam('a');
  if (a) {
    this.params_.push('a=' + a);
  }
};


/**
 * @private
 */
app.DoctypeSelectorController.prototype.setActivities_ = function() {
  var act = this.location_.getFragmentParam('act');
  if (act) {
    this.params_.push('act=' + act);
  }
};


app.module.controller('appDoctypeSelectorController', app.DoctypeSelectorController);
