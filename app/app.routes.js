export default function routes($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, RestangularProvider) {
  // Route configs
  $locationProvider.html5Mode(true);

  RestangularProvider.setRequestSuffix('/')

  // Ensure we have a trailing slash
  $urlMatcherFactoryProvider.strictMode(true);

  // Rule to add trailing slash
  $urlRouterProvider.rule(function($injector) {
    var $location = $injector.get('$location');
    var path = $location.url();
    // check to see if the path already has a slash where it should be
    if (path[path.length - 1] === '/' || path.indexOf('/?') > -1 || path.indexOf('/#') > -1) {
      return;
    }
    if (path.indexOf('?') > -1) {
      return path.replace('?', '/?');
    }
    return path + '/';
  });

  $urlRouterProvider.otherwise(function($injector) {
    $injector.invoke(['$state', 'CONSTANTS', '$location', function($state, CONSTANTS, $location) {
      if ($location.host().indexOf('local') == -1) {
        var absUrl = CONSTANTS.MAIN_URL + window.location.pathname;
        if (window.location.search)
          absUrl += window.location.search;
        if (window.location.hash)
          absUrl += window.location.hash;
        window.location.replace(absUrl);
      } else {
        // Redirect to 404 locally
        $state.go('404')
      }
    }]);
  });

  // UI Router States
  var states = {
    '404': {
      parent: 'root',
      url: '/404/',
      template: '',
      data: {
        authRequired: false,
        title: 'Page Not Found',
      },
      controller: ['CONSTANTS', function(CONSTANTS) {
        window.location.href = CONSTANTS.MAIN_URL + '/404/'
      }]
    },
    /**
     * Base state that all other routes should inherit from.
     * Child routes can override any of the specified regions
     */
    root: {
      url: '',
      abstract: true,
      data: {
        authRequired: false,
      },
      views: {
        'header@': {
          template: require('./layout/header/header')(),
          controller: 'HeaderController',
          controllerAs: 'vm'
        },
        'container@': {
          template: '<div ui-view></div>'
        },
        'footer@': {
          template: require('./layout/footer/footer')(),
          controller: ['$scope', 'CONSTANTS', function($scope, CONSTANTS) {
            $scope.domain = CONSTANTS.domain
          }]
        }
      }
    },
    home: {
      parent: 'root',
      url: '/',
      controller: ['$state', function($state) {
        $state.go('dashboard')
      }]
    }
  }

  angular.forEach(states, function(state, name) {
    $stateProvider.state(name, state)
  })
}
