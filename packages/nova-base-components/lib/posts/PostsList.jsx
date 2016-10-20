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
            dateSelector: 'All dates',
            catSelector: 'All Categories',
            query: '',
        };

        this.onDateSelectorChange = this.onDateSelectorChange.bind(this);
        this.onCatSelectorChange = this.onCatSelectorChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
    }

    onSearchChange(event) {
        var value = event.target.value;
        this.setState({query: value});
        console.log("onSearchChange: " + value);
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

    onDateSelectorChange(event) {
        var value = event.target.value;
        this.setState({dateSelector: value});
        console.log("onDateSelectorChange: " + value);
    }

    onCatSelectorChange(value) {
        this.setState({catSelector: value});
        console.log("onCatSelectorChange(callBack): " + value);
    }

    onFilterClick(event) {
        const router = this.props.router;
        const query = {};
        if (this.state.catSelector != "All Categories") {
            query["cat"] = this.state.catSelector;
        }
        if (this.state.dateSelector != "All dates") {
            query["date"] = this.state.dateSelector;
        }
        if (this.state.query != "") {
            query["query"] = this.state.query;
        }

        router.push({pathname: router.location.pathname, query: query});
    }

    renderTopbar() {
        const tablePostCount = this.props.tablePostCount ? this.props.tablePostCount : 0;
        const totalPages = 123;

        return (
          <div className="tablenav top">

              <div className="alignleft actions bulkactions">
                  <label className="screen-reader-text">Select bulk action</label>
                  <select name="action" id="bulk-action-selector-top">
                      <option value="-1">Bulk Actions</option>
                      <option value="edit" className="hide-if-no-js">Edit</option>
                      <option value="trash">Move to Trash</option>
                  </select>
                  <input type="submit" id="doaction" className="button action" value="Apply"/>
              </div>
              <h2 className="screen-reader-text">Posts list navigation</h2>
              <div className="tablenav-pages">
                  <span className="displaying-num">{tablePostCount + ' items'}</span>
                  <span className="pagination-links">
                        <span className="tablenav-pages-navspan">«</span>
                        <span className="tablenav-pages-navspan">‹</span>
                        <span className="paging-input">
                            <label className="screen-reader-text">Current Page</label>
                            <input className="current-page" id="current-page-selector" type="text" name="paged" value="1" size="3"/>
                            <span className="tablenav-paging-text">
                                of
                                <span className="total-pages">{totalPages}</span>
                            </span>
                        </span>
                        <a className="next-page">
                            <span className="screen-reader-text">Next page</span>
                            <span >›</span>
                        </a>
                        <a className="last-page">
                            <span className="screen-reader-text">Last page</span>
                            <span >»</span>
                        </a>
                    </span>
              </div>
              <br className="clear"/>
          </div>
        )
    }

    renderButtonbar() {
        const tablePostCount = this.props.tablePostCount ? this.props.tablePostCount : 0;
        const totalPages = 123;

        return (
          <div className="tablenav bottom">

              <div className="alignleft actions bulkactions">
                  <label className="screen-reader-text">Select bulk action</label>
                  <select name="action2" id="bulk-action-selector-bottom">
                      <option value="-1">Bulk Actions</option>
                      <option value="edit" className="hide-if-no-js">Edit</option>
                      <option value="trash">Move to Trash</option>
                  </select>
                  <input type="submit" id="doaction2" className="button action" value="Apply"/>
              </div>
              <div className="alignleft actions"></div>
              <div className="tablenav-pages">
                  <span className="displaying-num">{tablePostCount + ' items'}</span>
                  <span className="pagination-links">
                        <span className="tablenav-pages-navspan">«</span>
                        <span className="tablenav-pages-navspan">‹</span>
                        <span className="screen-reader-text">Current Page</span>
                        <span id="table-paging" className="paging-input">
                            <span className="tablenav-paging-text">1 of
                                <span className="total-pages">{totalPages}</span>
                            </span>
                        </span>
                        <a className="next-page">
                            <span className="screen-reader-text">Next page</span>
                            <span >›</span>
                        </a>
                        <a className="last-page">
                            <span className="screen-reader-text">Last page</span>
                            <span >»</span>
                        </a>
                    </span>
              </div>
              <br className="clear"/>
          </div>
        )
    }

    render() {
        const posts = this.props.results;

        return (
          <div className="wrap" id="admin-posts-ui">
              <h1 className="admin-posts-title">Posts
                  <ModalTrigger title={this.context.intl.formatMessage({id: "posts.new_post"})} component={<a className="page-title-action">Add New</a>}>
                      <Telescope.components.PostsNewForm/>
                  </ModalTrigger>
              </h1>

              {this.renderTopbar()}
              <table className="wp-list-table widefat fixed striped posts">

                  {this.renderTableHeader()}

                  <tbody id="the-list">
                  {(!!posts && posts.length > 0 ) ? posts.map((post, index) =><Telescope.components.AppAdminPostItem key={index} post={post} currentUser={this.props.currentUser}/>) : null}
                  </tbody>

                  {this.renderTableFooter()}
              </table>

              {this.renderButtonbar()}
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
