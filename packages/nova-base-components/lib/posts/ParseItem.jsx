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

class ParseItem extends Component {

    render() {
        const item = this.props.item;
        const updatedAt = moment(item.postedAt).format("YYYY/MM/DD");

        return (
          <tr
            className="iedit author-other level-0 post-64943 type-post status-draft format-standard has-post-thumbnail hentry category-all-reads tag-article-208 tag-cauvery-basin tag-cauvery-dispute tag-cauvery-water-disputes-tribunal tag-dipak-misra tag-houses-of-legislature tag-inter-state-river-water-disputes-act tag-karnataka tag-rules-of-procedure tag-supreme-court tag-tamil-nadu tag-uday-umesh-lalit">
              <th scope="row" className="check-column">
                  <label className="screen-reader-text">{"Select " + item.title}</label>
                  <input id="cb-select" type="checkbox" name="post[]"/>
                  <div className="locked-indicator"></div>
              </th>
              <td className="title column-title has-row-actions column-primary page-title">
                  <h1>{item.url}</h1>
              </td>
              <td className="tags column-tags">
                  <h1>{item.pageNumber}</h1>
              </td>
              <td className="comments column-comments">
                  <h1>{item.totalNumber}</h1>
              </td>
              <td className="date column-date">Last Modified<br/>
                  <abbr title={updatedAt}>{updatedAt}</abbr>
              </td>
          </tr>
        )
    }

}

ParseItem.contextTypes = {
    messages: React.PropTypes.object
};

ParseItem.displayName = "ParseItem";

module.exports = withRouter(ParseItem);
export default withRouter(ParseItem);
