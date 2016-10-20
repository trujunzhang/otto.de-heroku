import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {withRouter} from 'react-router'

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            items: [],
        };

    }

    componentWillMount() {
        this.refresh();
    }

    refresh() {
        const object = {
            "score": 12345,
            "playerName": "Trujun Zhang",
            "cheatMode": true
        };

        this.context.actions.call('parse.add.object', object, (error, result) => {
            this.setState({items: result})
        });
        //this.context.actions.call('parse.get.list', (error, result) => {
        //    this.setState({items: result})
        //});
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
        const items = this.state.items;

        return (
          <div className="wrap" id="admin-posts-ui">
              <h1 className="admin-posts-title">Categories
                  <div className="modal-trigger"><a className="page-title-action">Add New</a></div>
              </h1>

              <table className="wp-list-table widefat fixed striped posts">

                  {this.renderTableHeader()}

                  <tbody id="the-list">
                  {(!!items && items.length > 0 ) ? items.map((item, index) =><Telescope.components.ParseItem key={index} item={item}/>) : null}
                  </tbody>

                  {this.renderTableFooter()}
              </table>

          </div>
        )

    }
}

PostsList.contextTypes = {
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
};

PostsList.displayName = "PostsList";

module.exports = withRouter(PostsList);
export default withRouter(PostsList);
