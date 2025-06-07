import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { NavigationContext } from '../contexts/NavigationContext';
import TransitionMaskText from '../components/TransitionMaskText';
import { ModelLoadingProvider } from '../contexts/ModelLoadingContext';
import "./globals.css";

// Preloader animation duration
const PRELOADER_DURATION = 7000; // 7 seconds total for preloader display

// Page transition states
const TRANSITION_STATES = {
  NONE: 'none',
  INITIAL: 'initial',
  ENTER: 'enter',
  PAUSE: 'pause',  // New state for pause between enter and exit
  EXIT: 'exit'
};

// Animation timing (ms)
const TIMING = {
  SLIDE_DURATION: 700,     // Duration of slide animations
  MIN_PAUSE_DURATION: 3000, // Minimum duration of pause (3 seconds)
  MODEL_CHECK_INTERVAL: 100 // Interval to check if 3D models are loaded (ms)
};

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

function MyApp({ Component, pageProps, resetLoading, modelsLoading, modelLoadingState }) {
  // Function to check if models are loaded and proceed with navigation
  const checkAndProceedWithNavigation = () => {
    // If both minimum pause time has elapsed and models are loaded (or there are no models)
    const modelsAreLoaded = !modelLoadingState || modelLoadingState.current.modelsLoaded;

    if (loadingState.current.minPauseElapsed && (!modelsLoading || modelsAreLoaded)) {
      // Proceed with navigation
      if (pendingNavigation.current) {
        const { url, options } = pendingNavigation.current;
        console.log('Models loaded, proceeding with navigation to:', url);

        // Use the original router method to avoid infinite loop
        if (options.replace) {
          originalReplace.current(url, undefined, options);
        } else {
          originalPush.current(url, undefined, options);
        }
      }
    } else {
      // Check again after a short interval
      setTimeout(checkAndProceedWithNavigation, TIMING.MODEL_CHECK_INTERVAL);
    }
  };
  const router = useRouter();
  const [lottieData, setLottieData] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [transitionState, setTransitionState] = useState(TRANSITION_STATES.NONE);

  // Store the current component and props
  const [pageState, setPageState] = useState({
    component: Component,
    props: pageProps,
    key: router.asPath // Add a key to force re-render
  });

  // Store the current route to prevent unnecessary transitions
  const currentRouteRef = useRef(router.asPath);

  // Store pending navigation
  const pendingNavigation = useRef(null);
  const isNavigating = useRef(false);

  // Track page loading and pause timing
  const loadingState = useRef({
    pageLoaded: false,
    pauseStartTime: 0,
    minPauseElapsed: false,
    modelsLoaded: true
  });

  // Track if we need to update the page title
  const nextPageTitle = useRef(null);

  // Track the transition text for each page
  const [transitionText, setTransitionText] = useState('');

  useEffect(() => {
    // Set scroll restoration to manual so we can control it
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Import Lottie animation data only on client-side
    import('../json/LOGO-ANI').then((animationData) => {
      setLottieData(animationData.default);
    });

    // Add enter class immediately to start the entry animation
    setTimeout(() => {
      const preloaderElement = document.querySelector('.preloader-container');
      if (preloaderElement) {
        preloaderElement.classList.add('enter');
      }
    }, 100); // Short delay to ensure DOM is ready

    // Start preloader exit animation after delay
    const startExitTimer = setTimeout(() => {
      // Add exit class to start the animation
      const preloaderElement = document.querySelector('.preloader-container');
      if (preloaderElement) {
        preloaderElement.classList.remove('enter');
        preloaderElement.classList.add('exit');
      }

      // Hide preloader after animation completes
      const hidePreloaderTimer = setTimeout(() => {
        setShowPreloader(false);
      }, 800); // Wait for animation to complete

      return () => clearTimeout(hidePreloaderTimer);
    }, PRELOADER_DURATION - 800); // Start exit animation before the end

    return () => clearTimeout(startExitTimer);
  }, []);

  // Update page state when Component or pageProps change
  useEffect(() => {
    setPageState({
      component: Component,
      props: pageProps,
      key: router.asPath
    });
    currentRouteRef.current = router.asPath;

    // Track initial page view in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-TBHW7ZE05K', {
        page_path: router.asPath,
      });
    }
  }, [Component, pageProps, router.asPath]);

  // Custom navigation function that delays actual navigation
  const navigateTo = (url, options = {}) => {
    // Don't queue the same URL or if already navigating
    if (url === currentRouteRef.current || isNavigating.current) return;

    // Store the pending navigation
    pendingNavigation.current = { url, options };
    isNavigating.current = true;

    // Start the transition animation
    startTransition();
  };

  // Store original router methods
  const originalPush = useRef(null);
  const originalReplace = useRef(null);

  // Function to start the transition animation
  const startTransition = () => {
    // Reset loading state
    loadingState.current = {
      pageLoaded: false,
      pauseStartTime: 0,
      minPauseElapsed: false
    };

    // First set the transition state to show the container
    setTransitionState(TRANSITION_STATES.INITIAL);

    // After a short delay, add the enter class to start the animation
    setTimeout(() => {
      setTransitionState(TRANSITION_STATES.ENTER);

      // After entry animation completes, set to pause state
      setTimeout(() => {
        setTransitionState(TRANSITION_STATES.PAUSE);

        // Record the time when pause started
        loadingState.current.pauseStartTime = Date.now();

        // Ensure we're at the top of the page during the pause state
        window.scrollTo(0, 0);

        // Generate page title and transition text from URL during pause state
        if (pendingNavigation.current) {
          const { url } = pendingNavigation.current;
          let pageTitle = 'URGE MANAGEMENT';
          let pageTransitionText = '';

          // Set custom transition text based on the URL
          if (url === '/') {
            pageTitle = 'Dream Big, Move Bold | URGE';
            pageTransitionText = 'WELCOME HOME';
          } else if (url === '/about') {
            pageTitle = 'Our Global Journey | URGE';
            pageTransitionText = 'OUR STORY';
          } else if (url === '/contact') {
            pageTitle = 'Let\'s Connect Now | URGE';
            pageTransitionText = 'REACH OUT';
          } else if (url.includes('/USA')) {
            pageTitle = 'American Dream Awaits | URGE';
            pageTransitionText = 'LAND OF OPPORTUNITY';
          } else if (url.includes('/UAE')) {
            pageTitle = 'Dubai Dreams Await | URGE';
            pageTransitionText = 'CITY OF GOLD';
          } else if (url.includes('/Canada')) {
            pageTitle = 'True North Strong | URGE';
            pageTransitionText = 'MAPLE COUNTRY';
          } else if (url.includes('/Australia')) {
            pageTitle = 'Down Under Dreams | URGE';
            pageTransitionText = 'AUSSIE ADVENTURE';
          } else if (url.includes('/UK')) {
            pageTitle = 'British Horizons Beckon | URGE';
            pageTransitionText = 'ROYAL KINGDOM';
          } else if (url.includes('/Europe')) {
            pageTitle = 'Continental Journeys | URGE';
            pageTransitionText = 'EURO DREAMS';
          } else if (url.includes('/Privacy&Policy')) {
            pageTitle = 'Privacy & Policy | URGE';
            pageTransitionText = 'Privacy & Policy';
          } else if (url.includes('/success_stories')) {
            pageTitle = 'Success Stories | URGE';
            pageTransitionText = 'OUR ACHIEVEMENTS';
          } else if (url.includes('/Terms&Conditions')) {
            pageTitle = 'Terms & Conditions | URGE';
            pageTransitionText = 'Terms & Conditions';
          } else {
            // Remove leading slash and convert to title case
            const pageName = url.substring(1)
              .split('/')
              .pop()
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            pageTitle = `${pageName} | URGE MANAGEMENT`;
            // Keep transition text shorter to ensure it fits
            pageTransitionText = pageName.length > 10
              ? pageName.substring(0, 10).toUpperCase()
              : pageName.toUpperCase();
          }

          // Update the document title and transition text during the pause state
          document.title = pageTitle;
          nextPageTitle.current = pageTitle;
          setTransitionText(pageTransitionText);
        }

        // Set a timer for the minimum pause duration
        setTimeout(() => {
          // Mark that minimum pause time has elapsed
          loadingState.current.minPauseElapsed = true;

          if (resetLoading) {
            // Reset model loading state for the new page
            resetLoading();
            if (modelLoadingState) {
              modelLoadingState.current.modelsLoaded = false;
            }
          }

          // Start checking if we can proceed with navigation
          checkAndProceedWithNavigation();
        }, TIMING.MIN_PAUSE_DURATION);
      }, TIMING.SLIDE_DURATION + 100); // Slide duration + small buffer
    }, 50); // Short delay to ensure DOM is ready
  };

  // Handle route change events
  useEffect(() => {
    // This happens after our controlled navigation
    const handleRouteChangeStart = (url) => {
      console.log('Route change start:', url); // Debug log

      // Mark the page as loading
      loadingState.current.pageLoaded = false;
    };

    const handleRouteChangeComplete = (url) => {
      console.log('Route change complete:', url); // Debug log

      // Update the current route reference
      currentRouteRef.current = url;

      // Scroll to top of the page
      window.scrollTo(0, 0);

      // Force update the page state with the new component and props
      // The key ensures React treats it as a new component
      setPageState({
        component: Component,
        props: pageProps,
        key: url
      });

      // Ensure the title is set correctly
      if (nextPageTitle.current) {
        document.title = nextPageTitle.current;
      }

      // Track page view in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-TBHW7ZE05K', {
          page_path: url,
        });
      }

      // Mark the page as loaded
      loadingState.current.pageLoaded = true;

      // Start the exit animation
      setTransitionState(TRANSITION_STATES.EXIT);

      // Reset to none after exit animation completes
      setTimeout(() => {
        setTransitionState(TRANSITION_STATES.NONE);
        isNavigating.current = false;
        pendingNavigation.current = null;
        nextPageTitle.current = null;
        setTransitionText(''); // Clear the transition text
      }, TIMING.SLIDE_DURATION + 100); // Slide duration + small buffer
    };

    // Intercept all navigation attempts
    originalPush.current = router.push;
    originalReplace.current = router.replace;

    // Override router.push
    router.push = function() {
      const url = arguments[0];
      const options = arguments[2] || {};

      // Skip our custom navigation if we're already in a transition
      if (isNavigating.current) {
        console.log('Using original push for:', url); // Debug log
        return originalPush.current.apply(this, arguments);
      }

      console.log('Custom navigation to:', url); // Debug log
      // Use our custom navigation function
      navigateTo(url, options);

      // Return a resolved promise to prevent errors
      return Promise.resolve(true);
    };

    // Override router.replace
    router.replace = function() {
      const url = arguments[0];
      const options = arguments[2] || {};
      options.replace = true;

      // Skip our custom navigation if we're already in a transition
      if (isNavigating.current) {
        console.log('Using original replace for:', url); // Debug log
        return originalReplace.current.apply(this, arguments);
      }

      console.log('Custom navigation (replace) to:', url); // Debug log
      // Use our custom navigation function
      navigateTo(url, options);

      // Return a resolved promise to prevent errors
      return Promise.resolve(true);
    };

    // Listen for route change events
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      // Restore original router methods
      if (originalPush.current) router.push = originalPush.current;
      if (originalReplace.current) router.replace = originalReplace.current;

      // Remove event listeners
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [Component, pageProps, router, router.asPath]);

  // Custom Link component that uses our controlled navigation
  const CustomLink = ({ href, children, ...props }) => {
    const handleClick = (e) => {
      e.preventDefault();
      navigateTo(href);
    };

    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  };

  return (
    <NavigationContext.Provider value={{ navigateTo, CustomLink }}>
      <>
      {/* Google Analytics Tag */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-TBHW7ZE05K"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TBHW7ZE05K');
          `,
        }}
      />

      <Head>
        {/* Global Meta Tags */}
        <meta property="og:title" content="URGE MANAGEMENT | Trusted Visa Consultancy" />
        <meta property="og:description" content="Explore visa options and immigration support with URGE MANAGEMENT. Discover paths for study, work, and living abroad." />
        <meta property="og:image" content="/images/default-OG.jpg" /> {/* Ensure this image path is correct */}
        <meta property="og:url" content="https://URGE MANAGEMENT.com" />
        <link rel="icon" href="/LOGO.svg" />

        {/* Meta tags end */}
      </Head>

      {/* Preloader with Lottie animation - only shown on initial load */}
      {showPreloader && (
        <div className="preloader-container">
          <div className="preloader-logo">
            {lottieData && (
              <Lottie
                animationData={lottieData}
                loop={false}
                className="lottie-center"
              />
            )}
          </div>
        </div>
      )}

      {/* Page transition overlay */}
      <div className={`page-transition ${transitionState}`}>
        {/* Custom masked text animation directly inside page-transition */}
        {transitionText && (
          <TransitionMaskText
            key={transitionText}
            text={transitionText}
            isExiting={transitionState === TRANSITION_STATES.EXIT}
          />
        )}
      </div>

      {/* Main content */}
      <div className="main-content">
        {React.createElement(pageState.component, {
          ...pageState.props,
          key: pageState.key
        })}
      </div>
    </>
    </NavigationContext.Provider>
  );
}

// Wrap the app with the model loading provider
function AppWithModelLoading(props) {
  return (
    <ModelLoadingProvider>
      <MyAppWithModelLoading {...props} />
    </ModelLoadingProvider>
  );
}

// Inner component that has access to the model loading context
import { useModelLoading } from '../contexts/ModelLoadingContext';

function MyAppWithModelLoading({ Component, pageProps }) {
  // Get the model loading state
  const { isLoading: modelsLoading, resetLoading } = useModelLoading();

  // Create a ref to track model loading status
  const modelLoadingState = useRef({
    modelsLoaded: true
  });

  // Update model loading status when it changes
  useEffect(() => {
    if (!modelsLoading) {
      console.log('All 3D models loaded');
      modelLoadingState.current.modelsLoaded = true;
    }
  }, [modelsLoading]);

  // Pass all props to the main app component
  return <MyApp
    Component={Component}
    pageProps={pageProps}
    resetLoading={resetLoading}
    modelsLoading={modelsLoading}
    modelLoadingState={modelLoadingState}
  />;
}

export default AppWithModelLoading;
