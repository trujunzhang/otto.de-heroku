import React from 'react';
import {ListContainer, DocumentContainer} from "meteor/utilities:react-list-container";

const Header = ({currentUser}) => {

    return (
      <div className="header_2k8Jf medium-header">
          <div className="metabar constraintWidth_ZyYbM">

              <Telescope.components.HeaderContent currentUser={currentUser}/>
          </div>
      </div>
    )
};

Header.displayName = "Header";

module.exports = Header;
