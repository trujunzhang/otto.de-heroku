import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";
import {withRouter} from 'react-router'

class Layout extends Component {

    componentWillMount() {
        const rootPath = this.props.router.getCurrentLocation().pathname;
        this.context.messages.registerCompont(this, rootPath);
        this.state = this.initialState = {
            isLogin: false,
            popoverMenu: null,
            didMount: false,
            popoverUserCollections: null
        };
    }

    renderPopoverMenus() {
        const popoverMenu = this.state.popoverMenu;
        if (popoverMenu) {
            switch (popoverMenu.type) {
                case "LoggedUserMenu":
                    return (<Telescope.components.UsersPopoverMenu comp={this.state.popoverMenu} user={this.props.currentUser}/>);
            }
        }
    }

    render() {

        return (
          <div id="wrapper">

              <Telescope.components.HeadTags />

              <Telescope.components.UsersProfileCheck {...this.props} />


              <div>
                  <Telescope.components.Header {...this.props} />
              </div>

              {/*Rendering the popover menus*/}
              {this.renderPopoverMenus()}

              <div className={ 'overlayInactive_1UI7W'}></div>

              {/*Popup the login UI*/}
              {this.state.isLogin ? <Telescope.components.UserLoginPopup /> : null}

              <div className="main">
                  <div id="admin-dashboard" className="hold-transition skin-blue sidebar-mini">
                      {this.props.children}
                  </div>
              </div>

              <div>

              </div>

              <Telescope.components.Footer {...this.props}/>

          </div>
        )

    }
}

Layout.contextTypes = {
    messages: React.PropTypes.object
};

Layout.displayName = "Layout";

module.exports = withRouter(Layout);
export default withRouter(Layout);