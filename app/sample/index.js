import uiRouter from 'angular-ui-router'

import routing from './sample.routes'
import SampleController from './sample.controller'

const dependencies = [
  uiRouter
];

export default angular.module('tc.sample', dependencies)
  .config(routing)
  .controller('SampleController', SampleController)
  .name;
