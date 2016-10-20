import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";

class Layout extends Component {

    render() {

        return (
          <div id="wrapper">

              <Telescope.components.HeadTags />

              <Telescope.components.UsersProfileCheck {...this.props} />

              <Telescope.components.Header {...this.props}/>

              <div className="main">

                  {this.props.children}

              </div>

              <div>

              </div>

              <Telescope.components.Footer {...this.props}/>

          </div>
        )

    }
}

Layout.displayName = "Layout";

module.exports = Layout;