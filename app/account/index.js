import uiRouter from 'angular-ui-router'

import routing from './account.routes'
import tcAuthService from '../services/tcAuth.service'
import userService from '../services/user.service'
import helpers from '../services/helpers.service'

import LoginController from './login/login.controller'

const dependencies = [
  uiRouter,
  tcAuthService,
  userService,
  helpers
  // 'ngIsoConstants',
  // 'angucomplete-alt',
  // 'ngBusy',
  // 'blocks.logger'
]

export default angular.module('tc.account', dependencies)
  .config(routing)
  // .config(['$provide',function ($provide) {
  //   $provide.decorator('$log', ['$delegate', 'LogEnhancer', function ($delegate, LogEnhancer) {
  //     LogEnhancer.enhanceLogger($delegate);
  //     return $delegate;
  //   }]);
  // }])
  .controller('LoginController', LoginController)
  .name
