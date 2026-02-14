
export interface OperatingHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface Treatment {
  id: string;
  title: string;
  category: 'Signature Method' | 'Body Treatments' | 'Energy & Mind' | 'Luxury Beauty';
  image: string;
  price: string;
  duration: string;
  description: string;
  isPremium?: boolean;
  expectations?: string[];
  contraindications?: string[];
  eligibility?: string;
}

export interface Therapist {
  id: string;
  name: string;
  rating: number;
  image: string;
  bio: string;
  startingPrice: string;
  verified: boolean;
  clinicName: string;
  clinicAddress: string;
  postcode: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  operatingHours?: OperatingHour[];
  offeredTreatmentIds?: string[];
  distance?: string; 
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
}

export interface Transaction {
  id: string;
  bookingId: string;
  date: string;
  clientName: string;
  clinicName: string;
  totalAmount: number;
  depositAmount: number; // 20% platform fee
  status: 'completed' | 'pending' | 'refunded';
}

export interface VerificationDocument {
  id: string;
  type: 'insurance' | 'certification';
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  notes?: string;
}

export interface TherapistApplication extends Therapist {
  status: 'pending' | 'approved' | 'rejected';
  certificationsUrl?: string;
  insuranceUrl?: string;
  appliedDate: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  treatmentName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  postcode: string;
  totalPrice: number;
}

export interface BookingData {
  treatment: Treatment | null;
  therapist: Therapist | null;
  date: string | null;
  time: string | null;
  location: string;
  postcode: string;
  notes: string;
}

export interface SearchState {
  treatment: string;
  postcode: string;
}
