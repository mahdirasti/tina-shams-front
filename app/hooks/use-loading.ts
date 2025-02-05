"use client";

import { useState } from "react";

const useLoading = (defaultState: boolean = false) => {
  const [isLoading, setLoading] = useState(defaultState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { isLoading, startLoading, stopLoading };
};
export default useLoading;
