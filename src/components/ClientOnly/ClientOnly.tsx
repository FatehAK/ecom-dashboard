import { useState, useEffect } from 'react';

// see: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return children;
};

export default ClientOnly;
