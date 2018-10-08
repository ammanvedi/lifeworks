# LifeWorks Web Developer Coding Exercise

This is the web developer coding exercise for LifeWorks by Morneau Shepell.

The instructions will be supplied to you separately.

[Interested in LifeWorks?](https://github.com/workivate/web-dev-coding-exercise/tree/join-us)

## Getting Started

* Download our base repository.
* Install `node_modules` with either `npm` or `yarn`.
* The project has been setup with Webpack, React, Redux, (S)CSS Modules, Jest and Enzyme. You can get started with:
    * `npm start` - Run development site
    * `npm run build` - Build production site
    * `npm test` - Run Jest tests

You can find style settings such as colours and measurements in `/src/styles/`

## Details

### Amman's Wallet Widget

##### Component Structure and Usage of Redux
I have used redux to store the balance as in future this peice of information may be used by other components of the app. I have used redux thunk so i can dispatch an action to begin the http api call and be notified of its status.

Here is an architechtural diagram of my widget;

![alt text](https://i.imgur.com/c2slM3Y.png "Widget Diagram")

I have used the presentation container pattern here, blue indicates a container component and grey indicates a presentation container. Here is a quick run down of the container component responsibilities;

######BalanceContainer
This container handles fetching of the data via redux, updating the value stored in redux and maintaining a list of transactions.

######BalanceUpdaterContainer
This container maintains the state of the input element and performs input validation. It then invokes a callback on the BalanceContainer only when the input is ok for processing.

##### Considerations for Browser Support
There are two main things I have done when it comes to browser support. The first is the usage of [PolyfillIO](https://polyfill.io/v2/docs/) which is an awesome tool from the Financial Times. It will polyfill my non standard features which are;
 
  - Promises and Promise.finally
  - Fetch API
  - Intl API (for currency formatting)
 
But it will use the user agent string of the browser request to make sure polyfills are not served to a borwser that does not need them.

I have also updated the webpack build to use autoprefixer, making sure that any vendor prefixes that are needed are added.

##### Considerations for Accessibility
I have made use of an accessibility linter to make sure that i have provided correct aria roles for those using screen readers, i have also made sure that the wallet widget can be navigated buy keyboard.

##### Testing
I have used jest for testing as it was set up already, I have added a mock redux store and a promise.finally polyfill onto this to test my container components.

Thanks for reading !!
