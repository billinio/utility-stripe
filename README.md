# Stripe PSD2 Utility

Simple UI to retrieve tokens from Stripe. This utility fully supports:

- [SCA](https://en.wikipedia.org/wiki/Strong_customer_authentication) (Strong Customer Authentication)
- [PSD2](https://en.wikipedia.org/wiki/Payment_Services_Directive#Revised_Directive_on_Payment_Services_(PSD2)) (Payment Services Directive)
- [3DS](https://en.wikipedia.org/wiki/3-D_Secure) (3-D Secure)
- [3DS2](https://en.wikipedia.org/wiki/3-D_Secure#3-D_Secure_2.0) (3-D Secure 2.0)

**IMPORTANT**
**Stripe Utility is only intended to be run locally as a useful development utility. Do not use in a public environment as it requires secret keys that should never be exposed to the world.** 

**You should only use test Stripe API Keys. You will receive a warning if using a live key.**

-----

## Requirements

- [Node.js](https://nodejs.org/en/) 15.4+
- [npm](https://www.npmjs.com/) 7+

## Setup

**Clone the repo locally:**

```shell
$ git clone git@github.com:billinio/utility-stripe.git
$ cd ./utility-stripe
```

**Install the node dependencies:**

```shell
$ npm install
```

*This app must run under SSL. To create a locally self-signed SSL certificate for `localhost` follow [these instructions](https://gist.github.com/thekeogh/ed785cc0e8125731a6ff7fff306bc47e).*

**Install the generated `server.key` and `server.crt` to a root folder named `ssl/`:**

```shell
$ cp server.key ./ssl && cp server.crt ./ssl
```

**Create a `.env.local` file:**

```shell
$ touch .env.local
```

**Copy the following in to your `.env.local` file:**

```shell
REACT_APP_STRIPE_PUBLISHABLE_KEY=[your_public_stripe_key]
REACT_APP_STRIPE_SECRET_KEY=[your_secret_stripe_key]
```

*Do not use Stripe Utility in a public environment as it requires secret keys that should never be exposed to the world.*

**Start the server:**

```shell
$ npm start
# Browser opens at https://localhost
```

## 