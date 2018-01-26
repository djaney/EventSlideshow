import React, {Component} from 'react';


class FacebookAuth extends Component {

  constructor(props){
    super(props);
    this.options = {
      appId: props.appId,
      domain: 'connect.facebook.net',
      version: 'v2.11',
      cookie: false,
      status: false,
      xfbml: false,
      language: 'en_US',
      frictionlessRequests: false,
    };
  }

  componentDidMount() {
    const response = this.login();
    response.then((res) =>{
      this.props.onAuth(res);
    });
  }

  async process(method, before = [], after = []) {
    const fb = await this.init();
    return new Promise((resolve, reject) => {
      fb[method](...before, (response) => {
        if (!response || response.error) {
          reject(new Error((response && response.error) || 'Response is undefined'));
          return;
        }

        resolve(response);
      }, ...after);
    });
  }

  async login(opts = null) {
    return this.process('login', [], [opts]);
  }

  async init() {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve) => {
      const { options } = this;
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: options.appId,
          version: 'v2.11',
          cookie: options.cookie,
          status: options.status,
          xfbml: options.xfbml,
          frictionlessRequests: this.frictionlessRequests,
        });
        resolve(window.FB);
      };

      const fjs = document.getElementsByTagName('script')[0];
      if (!fjs) {
        console.log('Script tag does not exists in the DOM');
        return;
      }

      if (document.getElementById('facebook-jssdk')) {
        return;
      }

      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.async = true;
      js.src = `//${options.domain}/${options.language}/sdk.js`;

      fjs.parentNode.insertBefore(js, fjs);
    });

    return this.loadingPromise;
  }

/*

  checkLoginState(response) {
      this.statusChangeCallback(response);
  }

  handleFBLogin() {
    FB.login(this.checkLoginState);
  }
*/


  // statusChangeCallback(response) {
  //   console.log('statusChangeCallback', response);
  //   if (response.status === 'connected') {
  //     this.props.onAuth && this.props.onAuth(token);
  //   } else if (response.status === 'not_authorized') {
  //     console.log("Please log into this app.");
  //   } else {
  //     console.log("Please log into this facebook.");
  //   }
  // }
  //

  render() {
    return (
      <div></div>
    );
  }
}

export default FacebookAuth;
