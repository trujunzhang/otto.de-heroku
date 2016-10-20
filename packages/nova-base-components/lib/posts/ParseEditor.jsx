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

    onSubmitClick() {
        if (this.state.url == "" || this.state.pageNumber == "" || this.state.totalNumber == "") {
            this.props.callBack("Invalidate input", null);
        } else {
            const result = {
                "url": this.state.url,
                "pageNumber": this.state.pageNumber,
                "totalNumber": this.state.totalNumber,
            };
            this.props.callBack(null, result);
        }
    }

    render() {
        return (
          <div id="newCollectionForm" className="collections-popover--form">
              <div className="row">
                  <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">url:</span>
                  <input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.url} onChange={this.onUrlChange.bind(this)} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              </div>
              <div className="row">
                  <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Total page Number Per Schedular:</span>
                  <input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.pageNumber} onChange={this.onPageNumberChange.bind(this)} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              </div>
              <div className="row">
                  <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Total products Per Schedular:</span>
                  <input autoFocus type="text" className="collections-popover--form--field input collections-input"
                         value={this.state.totalNumber} onChange={this.onTotalNumberChange.bind(this)} placeholder="Collection name (public)"
                         ref="newCollectionInput"/>
              </div>
              <div className="right_1jQ6K buttonGroup_2NmU8 right_2JztM">
                  <button onClick={this.onSubmitClick.bind(this)}
                          className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d simpleVariant_1Nl54 collections-popover--form--submit"
                          type="submit">
                      <div className="buttonContainer_wTYxi">Submit</div>
                  </button>
              </div>
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
