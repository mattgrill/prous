# prous

Fetch OAuth 2 Bearer tokens from Drupal.

```javascript
import Prous from 'prous';

const prous = new Prous('http://foo.dev');

// Fetch a token.
prous.fetchToken({
  grant_type: 'password',
  client_id: '22c6669c-82df-4efe-add3-5c3dca4d0f35',
  client_secret: 'foo',
  username: 'admin',
  password: 'foo',
  scope: 'administrator'
})
  .then(console.log)
  .catch(console.log)

// Refresh a token that has been fetched previously.
prous.refreshToken()
  .then(console.log)
  .catch(console.log);

// Refresh a different token.
prous.refreshToken({
  grant_type: 'refresh_token',
  refresh_token: '1234',
  client_id: '5678',
  client_secret: 'foo',
  scope: 'bar'
})
  .then(console.log)
  .catch(console.log);
```
