# melodeipts

Web application inspired by [Receiptify](https://receiptify.herokuapp.com/) that generates a downloadable receipt for users'
top tracks and artists from Spotify.

The application is [live](https://melodeipts.rumeetgoradia.com).

## Local development

This app requires [Node.js](https://nodejs.org/en/) to run. Once you have the repo cloned to your local machine, install the dependencies by running:
```
$ npm install
```
Then, the app can be ran locally:
```
$ npm run dev
```
You can access the local instance by visiting `http://localhost:3000` in your browser.
   
## Credentials

To actually use the app, you will need to obtain credentials for NextAuth and for Spotify for Developers. Create a file called `.env` in the root of this repo, and add the environment variables listed below to this file.

```
# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

### NextAuth

Generate a value for `NEXTAUTH_SECRET` by running the following command:

   $ openssl rand -base64 32
   
Also add `http://localhost:3000` for the `NEXTAUTH_URL` variable.

### Spotify

Create a new app through your [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/applications). Add `http://localhost:3000/api/auth/callback/spotify` to the Redirect URIs field. All other fields are up to you :)

Then, find your client ID and client secret, and assign `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to these values respectively.
