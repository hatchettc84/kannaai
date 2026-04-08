import { create } from 'zustand';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  permissionStatus: 'undetermined' | 'granted' | 'denied';
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  latitude: null,
  longitude: null,
  city: null,
  permissionStatus: 'undetermined',
  isLoading: false,
  error: null,

  requestPermission: async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      set({ permissionStatus: granted ? 'granted' : 'denied' });
      return granted;
    } catch (error) {
      set({ permissionStatus: 'denied', error: 'Failed to request location permission' });
      return false;
    }
  },

  getCurrentLocation: async () => {
    set({ isLoading: true, error: null });
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      // Try to reverse geocode for city name
      let city: string | null = null;
      try {
        const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (place) {
          city = place.city || place.subregion || place.region || null;
        }
      } catch {
        // Reverse geocode is nice-to-have, not critical
      }

      set({
        latitude,
        longitude,
        city,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: 'Unable to get your location. Please check your settings.',
      });
    }
  },
}));
