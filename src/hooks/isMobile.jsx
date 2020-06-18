import { useState, useEffect } from 'react';

// this isn't stateful
// because you don't need useEffect or useState you can
// make this a utility function instead. it doesn't need
// to me a hook
export const useIsMobile = () => {
  return !!window.navigator.userAgent.match(mobileMatch)
};

function getScreenDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState(getScreenDimensions());

  useEffect(() => {
    const handleResize = () => setScreenDimensions(getScreenDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenDimensions;
};
