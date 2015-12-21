export default function routes($stateProvider) {
  $stateProvider
    .state('sample', {
      url: '/',
      template: require('./sample'),
      controller: 'SampleController',
      controllerAs: 'sample'
    })
}
