interface Config {
  environment: "development" | "production" | "test";
  stripe: {
    publicKey: string;
    secretKey: string;
  };
}

export const config: Readonly<Config> = Object.freeze({
  environment: process.env.NODE_ENV || "development",
  stripe: {
    publicKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string,
    secretKey: process.env.REACT_APP_STRIPE_SECRET_KEY as string,
  },
});
