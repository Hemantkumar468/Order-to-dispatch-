export const defaultMockParties = [
  { _id: 'p-1', code: 'SUNRISE', name: 'Sunrise Home Appliances Ltd.', location: 'Chennai', state: 'Tamil Nadu', creditPeriodDays: 45, leadTimeDays: 10, contactPerson: 'Rajesh Kumar', email: 'rajesh@sunrise.com', phone: '9876543210', gstNo: '33AABCS1234F1Z5' },
  { _id: 'p-2', code: 'PRIMEPACK', name: 'PrimePack Industries Pvt. Ltd.', location: 'Jaipur', state: 'Rajasthan', creditPeriodDays: 30, leadTimeDays: 6, contactPerson: 'Amit Sharma', email: 'amit@primepack.in', phone: '9876543211', gstNo: '08AABCP5678G2Z3' },
  { _id: 'p-3', code: 'SHARMA', name: 'Sharma Electricals & Trading Co.', location: 'New Delhi', state: 'Delhi', creditPeriodDays: 30, leadTimeDays: 20, contactPerson: 'Vikram Sharma', email: 'vikram@sharmaelec.com', phone: '9876543212', gstNo: '07AABCS9012H3Z1' },
  { _id: 'p-4', code: 'ZENITH', name: 'Zenith Electronics Ltd.', location: 'Baddi', state: 'Himachal Pradesh', creditPeriodDays: 45, leadTimeDays: 6, contactPerson: 'Priya Singh', email: 'priya@zenith.co.in', phone: '9876543213', gstNo: '02AABCZ3456I4Z9' },
  { _id: 'p-5', code: 'ROYAL', name: 'Royal Kitchen Appliances Pvt. Ltd.', location: 'Nagpur', state: 'Maharashtra', creditPeriodDays: 30, leadTimeDays: 10, contactPerson: 'Suresh Patel', email: 'suresh@royalkitchen.in', phone: '9876543214', gstNo: '27AABCR7890J5Z7' },
  { _id: 'p-6', code: 'NEXGEN', name: 'NexGen Technologies Pvt. Ltd.', location: 'Pune', state: 'Maharashtra', creditPeriodDays: 30, leadTimeDays: 10, contactPerson: 'Deepak Joshi', email: 'deepak@nexgen.tech', phone: '9876543215', gstNo: '27AABCN2345K6Z5' },
  { _id: 'p-7', code: 'BHARAT', name: 'Bharat Consumer Electronics Ltd.', location: 'Ahmedabad', state: 'Gujarat', creditPeriodDays: 45, leadTimeDays: 8, contactPerson: 'Manish Trivedi', email: 'manish@bharat-elec.in', phone: '9876543216', gstNo: '24AABCB6789L7Z3' },
  { _id: 'p-8', code: 'TATA', name: 'Tata Home Products Pvt. Ltd.', location: 'Mumbai', state: 'Maharashtra', creditPeriodDays: 60, leadTimeDays: 12, contactPerson: 'Anand Mehta', email: 'anand@tatahome.com', phone: '9876543217', gstNo: '27AABCT1234M8Z1' },
  { _id: 'p-9', code: 'ORIENT', name: 'Orient Appliances India Ltd.', location: 'Kolkata', state: 'West Bengal', creditPeriodDays: 30, leadTimeDays: 15, contactPerson: 'Sanjay Ghosh', email: 'sanjay@orientapp.in', phone: '9876543218', gstNo: '19AABCO5678N9Z9' },
  { _id: 'p-10', code: 'HAVELLS', name: 'Havells India Kitchen Division', location: 'Noida', state: 'Uttar Pradesh', creditPeriodDays: 45, leadTimeDays: 7, contactPerson: 'Ravi Agarwal', email: 'ravi@havells-kd.com', phone: '9876543219', gstNo: '09AABCH9012O0Z7' },
  { _id: 'p-11', code: 'CROMPTON', name: 'Crompton Greaves Consumer Ltd.', location: 'Vadodara', state: 'Gujarat', creditPeriodDays: 30, leadTimeDays: 9, contactPerson: 'Nilesh Patel', email: 'nilesh@crompton.in', phone: '9876543220', gstNo: '24AABCC3456P1Z5' },
  { _id: 'p-12', code: 'BAJAJ', name: 'Bajaj Electricals Ltd.', location: 'Aurangabad', state: 'Maharashtra', creditPeriodDays: 45, leadTimeDays: 11, contactPerson: 'Kiran Deshmukh', email: 'kiran@bajaj-elec.com', phone: '9876543221', gstNo: '27AABCB7890Q2Z3' },
];

export const getStoredParties = () => {
  try {
    const raw = localStorage.getItem('dpes_custom_parties');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse stored parties:', e);
    return [];
  }
};

export const saveStoredParty = (party) => {
  try {
    const current = getStoredParties();
    const updated = [party, ...current.filter(p => p._id !== party._id && p.code !== party.code)];
    localStorage.setItem('dpes_custom_parties', JSON.stringify(updated));
    window.dispatchEvent(new Event('parties-updated'));
    return updated;
  } catch (e) {
    console.error('Failed to save party to storage:', e);
    return [];
  }
};
