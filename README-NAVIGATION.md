# Controlled Navigation System

This project uses a custom navigation system that ensures page transitions happen in a controlled manner, with animations occurring before the actual route change.

## How It Works

1. When a link is clicked, the navigation is intercepted
2. The transition animation starts and reaches the PAUSE state
3. After a 3-second delay, the actual navigation happens
4. The page content changes during the transition
5. The exit animation completes, revealing the new page

## How to Use

### Using the Custom Link Component

```jsx
import Link from '../components/Link';

function MyComponent() {
  return (
    <div>
      <Link href="/about">About Us</Link>
      <Link href="/contact" className="button">Contact Us</Link>
    </div>
  );
}
```

### Using Programmatic Navigation

```jsx
import { useNavigation } from '../contexts/NavigationContext';

function MyComponent() {
  const { navigateTo } = useNavigation();
  
  const handleButtonClick = () => {
    navigateTo('/dashboard');
  };
  
  return (
    <div>
      <button onClick={handleButtonClick}>Go to Dashboard</button>
    </div>
  );
}
```

### Important Notes

1. Do NOT use Next.js's `<Link>` component or `router.push()` directly, as they will bypass the transition system
2. Always use our custom `<Link>` component or the `navigateTo()` function
3. The page content will only change during the PAUSE state of the transition
4. The browser tab title will also update during the PAUSE state

This system ensures a smooth, consistent user experience with properly timed animations and page changes.
