import test from 'ava';

const rs = require('require-subvert')(__dirname);

test('Creation', t => {
  const Prous = rs.require('../lib/index').default;
  t.true(new Prous('http://foo.dev') instanceof Prous);
});

test('Fetch Token', t => {
  rs.subvert('axios', {
    post: () => Promise.resolve({data: {foo: 'bar'}})
  });
  const Prous = rs.require('../lib/index').default;
  const prous = new Prous('http://foo.dev');
  prous.fetchToken({})
    .then(r => t.deepEqual(r, {foo: 'bar'}));
});

test('Refresh Token', t => {
  rs.subvert('axios', {
    post: () => Promise.resolve({data: {foo: 'bar'}})
  });
  const Prous = rs.require('../lib/index').default;
  const prous = new Prous('http://foo.dev');
  prous.refreshToken({
    grant_type: 'refresh_token',
    refresh_token: '1234',
    client_id: '5678',
    client_secret: 'foo',
    scope: 'bar'
  })
    .then(r => t.deepEqual(r, {foo: 'bar'}));
});

test('Refresh Token with Saved State', t => {
  rs.subvert('axios', {
    post: () => Promise.resolve({data: {foo: 'bar'}})
  });
  const Prous = rs.require('../lib/index').default;
  const prous = new Prous('http://foo.dev');
  prous.tokenInformation = {
    grant_type: 'refresh_token',
    refresh_token: '1234',
    client_id: '5678',
    client_secret: 'foo',
    scope: 'bar'
  };
  prous.refreshToken()
    .then(r => t.deepEqual(r, {foo: 'bar'}));
});
