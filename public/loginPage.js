'use strict';

let thisUser = new UserForm();

thisUser.loginFormCallback = (data) =>
    ApiConnector.login(data, (response) => {
      //console.log(`response: ${_parseResponseBody(response)}`);
      if (response.success) {
          location.reload();
      } else {
          thisUser.setLoginErrorMessage(response.error);
      };
    });
thisUser.registerFormCallback = (data) =>
    ApiConnector.register(data, (response) => {
      //console.log(`response: ${_parseResponseBody(response)}`);
      if (response.success) {
          location.reload();
      } else {
          thisUser.setLoginErrorMessage(response.error);
      };
    });