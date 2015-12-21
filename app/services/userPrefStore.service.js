export default angular.module('tc.services.userPrefStore', [])
  .factory('UserPrefStore', UserPrefStore)
  .name

function UserPrefStore(store) {
  return store.getNamespacedStore('userSettings')
}
