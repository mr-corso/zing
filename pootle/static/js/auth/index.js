/*
 * Copyright (C) Pootle contributors.
 * Copyright (C) Zing contributors.
 *
 * This file is a part of the Zing project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { q } from 'utils/dom';

import Auth from './containers/Auth';


const mountNodeSelector = '.js-auth';
const commonProps = {
  canContact: PTL.settings.CAN_CONTACT,
  canRegister: PTL.settings.SIGNUP_ENABLED,
  socialAuthProviders: PTL.settings.SOCIAL_AUTH_PROVIDERS,
};


export default {

  init(props) {
    $(document).on('click', '.js-login', (e) => {
      e.preventDefault();

      this.open(props);
    });
  },

  open(props) {
    const newProps = Object.assign({}, commonProps, props);

    ReactDOM.render(
      <Provider store={PTL.store}>
        <Auth onClose={this.close} {...newProps} />
      </Provider>,
      q(mountNodeSelector)
    );
  },

  close() {
    ReactDOM.unmountComponentAtNode(q(mountNodeSelector));
  },

};
