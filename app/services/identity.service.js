import tcAuthService from './tcAuth.service'
import authtokenService from './authtoken.service'

class IdentityService {
  constructor(TcAuthService, AuthTokenService) {
    this.TcAuthService = TcAuthService
    this.AuthTokenService = AuthTokenService
  }

  getUserIdentity() {
    if (this.TcAuthService.isAuthenticated()) {
      var decodedToken = this.AuthTokenService.decodeToken(this.AuthTokenService.getV3Token());
      return decodedToken;
    } else {
      return null;
    }
  }
}

export default angular
  .module('tc.services.identity', [tcAuthService, authtokenService])
  .service('IdentityService', IdentityService)
  .name
