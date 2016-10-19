import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';
import Posts from "meteor/nova:posts";
import {ModalTrigger} from "meteor/nova:core";
import {withRouter} from 'react-router'

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

class HeaderContent extends Component {

    constructor(props) {
        super(props);
    }

    onLogoIconClick() {
        this.context.messages.pushNewLocationPath(this.props.router, {pathname: "/", query: {}});
    }

    showLogin() {
        this.context.messages.appStatus.showLoginUI();
    }

    onSubmitAnArticleClick() {
        this.context.messages.pushNewLocationPath(this.props.router, {pathname: "/", query: {action: "new"}});
    }

    renderLeft() {
        return (
          <div className="metabar-block metabar-block--left u-floatLeft u-height65 u-xs-height56">
              <a onClick={this.onLogoIconClick.bind(this)} className="siteNav-logo">
                <span className="svgIcon svgIcon--logoNew svgIcon--45px is-flushLeft">
                    <span>OTTO Scraping App</span>
              </span>
              </a>
          </div>
        )
    }

    renderRight() {
        const currentUser = this.props.currentUser;

        return (
          <div className="metabar-block metabar-block--right u-floatRight u-height65 u-xs-height56">
              <div className="buttonSet">

                  {/*Show the login/signup button*/}
                  {currentUser ? null : <a onClick={this.showLogin.bind(this)} className="button button--primary button--chromeless u-accentColor--buttonNormal is-inSiteNavBar u-lineHeight30 u-height32 u-marginRight15 is-touched">Sign in / Sign up</a>}

                  {/*Show the logged user Icon*/}
                  {currentUser ? <Telescope.components.UsersMenu user={currentUser}/> : null}
              </div>
          </div>
        )
    }

    render() {
        return (
          <div className="headerContent_3umLL centerItems_222KX u-height65">
              {this.renderLeft()}
              {this.renderRight()}
          </div>
        )
    }

}

HeaderContent.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = withRouter(HeaderContent);
export default withRouter(HeaderContent);