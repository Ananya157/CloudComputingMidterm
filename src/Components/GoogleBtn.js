import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {parseString} from 'xml2js';

const CLIENT_ID = '20907852666-orck781pvpf5kd1abcph7gd3hq91aval.apps.googleusercontent.com';
class GoogleBtn extends Component {
   constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      accessToken: '',
      accesskey: '',
      secretkey: '',
      sessiontoken: '' 
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }
  
  login (response) {
    if(response.accessToken){
      let ak = '';
      let sk = '';
      let st = '';
      console.log(response)
      const url = 'https://sts.amazonaws.com/?Action=AssumeRoleWithWebIdentity&DurationSeconds=3600&RoleSessionName=CloudComputing&RoleArn=arn:aws:iam::523040592842:role/CloudComputing&WebIdentityToken=' + response.tokenId + '&Version=2011-06-15';
        fetch(url)
          .then((response) => response.text())
          .then((responseText) => {
            parseString(responseText, function (err, result) {
              console.log(result.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult[0].Credentials[0].AccessKeyId[0])
              ak = result.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult[0].Credentials[0].AccessKeyId[0]
              sk = result.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult[0].Credentials[0].SecretAccessKey[0]
              st = result.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult[0].Credentials[0].SessionToken[0]
            }); 
            this.setState(state => ({
              isLogined: true,
              accessToken: response.accessToken,
              accesskey: ak,
              secretkey: sk,
              sessiontoken: st
              
            }));
            localStorage.setItem('ak', ak);
            localStorage.setItem('st', st);
            localStorage.setItem('sk', sk);
            console.log(this.state)
            this.props.history.push('/StudentList');
          })
          .catch((error) => {
            console.log('Error fetching the feed: ', error);
          })
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    this.props.history.push('/StudentList');
  }

  handleLoginFailure (response) {
    //alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    //alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ? 
       <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      {this.state.isLogined? (<div>
        {this.state.accessToken}
        </div>) : null}
    </div>
    )
  }
}

export default GoogleBtn;