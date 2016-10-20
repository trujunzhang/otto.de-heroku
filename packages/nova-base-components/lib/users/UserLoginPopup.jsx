import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

class UserLoginPopup extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState = {
            formState: 'MAIN', // ["MAIN","SIGNIN","REGISTER","RESET_PASSWD","FORGET_PASSWD"]
        };
    }

    switchFormState(event, state) {
        event.preventDefault();
        this.setState({formState: state});
    }

    renderCloseIcon() {
        return (
          <a className="modal--close v-desktop" onClick={()=>this.context.messages.appStatus.dismissLoginUI()} title="Close">
                    <span>
                        <svg width="12" height="12" viewBox="0 0 12 12">
                            <path
                              d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"
                            ></path>
                        </svg>
                    </span>
          </a>
        )
    }

    render() {
        return (
          <div className="modal-overlay v-fullscreen">
              <Telescope.components.UserLoginMain switchFormState={this.switchFormState.bind(this)}/>
              {this.renderCloseIcon()}
          </div>
        )
    }
}

UserLoginPopup.contextTypes = {
    messages: React.PropTypes.object
};

UserLoginPopup.displayName = "UserLoginPopup";

module.exports = UserLoginPopup;
