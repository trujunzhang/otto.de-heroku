import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';
import {withRouter} from 'react-router'

class UsersPopoverMenu extends Component {

    onMenuItemClick(menu) {
        const user = this.props.user;
        const router = this.props.router;

        switch (menu.type) {
            case "logout":
                Meteor.logout(Accounts.ui._options.onSignedOutHook());
                break;
            default:
                this.context.messages.pushNewLocationPath(this.props.router, {pathname: menu.path});
                break;
        }
    }

    render() {
        const comp = this.props.comp;
        const top = comp.top + comp.height + 26;
        var left = (comp.left + comp.width / 2) - 75;

        const clientWidth = $(window).width();

        const user = this.props.user;
        const loggedUserMenu = [
            {type: "profile", path: "/users/" + user.telescope.slug, title: "MY PROFILE"},
            {type: "collections", path: "/users/" + user.telescope.slug + "/collections", title: "MY COLLECTIONS"},
            {type: "settings", path: "/users/" + user.telescope.slug + "/edit", title: "SETTINGS"},
            {type: "logout", title: "LOGOUT"}
        ];
        var popoverClass = "popover v-bottom-center";
        if (left + 150 >= clientWidth) {
            popoverClass = "popover v-bottom-left";
            left = left - 50;
        }

        return (
          <div className={popoverClass} style={{top: top, left: left}}>
              <ul className="content_2mq4P">
                  {loggedUserMenu.map((menu, key) => {
                      return (
                        <li key={key} className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                            <a onClick={this.onMenuItemClick.bind(this, menu)}>{menu.title}</a>
                        </li>
                      )
                  })}
              </ul>
          </div>
        )
    }

}

UsersPopoverMenu.propTypes = {
    user: React.PropTypes.object
};

UsersPopoverMenu.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = withRouter(UsersPopoverMenu);
export default withRouter(UsersPopoverMenu);