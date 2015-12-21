import uiRouter from 'angular-ui-router'

import config from './app.config'
import routes from './app.routes'
import run from './app.run'
import constants from './topcoder.constants'

import helpers from './services/helpers.service'
import introService from './services/intro.service'
import tcAuthService from './services/tcAuth.service'

import sample from './sample'
import tcAccount from './account'
import TopcoderController from './topcoder.controller'

const dependencies = [
  constants,

  // Libraries
  uiRouter,
  'restangular',
  'ngIsoConstants.services',

  // Services
  introService,
  helpers,
  tcAuthService,

  // Modules
  sample,
  tcAccount
];

angular
  .module('topcoder', dependencies)
  .config(config)
  .config(routes)
  .run(run)
  .controller('TopcoderController', TopcoderController)
