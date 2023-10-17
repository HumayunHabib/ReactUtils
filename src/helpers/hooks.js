import { useEffect, useState } from "react";

export const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width, height };
};

export const usePreventBackNavigation = () => {
  useEffect(() => {
    const preventBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBackNavigation);

    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);
};

export const useBeforeUnload = (message = "") => {
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    if (message) {
      e.returnValue = message;
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message]);
};

export const useGoogleRecaptchaReady = () => {
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;

    script.onload = () => setRecaptchaReady(true);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return recaptchaReady;
};
