export type Hospital = {
  id: string;
  name: string;
  area: string;
  distanceKm: number;
  etaMin: number;
  emergency24x7: boolean;
  phone: string;
};

/** Mock hospitals — placeholder data for the UI phase. */
export const hospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'दीनानाथ मंगेशकर रुग्णालय',
    area: 'कर्वेनगर',
    distanceKm: 2.4,
    etaMin: 8,
    emergency24x7: true,
    phone: '020-4000 1001',
  },
  {
    id: 'h2',
    name: 'सह्याद्री रुग्णालय',
    area: 'कोथरूड',
    distanceKm: 3.1,
    etaMin: 11,
    emergency24x7: true,
    phone: '020-4000 1002',
  },
  {
    id: 'h3',
    name: 'रुबी हॉल क्लिनिक',
    area: 'शिवाजीनगर',
    distanceKm: 4.8,
    etaMin: 16,
    emergency24x7: true,
    phone: '020-4000 1003',
  },
  {
    id: 'h4',
    name: 'जेहानगीर रुग्णालय',
    area: 'औंध',
    distanceKm: 8.4,
    etaMin: 24,
    emergency24x7: false,
    phone: '020-4000 1004',
  },
  {
    id: 'h5',
    name: 'ससून सर्वोपचार रुग्णालय',
    area: 'शिवाजीनगर',
    distanceKm: 5.2,
    etaMin: 18,
    emergency24x7: true,
    phone: '020-4000 1005',
  },
];
