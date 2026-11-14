export type BodyRegion = {
  id: string;
  label: string;
};

export type Symptom = {
  id: string;
  regionId: string;
  label: string;
  /** One-line plain-Marathi gloss shown when tapped. */
  gloss: string;
  /** Which specialty this points to. */
  specialty: string;
};

export const bodyRegions: BodyRegion[] = [
  { id: 'head', label: 'डोकं' },
  { id: 'chest', label: 'छाती' },
  { id: 'abdomen', label: 'पोट' },
  { id: 'back', label: 'पाठ' },
  { id: 'arms', label: 'हात' },
  { id: 'legs', label: 'पाय' },
];

export const symptoms: Symptom[] = [
  {
    id: 's1',
    regionId: 'chest',
    label: 'छातीत दुखतंय',
    gloss: 'छातीत जडपणा किंवा दाब जाणवणे',
    specialty: 'हृदयरोग तज्ज्ञ',
  },
  {
    id: 's2',
    regionId: 'chest',
    label: 'धाप लागते',
    gloss: 'कमी कामातही श्वास लागणे',
    specialty: 'हृदयरोग तज्ज्ञ',
  },
  {
    id: 's3',
    regionId: 'head',
    label: 'डोकं दुखतंय',
    gloss: 'डोक्यात सतत वेदना किंवा जडपणा',
    specialty: 'सामान्य वैद्यक',
  },
  {
    id: 's4',
    regionId: 'head',
    label: 'चक्कर येते',
    gloss: 'उभे राहिल्यावर गरगरणे',
    specialty: 'सामान्य वैद्यक',
  },
  {
    id: 's5',
    regionId: 'abdomen',
    label: 'पोट दुखतंय',
    gloss: 'पोटात गोळा येणे किंवा वेदना',
    specialty: 'सामान्य वैद्यक',
  },
  {
    id: 's6',
    regionId: 'abdomen',
    label: 'लघवीत त्रास',
    gloss: 'लघवी करताना जळजळ किंवा वेदना',
    specialty: 'मूत्रपिंड तज्ज्ञ',
  },
  {
    id: 's7',
    regionId: 'back',
    label: 'पाठ दुखते',
    gloss: 'कंबरेत किंवा पाठीत सतत वेदना',
    specialty: 'अस्थिरोग तज्ज्ञ',
  },
  {
    id: 's8',
    regionId: 'legs',
    label: 'गुडघा दुखतो',
    gloss: 'चालताना गुडघ्यात वेदना',
    specialty: 'अस्थिरोग तज्ज्ञ',
  },
  {
    id: 's9',
    regionId: 'legs',
    label: 'पाय सुजतात',
    gloss: 'पायांना सूज येणे',
    specialty: 'मूत्रपिंड तज्ज्ञ',
  },
  {
    id: 's10',
    regionId: 'arms',
    label: 'हात सुन्न होतो',
    gloss: 'हातात मुंग्या येणे किंवा बधिरपणा',
    specialty: 'सामान्य वैद्यक',
  },
  {
    id: 's11',
    regionId: 'head',
    label: 'झोप येत नाही',
    gloss: 'रात्री झोप न लागणे',
    specialty: 'मानसिक आरोग्य तज्ज्ञ',
  },
  {
    id: 's12',
    regionId: 'legs',
    label: 'त्वचेवर पुरळ',
    gloss: 'अंगावर लाल चट्टे किंवा खाज',
    specialty: 'त्वचारोग तज्ज्ञ',
  },
];

export const severityOptions = ['सौम्य', 'मध्यम', 'तीव्र'] as const;
export const durationOptions = ['आज', '2–3 दिवस', 'आठवडा', 'जास्त'] as const;
