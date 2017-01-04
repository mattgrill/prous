import axios from 'axios';
import qs from 'qs';

const Prous = class Prous {
  /**
   * Create a new instance of Prous.
   * @param {string} drupalDomain
   *   The base path where Drupal is listening.
   */
  constructor(drupalDomain) {
    this.qs = qs;
    this.axios = axios;
    this.drupalDomain = drupalDomain;
    this.tokenInformation = {};
  }
  /**
   * Fetch an OAuth Token.
   * @param {object} fetchOptions
   *   Options passed to the POST request.
   * @param {string} fetchOptions.grant_type
   *   The type of grant you are requesting.
   * @param {string} fetchOptions.client_id
   *   The ID of the OAuth Client.
   * @param {string} fetchOptions.client_secret
   *   The secret set when the Client was created.
   * @param {string} fetchOptions.username
   *   The resource owner username.
   * @param {string} fetchOptions.password
   *   The resource owner password.
   * @param {string} fetchOptions.scope
   *   The scope of the access request.
   */
  fetchToken(fetchOptions) {
    Object.assign(this.tokenInformation, fetchOptions);
    return axios.post(`${this.drupalDomain}/oauth/token`, qs.stringify(fetchOptions))
      .then(response => {
        Object.assign(this.tokenInformation, response.data);
        return response.data;
      });
  }
  /**
   * Refresh an OAuth Token.
   * @param {bool} [refreshOptions=false]
   *   Options passed to the POST request.
   *
   * @param {object} refreshOptions
   *   If you are requesting a refresh for a different OAuth token.
   * @param {string} refreshOptions.grant_type
   *   The type of grant you are requesting.
   * @param {string} refreshOptions.refresh_token
   *   The refresh token for the OAuth token you are trying to refresh.
   * @param {string} refreshOptions.client_id
   *   The ID of the OAuth Client.
   * @param {string} refreshOptions.client_secret
   *   The secret set when the Client was created.
   * @param {string} refreshOptions.scope
   *   The scope of the access request.
   */
  refreshToken(refreshOptions = false) {
    return axios.post(
      `${this.drupalDomain}/oauth/token`,
      qs.stringify(
        refreshOptions ?
        refreshOptions :
        {
          grant_type: 'refresh_token',
          refresh_token: this.tokenInformation.refresh_token,
          client_id: this.tokenInformation.client_id,
          client_secret: this.tokenInformation.client_secret,
          scope: this.tokenInformation.scope
        }
      )
    )
      .then(response => {
        Object.assign(this.tokenInformation, response.data);
        return response.data;
      });
  }
};

export default Prous;
