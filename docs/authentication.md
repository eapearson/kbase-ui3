# Authentication

Authentication at kbase is provided by the auth service via an oauth flow.

The process of authentication is handled by the auth plugin. The auth plugin handles the oauth flow, user interfaces for login, signup, and so forth.

The app picks up after a token is assigned. Then auth plugin informs the ui app of a successfully authentication (or request to remove authentication) via redux action messages. Then authentication cookie (kbase_session) is set by the ui, not by the auth plugin.

Even though the ui app essentially trusts plugins including the auth plugin, it does not accept any assertions about a token (e.g. associated username), rather it always verifies and obtains authentication information itself through the kbase auth api.

The app recognizes authentication state.

## 

