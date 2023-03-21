import React, {useCallback, useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';

 const clientId = 
  "32251362962-eue314fujkhcq531358adimjv1rm66qh.apps.googleusercontent.com"

 const GoogleButton = ({onSocial})=>{


 useEffect(()=> {
    function start() {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }
    gapi.load('client.auth2', start);
 },[]);


 const onSuccess = (response)=> {
    console.log(response);
 };

 const onFailure = (response)=> {
  console.log(response);
 };
  return(
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='구글로 로그인'
        onSuccess={onSuccess}
        onFailure={onFailure}

      />
      </div>
  );
}

export default GoogleButton;