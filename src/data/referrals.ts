export type ReferralStatus = 'sent' | 'seen' | 'accepted' | 'scheduled' | 'done';

export type Referral = {
  id: string;
  patientName: string;
  patientAge: number;
  fromDoctor: string;
  toDoctor: string;
  specialty: string;
  reason: string;
  status: ReferralStatus;
  updatedAt: string;
};

export const referralStatusOrder: ReferralStatus[] = [
  'sent',
  'seen',
  'accepted',
  'scheduled',
  'done',
];

export const referralStatusLabel: Record<ReferralStatus, string> = {
  sent: 'पाठवले',
  seen: 'पाहिले',
  accepted: 'स्वीकारले',
  scheduled: 'वेळ ठरली',
  done: 'पूर्ण',
};

/** Mock referrals for the doctor-mode UI. */
export const referrals: Referral[] = [
  {
    id: 'r1',
    patientName: 'श्रीमती सुनीता जाधव',
    patientAge: 68,
    fromDoctor: 'डॉ. निलेश देशपांडे',
    toDoctor: 'डॉ. राहुल जोशी',
    specialty: 'मूत्रपिंड तज्ज्ञ',
    reason: 'लघवीत त्रास आणि पायांना सूज. क्रिएटिनिन वाढलेले.',
    status: 'accepted',
    updatedAt: 'आज 11:20',
  },
  {
    id: 'r2',
    patientName: 'श्री. रमेश कुलकर्णी',
    patientAge: 72,
    fromDoctor: 'डॉ. प्रशांत गायकवाड',
    toDoctor: 'डॉ. सुनील पाटील',
    specialty: 'हृदयरोग तज्ज्ञ',
    reason: 'गुडघ्याच्या दुखण्यासाठी औषध सुरू केल्यावर छातीत दुखणे.',
    status: 'scheduled',
    updatedAt: 'आज 9:05',
  },
  {
    id: 'r3',
    patientName: 'श्रीमती लता मोरे',
    patientAge: 61,
    fromDoctor: 'डॉ. स्वाती भोसले',
    toDoctor: 'डॉ. विक्रम शिंदे',
    specialty: 'कर्करोग तज्ज्ञ',
    reason: 'त्वचेवरील गाठ बरी होत नाही. तपासणीसाठी पाठवले.',
    status: 'seen',
    updatedAt: 'काल 6:40',
  },
];
