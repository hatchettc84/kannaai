import { Redirect } from 'expo-router';

// This tab redirects to the cart screen
export default function MapRedirect() {
  return <Redirect href="/cart" />;
}
