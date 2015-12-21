require('../../../topcoder-app/assets/images/logo_mobile.svg');

export default function routes($locationProvider, $stateProvider, $urlRouterProvider) {
  const states = {
    auth: {
      parent: 'root',
      abstract: true,
      data: {
        authRequired: false
      },
      onEnter: ['$state', '$stateParams', 'TcAuthService', function($state, $stateParams, TcAuthService) {
        if (TcAuthService.isAuthenticated()) {
          // redirect to next if exists else dashboard
          if ($stateParams.next) {
            $log.debug('Redirecting: ' + $stateParams.next);
            window.location.href = decodeURIComponent($stateParams.next);
          } else {
            $state.go('dashboard');
          }
        }
      }]
    },
    login: {
      parent: 'auth',
      url: '/login/?next&code&state&status&userJWTToken&utm_source&utm_medium&utm_campaign',
      params: { 'notifyReset': false },
      data: {
        title: 'Login'
      },
      views: {
        'header@': {
          template: require('../layout/header/account-header')(),
        },
        'container@': {
          template: require('../account/login/login')(),
          controller: 'LoginController',
          controllerAs: 'vm'
        },
        'footer@': {
          template: require('../layout/footer/account-footer')(),
        }
      }
    },
    register: {
      parent: 'auth',
      url: '/register/?next&utm_source&utm_medium&utm_campaign',
      data: {
        title: "Join"
      },
      views: {
        'header@': {
          template: require('../layout/header/account-header')(),
        },
        'container@': {
          template: require('../account/register/register')(),
          controller: 'RegisterController',
          controllerAs: 'vm'
        },
        'footer@': {
          template: require('../layout/footer/account-footer')(),
        }
      }
    },
    registeredSuccessfully: {
      url: '/registered-successfully/',
      data: {
        title: 'Registered',
        authRequired: false
      },
      views: {
        'header@': {
          template: require('../layout/header/account-header')(),
        },
        'container@': {
          template: require('../account/register/registered-successfully')(),
        },
        'footer@': {
          template: require('../layout/footer/account-footer')(),
        }
      }
    },
    resetPassword: {
      parent: 'auth',
      url: '/reset-password/?token&handle',
      data: {
        title: "Reset Password"
      },
      views: {
        'header@': {
          template: require('../layout/header/account-header')(),
        },
        'container@': {
          template: require('../account/reset-password/reset-password')(),
          controller: 'ResetPasswordController',
          controllerAs: 'vm'
        },
        'footer@': {
          template: require('../layout/footer/account-footer')(),
        }
      }
    },
    logout: {
      url: '/logout/',
      views: {
        'header@': {},
        'container@': {
          controller: 'LogoutController'
        },
        'footer@': {}
      },
      data: {
        authRequired: false
      }
    }
  };

  angular.forEach(states, function(state, name) {
    $stateProvider.state(name, state)
  })
}
