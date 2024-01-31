import { useEffect, useState } from 'react';

const useAllLoading = (isLoadingArray) => {
  const [allLoading, setAllLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(isLoadingArray)) {
      const isAllFalse = isLoadingArray.every((isLoading) => isLoading === false);
      setAllLoading(!isAllFalse);
    }
  }, [isLoadingArray]);

  return allLoading;
};

export default useAllLoading;
