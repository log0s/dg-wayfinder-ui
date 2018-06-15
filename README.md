# dg-wayfinder

This is a simple UI designed to work with [dg-wayfinder](https://github.com/log0s/dg-wayfinder). Please see that repo for more detailed instructions

-------------------------------------------------------------------------------------------------------

## Development

```
# Initial local setup
git clone git@github.com:log0s/dg-wayfinder-ui.git
cd dg-wayfinder-ui
npm install
cp .env.template .env

# Start local development server on http://localhost:8080
npm run dev
```

You will need to either run an instance of the `dg-wayfinder` API locally or point to a remote instance by changing the `REACT_APP_WAYFINDER_API_URL` variable in your `.env` file.