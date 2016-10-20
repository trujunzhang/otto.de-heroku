import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";
import {DocumentContainer} from "meteor/utilities:react-list-container";
import {ModalTrigger} from "meteor/nova:core";
import {FormattedMessage, intlShape} from 'react-intl';
import Posts from "meteor/nova:posts";
import Users from "meteor/nova:users";
import Comments from "meteor/nova:comments";
import moment from 'moment';
import {withRouter} from 'react-router'

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            posts: [],
        };
    }

    renderTableHeader() {
        return (
          <thead>
          <tr>
              <td id="cb" className="manage-column column-cb check-column">
                  <label className="screen-reader-text">Select All</label>
                  <input id="cb-select-all-1" type="checkbox"/></td>
              <th scope="col" id="title" className="manage-column column-title column-primary sortable desc">
                  <a href="http://www.politicl.com/wp-admin/edit.php?mode=list&amp;orderby=title&amp;order=asc">
                      <span>Title</span>
                  </a>
              </th>
              <th scope="col" id="author" className="manage-column column-author">Source Name</th>
              <th scope="col" id="author" className="manage-column column-curator">Curator</th>
              <th scope="col" id="categories" className="manage-column column-categories">Categories</th>
              <th scope="col" id="tags" className="manage-column column-tags">Tags</th>
              <th scope="col" id="comments" className="manage-column column-comments num sortable desc">Comments</th>
              <th scope="col" id="date" className="manage-column column-date sorted desc">
                  <a href="http://www.politicl.com/wp-admin/edit.php?mode=list&amp;orderby=date&amp;order=asc">
                      <span>Date</span>
                  </a>
              </th>
          </tr>
          </thead>
        )
    }

    renderTableFooter() {
        return (
          <tfoot>
          <tr>
              <td className="manage-column column-cb check-column">
                  <label className="screen-reader-text">Select All</label>
                  <input id="cb-select-all-2" type="checkbox"/>
              </td>
              <th scope="col" className="manage-column column-title column-primary sortable desc">
                  <a >
                      <span>Title</span>
                  </a>
              </th>
              <th scope="col" className="manage-column column-author">Source Name</th>
              <th scope="col" id="author" className="manage-column column-curator">Curator</th>
              <th scope="col" className="manage-column column-categories">Categories</th>
              <th scope="col" className="manage-column column-tags">Tags</th>
              <th scope="col" className="manage-column column-comments num sortable desc">Comments</th>
              <th scope="col" className="manage-column column-date sorted desc">
                  <a >
                      <span>Date</span>
                  </a>
              </th>
          </tr>
          </tfoot>

        )
    }

    render() {
        const posts = this.state.posts;

        return (
          <div className="wrap" id="admin-posts-ui">
              <h1 className="admin-posts-title">Categories
                  <div className="modal-trigger"><a className="page-title-action">Add New</a></div>
              </h1>

              <table className="wp-list-table widefat fixed striped posts">

                  {this.renderTableHeader()}

                  <tbody id="the-list">
                  {(!!posts && posts.length > 0 ) ? posts.map((post, index) =><Telescope.components.AppAdminPostItem key={index} post={post} currentUser={this.props.currentUser}/>) : null}
                  </tbody>

                  {this.renderTableFooter()}
              </table>

          </div>
        )

    }
}

PostsList.contextTypes = {
    messages: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
    intl: intlShape
};

PostsList.displayName = "PostsList";

module.exports = withRouter(PostsList);
export default withRouter(PostsList);
