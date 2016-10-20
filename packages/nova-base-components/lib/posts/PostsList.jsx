import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {withRouter} from 'react-router'

var Parse = require('parse').Parse;

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            items: [],
            // Edit
            value: '',
            addNewItem: true,
            // Message
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
        //this.refresh();

        //this._createItem("");
    }

    _createItem(error, result) {
        if (error !== "") {
            this.showMessage("Invalidate input", 'error');
            return;
        }

        var Categories = Parse.Object.extend("Categories");
        var category = new Categories();

        category.set("url", result['url']);
        category.set("pageNumber", result['pageNumber']);
        category.set("totalNumber", result['totalNumber']);

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
                      <span>Url</span>
                  </a>
              </th>
              <th scope="col" id="tags" className="manage-column column-tags">Total page Number Per Schedular</th>
              <th scope="col" id="comments" className="manage-column column-comments num sortable desc">Total products Per Schedular</th>
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
                      <span>Url</span>
                  </a>
              </th>
              <th scope="col" className="manage-column column-tags">Total page Number Per Schedular</th>
              <th scope="col" className="manage-column column-comments num sortable desc">Total products Per Schedular</th>
              <th scope="col" className="manage-column column-date sorted desc">
                  <a >
                      <span>Date</span>
                  </a>
              </th>
          </tr>
          </tfoot>

        )
    }

    renderAddNewForm() {
        return (
          <div id="newCollectionForm" className="collections-popover--form">
              url:<input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.value} onChange={this.onChange} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              <button onClick={this._createItem.bind(this)}
                      className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d simpleVariant_1Nl54 collections-popover--form--submit"
                      type="submit">
                  <div className="buttonContainer_wTYxi">Submit</div>
              </button>
          </div>
        )
    }

    render() {
        const items = this.state.items;

        return (
          <div className="wrap" id="admin-posts-ui">
              {!!this.state.message ? <div className={this.state.message.type == "success" ? "successfullyMessage_2lxEG" : "errorMessage_2lxEG"}>{this.state.message.message}</div> : null}

              <h1 className="admin-posts-title">Categories
                  <div className="modal-trigger"><a className="page-title-action">Add New</a></div>
                  <div id="refresh-button">
                      <div className="modal-trigger" onClick={this.refresh.bind(this)}><a className="page-title-action">Refresh</a></div>
                  </div>
              </h1>

              <div className="popover--footer">
                  {this.state.addNewItem ? <Telescope.components.ParseEditor category={{}} callBack={this._create3Item.bind(this)}/> : null}
              </div>


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
