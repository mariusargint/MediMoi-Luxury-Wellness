
import { Therapist } from '../types';

/**
 * Mocks distance calculation between a user postcode and clinic postcodes.
 * In a real app, this would use a Geo-coding API or a pre-calculated distance matrix.
 */
export const sortByProximity = (postcode: string, clinics: Therapist[]): Therapist[] => {
  // Mock sorting logic: Clinics with postcodes starting with the same letters are "closer"
  const normalizedUser = postcode.trim().toUpperCase().slice(0, 2);
  
  return [...clinics].sort((a, b) => {
    const aMatch = a.postcode.toUpperCase().startsWith(normalizedUser);
    const bMatch = b.postcode.toUpperCase().startsWith(normalizedUser);
    
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  }).map((clinic, index) => ({
    ...clinic,
    // Inject mock distances
    distance: clinic.distance || `${(0.4 + index * 0.7).toFixed(1)} miles away`
  }));
};
