/**
 * Mock doctor network. Placeholder data for the UI phase —
 * not real practitioners, not real phone numbers.
 */

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyEn: string;
  qualifications: string;
  hospital: string;
  area: string;
  distanceKm: number;
  /** Human-readable slot label, or null when unavailable. */
  nextSlot: string | null;
  languages: string[];
  fee: number;
  verified: boolean;
  experienceYears: number;
  registrationNo: string;
  /** Illustrated avatar tint. */
  avatarTint: string;
};

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'डॉ. सुनील पाटील',
    specialty: 'हृदयरोग तज्ज्ञ',
    specialtyEn: 'Cardiologist',
    qualifications: 'MBBS, MD (Cardiology)',
    hospital: 'दीनानाथ मंगेशकर रुग्णालय',
    area: 'कर्वेनगर',
    distanceKm: 2.4,
    nextSlot: 'आज 4:30',
    languages: ['मराठी', 'हिंदी', 'इंग्रजी'],
    fee: 500,
    verified: true,
    experienceYears: 18,
    registrationNo: 'MH-2007-48231',
    avatarTint: '#E3F2EF',
  },
  {
    id: 'd2',
    name: 'डॉ. अनिता देशमुख',
    specialty: 'स्त्रीरोग तज्ज्ञ',
    specialtyEn: 'Gynaecologist',
    qualifications: 'MBBS, DGO',
    hospital: 'सह्याद्री रुग्णालय',
    area: 'कोथरूड',
    distanceKm: 3.1,
    nextSlot: 'उद्या 10:00',
    languages: ['मराठी', 'हिंदी'],
    fee: 400,
    verified: true,
    experienceYears: 12,
    registrationNo: 'MH-2013-51907',
    avatarTint: '#FDF1DC',
  },
  {
    id: 'd3',
    name: 'डॉ. राहुल जोशी',
    specialty: 'मूत्रपिंड तज्ज्ञ',
    specialtyEn: 'Nephrologist',
    qualifications: 'MBBS, DM (Nephrology)',
    hospital: 'रुबी हॉल क्लिनिक',
    area: 'शिवाजीनगर',
    distanceKm: 4.8,
    nextSlot: 'आज 6:00',
    languages: ['मराठी', 'इंग्रजी'],
    fee: 600,
    verified: true,
    experienceYears: 15,
    registrationNo: 'MH-2010-33412',
    avatarTint: '#E7F3E8',
  },
  {
    id: 'd4',
    name: 'डॉ. माधुरी कुलकर्णी',
    specialty: 'मानसिक आरोग्य तज्ज्ञ',
    specialtyEn: 'Psychiatrist',
    qualifications: 'MBBS, MD (Psychiatry)',
    hospital: 'स्वतःचा दवाखाना',
    area: 'बाणेर',
    distanceKm: 5.6,
    nextSlot: 'आज 5:00',
    languages: ['मराठी', 'हिंदी', 'इंग्रजी'],
    fee: 700,
    verified: true,
    experienceYears: 9,
    registrationNo: 'MH-2016-60128',
    avatarTint: '#EFECE4',
  },
  {
    id: 'd5',
    name: 'डॉ. प्रशांत गायकवाड',
    specialty: 'अस्थिरोग तज्ज्ञ',
    specialtyEn: 'Orthopaedic surgeon',
    qualifications: 'MBBS, MS (Orthopaedics)',
    hospital: 'सान्चेती रुग्णालय',
    area: 'शिवाजीनगर',
    distanceKm: 6.2,
    nextSlot: null,
    languages: ['मराठी', 'हिंदी'],
    fee: 450,
    verified: true,
    experienceYears: 21,
    registrationNo: 'MH-2004-22190',
    avatarTint: '#E3F2EF',
  },
  {
    id: 'd6',
    name: 'डॉ. स्वाती भोसले',
    specialty: 'त्वचारोग तज्ज्ञ',
    specialtyEn: 'Dermatologist',
    qualifications: 'MBBS, MD (Dermatology)',
    hospital: 'स्वतःचा दवाखाना',
    area: 'हडपसर',
    distanceKm: 7.0,
    nextSlot: 'आज 3:30',
    languages: ['मराठी'],
    fee: 350,
    verified: false,
    experienceYears: 7,
    registrationNo: 'MH-2018-74502',
    avatarTint: '#FDF1DC',
  },
  {
    id: 'd7',
    name: 'डॉ. विक्रम शिंदे',
    specialty: 'कर्करोग तज्ज्ञ',
    specialtyEn: 'Oncologist',
    qualifications: 'MBBS, MD, DM (Oncology)',
    hospital: 'जेहानगीर रुग्णालय',
    area: 'औंध',
    distanceKm: 8.4,
    nextSlot: 'उद्या 11:00',
    languages: ['मराठी', 'हिंदी', 'इंग्रजी'],
    fee: 900,
    verified: true,
    experienceYears: 16,
    registrationNo: 'MH-2009-41277',
    avatarTint: '#E7F3E8',
  },
  {
    id: 'd8',
    name: 'डॉ. निलेश देशपांडे',
    specialty: 'सामान्य वैद्यक',
    specialtyEn: 'General physician',
    qualifications: 'MBBS',
    hospital: 'प्राथमिक आरोग्य केंद्र',
    area: 'कात्रज',
    distanceKm: 1.2,
    nextSlot: 'आज 2:00',
    languages: ['मराठी', 'हिंदी'],
    fee: 200,
    verified: false,
    experienceYears: 5,
    registrationNo: 'MH-2020-88731',
    avatarTint: '#EFECE4',
  },
];

export function initials(name: string) {
  const cleaned = name.replace(/^डॉ\.\s*/, '').trim();
  const parts = cleaned.split(/\s+/);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}
