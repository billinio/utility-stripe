import { useState } from "react";

export const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = () => {
    setIsLoading(true);
    NProgress.start();
  };

  const loaded = () => {
    setIsLoading(false);
    NProgress.done();
  };

  return { isLoading, loading, loaded };
};
