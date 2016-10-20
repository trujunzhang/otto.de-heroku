import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {withRouter} from 'react-router'

var Parse = require('parse').Parse;

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            items: [],
            message: null,
        };

        this.init_parse();
    }

    init_parse() {
        const Application_ID = Telescope.settings.get("Parse_Application_ID");
        const Javascript_KEY = Telescope.settings.get("Parse_Javascript_KEY");
        // Insert your app's keys here:
        Parse.initialize(Application_ID, Javascript_KEY);
    }

    showMessage(message, type, clearTimeout) {
        message = message.trim();

        if (message) {
            this.setState({message: {message: message, type: type}});
            if (clearTimeout) {
                Meteor.setTimeout(() => {
                    this.setState({message: null});
                }, clearTimeout);
            }
        }
    }

    componentWillMount() {
        this.refresh();

        this._createItem("");
    }

    _createItem(text) {
        var Categories = Parse.Object.extend("Categories");
        var category = new Categories();

        category.set("score", 123);
        category.set("playerName", "Trujun Zhang");
        category.set("cheatMode", true);

        category.save(null, {
            success: function (gameScore) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + gameScore.id);
                this.showMessage("Save data successfully", 'success');
                this.refresh();
            },
            error: function (gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                this.showMessage("Save data failure", 'error');
            }
        });
    }

    refresh() {
        var Categories = Parse.Object.extend("Categories");
        var query = new Parse.Query(Categories);
        //query.equalTo("playerName", "Dan Stemkoski");
        query.find({
            success: function (results) {
                this.setState({items: results});
            },
            error: function (error) {
                this.showMessage("Fetching data failure", 'error');
            }
        });
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
              {!!this.state.message ? <div className="errorMessage_2lxEG">{this.state.message.message}</div> : null}

              <h1 className="admin-posts-title">Categories
                  <div className="modal-trigger"><a className="page-title-action">Add New</a></div>
                  <div id="refresh-button">
                      <div className="modal-trigger" onClick={this.refresh.bind(this)}><a className="page-title-action">Refresh</a></div>
                  </div>
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
