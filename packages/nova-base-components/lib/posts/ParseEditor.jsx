import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";
import {DocumentContainer} from "meteor/utilities:react-list-container";
import {ModalTrigger} from "meteor/nova:core";
import Posts from "meteor/nova:posts";
import Users from "meteor/nova:users";
import Comments from "meteor/nova:comments";
import moment from 'moment';
import {withRouter} from 'react-router'

class ParseEditor extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            // Edit
            url: this.props.category['url'] ? this.props.category['url'] : "",
            pageNumber: this.props.category['pageNumber'] ? this.props.category['pageNumber'] : 0,
            totalNumber: this.props.category['totalNumber'] ? this.props.category['totalNumber'] : 0,
        };
    }

    onUrlChange(e) {
        const input = e.target.value;
        this.setState({url: input});
    }

    onPageNumberChange(e) {
        const input = e.target.value;
        this.setState({pageNumber: input});
    }

    onTotalNumberChange(e) {
        const input = e.target.value;
        this.setState({totalNumber: input});
    }

    render() {
        return (
          <div id="newCollectionForm" className="collections-popover--form">
              <div>
                  <h3>url:</h3>
                  <input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.url} onChange={this.onUrlChange.bind(this)} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              </div>
              <div>
                  <h3>Total page Number Per Schedular:</h3>
                  <input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.pageNumber} onChange={this.onPageNumberChange.bind(this)} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              </div>
              <div>
                  <h3>Total products Per Schedular</h3>
                  <input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.totalNumber} onChange={this.onTotalNumberChange.bind(this)} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              </div>
              <button onClick={this._createItem.bind(this)}
                      className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d simpleVariant_1Nl54 collections-popover--form--submit"
                      type="submit">
                  <div className="buttonContainer_wTYxi">Submit</div>
              </button>
          </div>
        )
    }

}

ParseEditor.contextTypes = {
    messages: React.PropTypes.object
};

ParseEditor.displayName = "ParseEditor";

module.exports = withRouter(ParseEditor);
export default withRouter(ParseEditor);
