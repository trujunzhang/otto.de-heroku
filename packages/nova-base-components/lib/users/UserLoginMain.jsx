import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

class UserLoginMain extends Component {

    oauthSignIn(serviceName) {
        //const {formState, waiting, user} = this.state;
        //Thanks Josh Owens for this one.
        function capitalService() {
            return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        }

        if (serviceName === 'meteor-developer') {
            serviceName = 'meteorDeveloperAccount';
        }

        const loginWithService = Meteor["loginWith" + capitalService()];

        let options = {}; // use default scope unless specified
        if (Accounts.ui._options.requestPermissions[serviceName])
            options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
        if (Accounts.ui._options.requestOfflineToken[serviceName])
            options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
        if (Accounts.ui._options.forceApprovalPrompt[serviceName])
            options.forceApprovalPrompt = Accounts.ui._options.forceApprovalPrompt[serviceName];

        loginWithService(options, (error) => {
            if (error) {
                this.showMessage(T9n.get(`error.accounts.${error.reason}`) || T9n.get("Unknown error"));
            } else {
                this.dismissLoginUI();
            }
        });
    }

    loginTwitter() {
        this.context.messages.appStatus.dismissLoginUI();
        Meteor.setTimeout(() => {
            this.oauthSignIn("twitter");
        }, 4);
    }

    loginFacebook() {
        this.context.messages.appStatus.dismissLoginUI();
        Meteor.setTimeout(() => {
            this.oauthSignIn("facebook");
        }, 4);
    }

    render() {
        return (
          <div className="modal--content">
              <div className="login-fullscreen">
                  <h2 className="login-fullscreen--title">Login to</h2>
                  <p className="login-fullscreen--intro">Politicl is a community to share and publish about the last popular news. Join us :)</p>
                  <span>
                            <div className="buttonGroup_1mB5C">
                                <a
                                  className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf"
                                  rel="login-with-twitter" onClick={this.loginTwitter.bind(this)}>
                                    <div className="buttonContainer_wTYxi">Log in with twitter</div>
                                </a>
                                <a
                                  className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf"
                                  rel="login-with-facebook" onClick={this.loginFacebook.bind(this)}>
                                    <div className="buttonContainer_wTYxi">Log in with facebook</div>
                                </a>
                            </div>
                          <div className="row login-via-email">
                              <button
                                onClick={(e)=>this.props.switchFormState(e, "SIGNIN")}
                                className="button button--primary button--large button--chromeless button--link u-accentColor--buttonNormal u-marginTop15">
                                  Sign in or sign up with email
                              </button>
                          </div>
                            <p className="login-fullscreen--login-info">We'll never post to Twitter or Facebook without your permission.</p>
                        </span>
              </div>
          </div>
        )
    }
}

UserLoginMain.contextTypes = {
    messages: React.PropTypes.object
};

UserLoginMain.displayName = "UserLoginMain";

module.exports = UserLoginMain;
