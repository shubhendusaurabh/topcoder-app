import authtokenService from './authtoken.service'
import constants from '../topcoder.constants'
import helpers from './helpers.service'
import userService from './user.service'

export default angular.module('tc.services.tcAuth', [
    'auth0',
    authtokenService,
    constants,
    helpers,
    userService
  ])
  .factory('TcAuthService', TcAuthService)
  .name

function TcAuthService(CONSTANTS, auth, AuthTokenService, $rootScope, $q, $log, $timeout, UserService, Helpers, store, $http) {
  // $log = $log.getInstance('TcAuthServicetcAuth');
  const auth0 = auth;
  const apiUrl = CONSTANTS.AUTH_API_URL;
  const service = {
    login: login,
    socialLogin: socialLogin,
    socialRegistration: socialRegistration,
    logout: logout,
    register: register,
    isAuthenticated: isAuthenticated
  }

  return service

  ///////////////

  function _isEmail(usernameOrEmail) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(usernameOrEmail);
  }


  function login(usernameOrEmail, password) {
    return _doLogin({
      usernameOrEmail: usernameOrEmail,
      password: password
    }, null);
  }

  function socialLogin(provider, state) {
    return _doLogin(null, provider);
  }

  function _doLogin(userCreds, provider) {
    return $q(function(resolve, reject) {
      // supported backends
      var options = {
        popup: true,
        scope: "openid profile offline_access",
        // state: state,
      };
      // setup more options based on input
      if (provider) {
        var providers = ['facebook', 'google-oauth2', 'twitter', 'github'];
        if (providers.indexOf(provider) < 0) {
          reject({
            status: "UNSUPORTED_PROVIDER"
          });
          return;
        } else {
          options.connection = provider;
        }
      } else {
        options.connection = Helpers.isEmail(userCreds.usernameOrEmail) ? 'TC-User-Database' : 'LDAP';
        options.sso = false;
        options.username = userCreds.usernameOrEmail;
        options.password = userCreds.password;
      }

      auth0.signin(options,
        function(profile, idToken, accessToken, state, refreshToken) {
          AuthTokenService.exchangeToken(refreshToken, idToken).then(
            function(appiriojwt) {
              $timeout(function() {
                $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_IN);

                var userIdentity = UserService.getUserIdentity();

                if (userIdentity && !store.get(userIdentity.userId)) {
                  store.set(userIdentity.userId, {});
                }
                resolve();
              }, 200);
            },
            function(resp) {
              $log.debug(JSON.stringify(resp));
              // 401 status here implies user is not registered
              if (resp.status === 401) {
                reject({
                  status: "USER_NOT_REGISTERED"
                });
              }
              if (resp.data.result.content.toLowerCase() === 'account inactive') {
                reject({
                  status: "ACCOUNT_INACTIVE"
                });
              } else {
                reject({
                  status: "UKNOWN_ERROR"
                });
              }
            }
          );
        },
        function(error) {
          $log.warn(JSON.stringify(error));
          reject(error);
        }
      );
    });
  }

  function socialRegistration(provider, state) {
    return $q(function(resolve, reject) {
      // supported backends
      var providers = ['facebook', 'google-oauth2', 'twitter', 'github'];
      if (providers.indexOf(provider) > -1) {
        auth0.signin({
            popup: true,
            connection: provider,
            scope: "openid profile offline_access",
            state: state
          },
          function(profile, idToken, accessToken, state, refreshToken) {
            var socialData = Helpers.getSocialUserData(profile, accessToken);

            UserService.validateSocialProfile(socialData.socialUserId, socialData.socialProvider)
              .then(function(resp) {
                $log.debug(JSON.stringify(resp));
                if (resp.valid) {
                  // success
                  var result = {
                    status: 'SUCCESS',
                    data: socialData
                  };
                  $log.debug("socialRegister Result: " + JSON.stringify(result));
                  resolve(result);
                } else {
                  if (resp.reasonCode === 'ALREADY_IN_USE') {
                    $log.error('Social handle exist');
                    reject({
                      status: "SOCIAL_PROFILE_ALREADY_EXISTS"
                    });
                  }
                }

              })
              .catch(function(resp) {
                $log.debug(JSON.stringify(resp));
              });
          },
          function(error) {
            $log.warn("onSocialLoginFailure " + JSON.stringify(error));
            reject(error);
          }
        );
      } else {
        $log.error('Unsupported social login provider: ' + provider);
        reject({
          status: "FAILED",
          "error": "Unsupported social login provider '" + provider + "'"
        });
      }
    });
  }

  function logout() {
    // options for DELETE http call
    var logoutOptions = {
      url: apiUrl + '/authorizations/1',
      method: 'DELETE',
      headers: {
        'Authorization': "Bearer " + AuthTokenService.getV3Token()
      }
    };


    // logout of all browsers
    return $q(function(resolve, reject) {
      // remove local token
      AuthTokenService.removeTokens();
      $rootScope.$broadcast(CONSTANTS.EVENT_USER_LOGGED_OUT);
      resolve();
//        $http(logoutOptions).then(function(res) {
//          $log.log('logout successful');
//          resolve();
//        }).catch(function(resp) {
//          $log.error('logout error');
//          reject();
//        });
    });
  }

  function register(userInfo) {
    // api params
    // required: ["firstName", "lastName", "handle", "country", "email"],
    // optional: ["password", "socialProviderId", "socialUserName", "socialEmail", "socialEmailVerified", "regSource", "socialUserId", "utm_source", "utm_medium", "utm_campaign"]
    return UserService.createUser(userInfo);
  }

  function isAuthenticated() {
    return !!AuthTokenService.getV3Token() && !!AuthTokenService.getV2Token() && !!AuthTokenService.getTCSSOToken();
  }

}
