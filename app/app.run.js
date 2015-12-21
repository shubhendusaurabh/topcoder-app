export default function run($rootScope, $state, TcAuthService, Helpers, $log) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.authRequired && !TcAuthService.isAuthenticated()) {
      $log.debug('State requires authentication, and user is not logged in, redirecting')
      // Setup redirect for post login
      event.preventDefault()
      const next = $state.href(toState.name, toParams, {absolute: false})
      $state.go('login', {next: next})
    }
  })

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    document.title = Helpers.getPageTitle(toState, $state.$current)
    // Adds previous state to scope
    $rootScope.previousState = fromState
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log.bind(console)
  })
}
