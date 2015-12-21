export default function config($httpProvider, RestangularProvider, $locationProvider, jwtInterceptorProvider) {

  // Interceptors
  jwtInterceptorProvider.tokenGetter = [
    'config',
    'JwtInterceptorService',
    function(config, JwtInterceptorService) {
      return JwtInterceptorService.getToken(config)
    }
  ]

  $httpProvider.interceptors.push('jwtInterceptor')

  // Is HeaderInterceptor needed anymore? old peer review code?
  // $httpProvider.interceptors.push('HeaderInterceptor')
}
