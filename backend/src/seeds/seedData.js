/**
 * Seed data for Hemant Global ERP system.
 * Comprehensive mock data: Parties, SKUs, Sales Orders, Delivery Challans, FMS, PPC & Schedules.
 */

// ── PARTIES ─────────────────────────────────────────────────
export const partiesData = [
  { code: 'SUNRISE',   name: 'Sunrise Home Appliances Ltd.',       location: 'Chennai',     state: 'Tamil Nadu',       creditPeriodDays: 45, leadTimeDays: 10, contactPerson: 'Rajesh Kumar',    email: 'rajesh@sunrise.com',     phone: '9876543210', gstNo: '33AABCS1234F1Z5' },
  { code: 'PRIMEPACK', name: 'PrimePack Industries Pvt. Ltd.',     location: 'Jaipur',      state: 'Rajasthan',        creditPeriodDays: 30, leadTimeDays: 6,  contactPerson: 'Amit Sharma',     email: 'amit@primepack.in',      phone: '9876543211', gstNo: '08AABCP5678G2Z3' },
  { code: 'SHARMA',    name: 'Sharma Electricals & Trading Co.',   location: 'New Delhi',   state: 'Delhi',            creditPeriodDays: 30, leadTimeDays: 20, contactPerson: 'Vikram Sharma',    email: 'vikram@sharmaelec.com',  phone: '9876543212', gstNo: '07AABCS9012H3Z1' },
  { code: 'ZENITH',    name: 'Zenith Electronics Ltd.',            location: 'Baddi',       state: 'Himachal Pradesh', creditPeriodDays: 45, leadTimeDays: 6,  contactPerson: 'Priya Singh',     email: 'priya@zenith.co.in',     phone: '9876543213', gstNo: '02AABCZ3456I4Z9' },
  { code: 'ROYAL',     name: 'Royal Kitchen Appliances Pvt. Ltd.', location: 'Nagpur',      state: 'Maharashtra',      creditPeriodDays: 30, leadTimeDays: 10, contactPerson: 'Suresh Patel',    email: 'suresh@royalkitchen.in', phone: '9876543214', gstNo: '27AABCR7890J5Z7' },
  { code: 'NEXGEN',    name: 'NexGen Technologies Pvt. Ltd.',      location: 'Pune',        state: 'Maharashtra',      creditPeriodDays: 30, leadTimeDays: 10, contactPerson: 'Deepak Joshi',    email: 'deepak@nexgen.tech',     phone: '9876543215', gstNo: '27AABCN2345K6Z5',
    addresses: [{ label: 'Plant', line1: 'Plot No. 45, Phase II, MIDC Industrial Area', line2: 'Chakan-Talegaon Road, Khed', city: 'Pune', state: 'Maharashtra', pin: '410501' }] },
  { code: 'BHARAT',    name: 'Bharat Consumer Electronics Ltd.',   location: 'Ahmedabad',   state: 'Gujarat',          creditPeriodDays: 45, leadTimeDays: 8,  contactPerson: 'Manish Trivedi',  email: 'manish@bharat-elec.in',  phone: '9876543216', gstNo: '24AABCB6789L7Z3' },
  { code: 'TATA',      name: 'Tata Home Products Pvt. Ltd.',       location: 'Mumbai',      state: 'Maharashtra',      creditPeriodDays: 60, leadTimeDays: 12, contactPerson: 'Anand Mehta',     email: 'anand@tatahome.com',     phone: '9876543217', gstNo: '27AABCT1234M8Z1' },
  { code: 'ORIENT',    name: 'Orient Appliances India Ltd.',       location: 'Kolkata',     state: 'West Bengal',      creditPeriodDays: 30, leadTimeDays: 15, contactPerson: 'Sanjay Ghosh',    email: 'sanjay@orientapp.in',    phone: '9876543218', gstNo: '19AABCO5678N9Z9' },
  { code: 'HAVELLS',   name: 'Havells India Kitchen Division',     location: 'Noida',       state: 'Uttar Pradesh',    creditPeriodDays: 45, leadTimeDays: 7,  contactPerson: 'Ravi Agarwal',    email: 'ravi@havells-kd.com',    phone: '9876543219', gstNo: '09AABCH9012O0Z7' },
  { code: 'CROMPTON',  name: 'Crompton Greaves Consumer Ltd.',     location: 'Vadodara',    state: 'Gujarat',          creditPeriodDays: 30, leadTimeDays: 9,  contactPerson: 'Nilesh Patel',    email: 'nilesh@crompton.in',     phone: '9876543220', gstNo: '24AABCC3456P1Z5' },
  { code: 'BAJAJ',     name: 'Bajaj Electricals Ltd.',             location: 'Aurangabad',  state: 'Maharashtra',      creditPeriodDays: 45, leadTimeDays: 11, contactPerson: 'Kiran Deshmukh',  email: 'kiran@bajaj-elec.com',   phone: '9876543221', gstNo: '27AABCB7890Q2Z3' },
];

// ── SKUs ─────────────────────────────────────────────────────
export const skusData = [
  { code: 'ST1500-202', name: 'Steele 1.5 Ltr',              category: 'Mixer Jar',  pcsPerBox: 100, weightPerPc: 0.27,   fgStock: 2500, wipStock: 800 },
  { code: 'ST1000-202', name: 'Steele 1.0 Ltr',              category: 'Mixer Jar',  pcsPerBox: 100, weightPerPc: 0.187,  fgStock: 3200, wipStock: 600 },
  { code: 'GX1500-202', name: 'Galaxy 1.5 Ltr',              category: 'Mixer Jar',  pcsPerBox: 100, weightPerPc: 0.27,   fgStock: 1800, wipStock: 1200 },
  { code: 'GX1000-202', name: 'Galaxy 1.0 Ltr',              category: 'Mixer Jar',  pcsPerBox: 100, weightPerPc: 0.187,  fgStock: 2100, wipStock: 500 },
  { code: 'TB1500-204', name: 'Taper Jar - Bidding 1.5 Ltr', category: 'Mixer Jar',  pcsPerBox: 100, weightPerPc: 0.25,   fgStock: 1500, wipStock: 700 },
  { code: 'TP0750-202', name: 'Taper Jar - Patti 0.750 Ltr', category: 'Mixer Jar',  pcsPerBox: 100, weightPerPc: 0.15,   fgStock: 2000, wipStock: 400 },
  { code: 'PP-WET',     name: 'PP Wet',        category: 'PP Jar',     pcsPerBox: 120, weightPerPc: 0.266,  fgStock: 5000, wipStock: 2000 },
  { code: 'PP-DRY',     name: 'PP Dry',        category: 'PP Jar',     pcsPerBox: 120, weightPerPc: 0.233,  fgStock: 4800, wipStock: 1800 },
  { code: 'PP-CHUTNEY', name: 'PP Chutney',    category: 'PP Jar',     pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 6000, wipStock: 2500 },
  { code: 'PPF-WET',    name: 'PP Flat Wet',   category: 'PP Flat',    pcsPerBox: 120, weightPerPc: 0.266,  fgStock: 3500, wipStock: 1500 },
  { code: 'PPF-DRY',    name: 'PP Flat Dry',   category: 'PP Flat',    pcsPerBox: 120, weightPerPc: 0.233,  fgStock: 3500, wipStock: 1500 },
  { code: 'PPF-CHUT',   name: 'PP Flat Chutney',category:'PP Flat',    pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 4000, wipStock: 1800 },
  { code: 'VA-WET',     name: 'VA Wet',        category: 'VA Jar',     pcsPerBox: 120, weightPerPc: 0.266,  fgStock: 2800, wipStock: 1000 },
  { code: 'VA-DRY',     name: 'VA Dry',        category: 'VA Jar',     pcsPerBox: 120, weightPerPc: 0.233,  fgStock: 2600, wipStock: 900 },
  { code: 'VA-CHUT',    name: 'VA Chutney',    category: 'VA Jar',     pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 3200, wipStock: 1100 },
  { code: 'VF-WET',     name: 'Value Flat Wet',    category: 'Value Flat', pcsPerBox: 120, weightPerPc: 0.266,  fgStock: 2000, wipStock: 800 },
  { code: 'VF-DRY',     name: 'Value Flat Dry',    category: 'Value Flat', pcsPerBox: 120, weightPerPc: 0.233,  fgStock: 2000, wipStock: 800 },
  { code: 'VF-CHUT',    name: 'Value Flat Chutney', category:'Value Flat', pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 2400, wipStock: 900 },
  { code: 'CHUT-KAT',   name: 'Chutney Katori',   category: 'Katori',     pcsPerBox: 144, weightPerPc: 0.1514, fgStock: 10000, wipStock: 5000 },
  { code: 'DOME-JAR',   name: 'Dome Jar',          category: 'Jar',        pcsPerBox: 105, weightPerPc: 0.3307, fgStock: 4000, wipStock: 2000 },
  { code: 'FLAT-JAR',   name: 'Flat Jar',          category: 'Jar',        pcsPerBox: 120, weightPerPc: 0.275,  fgStock: 3500, wipStock: 1500 },
  { code: 'GRIND-JAR',  name: 'Grinder Jar',       category: 'Jar',        pcsPerBox: 126, weightPerPc: 0.2445, fgStock: 5000, wipStock: 2500 },
  { code: 'MG11-WET',   name: 'MG 1.1 Wet Jar',   category: 'MG Jar',     pcsPerBox: 120, weightPerPc: 0.25,   fgStock: 3000, wipStock: 1200 },
  { code: 'MG11-DRY',   name: 'MG 1.1 Dry Jar',   category: 'MG Jar',     pcsPerBox: 120, weightPerPc: 0.25,   fgStock: 3000, wipStock: 1200 },
  { code: 'MG11-CHUT',  name: 'MG 1.1 Chutney Jar',category:'MG Jar',     pcsPerBox: 180, weightPerPc: 0.15,   fgStock: 4500, wipStock: 1800 },
  { code: 'BL-750',     name: 'Blender Jar 750ml',  category: 'Blender',   pcsPerBox: 100, weightPerPc: 0.32,   fgStock: 1500, wipStock: 600 },
  { code: 'BL-1000',    name: 'Blender Jar 1.0 Ltr',category: 'Blender',   pcsPerBox: 100, weightPerPc: 0.38,   fgStock: 1200, wipStock: 500 },
  { code: 'JC-500',     name: 'Juicer Jar 500ml',   category: 'Juicer',    pcsPerBox: 150, weightPerPc: 0.18,   fgStock: 2000, wipStock: 800 },
];

// ── SALES ORDERS ─────────────────────────────────────────────
export const ordersData = [
  // ── FY 24-25 (Completed) ──────────────────────────────────
  {
    soNumber: 'AGL/SO-001/24-25', poNumber: '4600035357', partyCode: 'ZENITH',
    orderDate: '2024-04-04', leadTimeDays: 6,
    items: [
      { skuCode: 'VA-WET',  orderQty: 1100, dispatchedQty: 1080, remark: 'Short Close' },
      { skuCode: 'VA-DRY',  orderQty: 1000, dispatchedQty: 960,  remark: 'Short Close' },
      { skuCode: 'VA-CHUT', orderQty: 500,  dispatchedQty: 360,  remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-002/24-25', poNumber: '1100009188', partyCode: 'PRIMEPACK',
    orderDate: '2024-04-05', leadTimeDays: 6,
    items: [
      { skuCode: 'PPF-WET',  orderQty: 3500, dispatchedQty: 3240, remark: 'Short Close' },
      { skuCode: 'PPF-DRY',  orderQty: 3500, dispatchedQty: 3240, remark: 'Short Close' },
      { skuCode: 'PPF-CHUT', orderQty: 3500, dispatchedQty: 3240, remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-003/24-25', poNumber: 'U2/2425/P-000064', partyCode: 'SHARMA',
    orderDate: '2024-04-08', leadTimeDays: 20,
    items: [
      { skuCode: 'CHUT-KAT',  orderQty: 80000, dispatchedQty: 79920, remark: 'Short Close' },
      { skuCode: 'DOME-JAR',  orderQty: 30000, dispatchedQty: 30030 },
      { skuCode: 'FLAT-JAR',  orderQty: 10000, dispatchedQty: 9960, remark: 'Short Close' },
      { skuCode: 'GRIND-JAR', orderQty: 40000, dispatchedQty: 39942, remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-004/24-25', poNumber: '4600036282', partyCode: 'ZENITH',
    orderDate: '2024-04-16', leadTimeDays: 6,
    items: [
      { skuCode: 'VA-WET',  orderQty: 1500, dispatchedQty: 1440, remark: 'Short Close' },
      { skuCode: 'VA-DRY',  orderQty: 1500, dispatchedQty: 1440, remark: 'Short Close' },
      { skuCode: 'VA-CHUT', orderQty: 1500, dispatchedQty: 1440, remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-005/24-25', poNumber: 'BH-2024-0042', partyCode: 'BHARAT',
    orderDate: '2024-04-20', leadTimeDays: 8,
    items: [
      { skuCode: 'PP-WET',     orderQty: 5000, dispatchedQty: 4920, remark: 'Short Close' },
      { skuCode: 'PP-DRY',     orderQty: 5000, dispatchedQty: 4920, remark: 'Short Close' },
      { skuCode: 'PP-CHUTNEY', orderQty: 3000, dispatchedQty: 2880, remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-006/24-25', poNumber: '4600035476', partyCode: 'ZENITH',
    orderDate: '2024-05-05', leadTimeDays: 6,
    items: [
      { skuCode: 'VA-WET',  orderQty: 2000, dispatchedQty: 2040, remark: 'Extra Sent' },
      { skuCode: 'VA-DRY',  orderQty: 2200, dispatchedQty: 2160, remark: 'Short Close' },
      { skuCode: 'VA-CHUT', orderQty: 2300, dispatchedQty: 2340, remark: 'Extra Sent' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-007/24-25', poNumber: '343', partyCode: 'SUNRISE',
    orderDate: '2024-04-22', leadTimeDays: 10,
    items: [
      { skuCode: 'ST1500-202', orderQty: 4556, dispatchedQty: 4500, remark: 'Short Close' },
      { skuCode: 'ST1000-202', orderQty: 3484, dispatchedQty: 3400, remark: 'Short Close' },
      { skuCode: 'GX1500-202', orderQty: 7236, dispatchedQty: 4900, remark: 'Short Close' },
      { skuCode: 'GX1000-202', orderQty: 4154, dispatchedQty: 4100, remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-008/24-25', poNumber: '1100010108', partyCode: 'PRIMEPACK',
    orderDate: '2024-04-30', leadTimeDays: 20,
    items: [
      { skuCode: 'PP-WET', orderQty: 21000, dispatchedQty: 21120, remark: 'Extra Sent' },
      { skuCode: 'PP-DRY', orderQty: 21000, dispatchedQty: 0 },
    ],
    status: 'IN_PROGRESS',
  },
  // ── FY 25-26 Orders ──────────────────────────────────────
  {
    soNumber: 'AGL/SO-001/25-26', poNumber: 'TH-2025-1001', partyCode: 'TATA',
    orderDate: '2025-04-10', leadTimeDays: 12,
    items: [
      { skuCode: 'ST1500-202', orderQty: 5000, dispatchedQty: 5000 },
      { skuCode: 'GX1500-202', orderQty: 3000, dispatchedQty: 3000 },
      { skuCode: 'GX1000-202', orderQty: 2000, dispatchedQty: 2000 },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-002/25-26', poNumber: '5120', partyCode: 'SUNRISE',
    orderDate: '2025-12-17', leadTimeDays: 10,
    items: [
      { skuCode: 'ST1500-202', orderQty: 3484, dispatchedQty: 0 },
      { skuCode: 'ST1000-202', orderQty: 2412, dispatchedQty: 0 },
      { skuCode: 'GX1500-202', orderQty: 1608, dispatchedQty: 200 },
      { skuCode: 'GX1000-202', orderQty: 1608, dispatchedQty: 0 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-003/25-26', poNumber: 'PODM02773/25-26', partyCode: 'ROYAL',
    orderDate: '2025-12-17', leadTimeDays: 10,
    items: [
      { skuCode: 'TB1500-204', orderQty: 3000, dispatchedQty: 1800 },
      { skuCode: 'TP0750-202', orderQty: 2000, dispatchedQty: 2000 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-004/25-26', poNumber: 'OR-2025-7788', partyCode: 'ORIENT',
    orderDate: '2025-08-15', leadTimeDays: 15,
    items: [
      { skuCode: 'DOME-JAR',  orderQty: 15000, dispatchedQty: 12600 },
      { skuCode: 'FLAT-JAR',  orderQty: 10000, dispatchedQty: 8400 },
      { skuCode: 'GRIND-JAR', orderQty: 20000, dispatchedQty: 15120 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-005/25-26', poNumber: 'HV-2025-3344', partyCode: 'HAVELLS',
    orderDate: '2025-09-01', leadTimeDays: 7,
    items: [
      { skuCode: 'VF-WET',  orderQty: 4000, dispatchedQty: 3600 },
      { skuCode: 'VF-DRY',  orderQty: 4000, dispatchedQty: 3600 },
      { skuCode: 'VF-CHUT', orderQty: 2500, dispatchedQty: 2340 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-006/25-26', poNumber: 'CG-2025-9900', partyCode: 'CROMPTON',
    orderDate: '2025-10-20', leadTimeDays: 9,
    items: [
      { skuCode: 'PP-WET',     orderQty: 8000, dispatchedQty: 4800 },
      { skuCode: 'PP-DRY',     orderQty: 8000, dispatchedQty: 4800 },
      { skuCode: 'PP-CHUTNEY', orderQty: 5000, dispatchedQty: 3060 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-007/25-26', poNumber: 'BJ-2025-5566', partyCode: 'BAJAJ',
    orderDate: '2025-11-05', leadTimeDays: 11,
    items: [
      { skuCode: 'BL-750',  orderQty: 3000, dispatchedQty: 1500 },
      { skuCode: 'BL-1000', orderQty: 2000, dispatchedQty: 1000 },
      { skuCode: 'JC-500',  orderQty: 5000, dispatchedQty: 3000 },
    ],
    status: 'IN_PROGRESS',
  },
  // ── FY 26-27 Orders ──────────────────────────────────────
  {
    soNumber: 'AGL/SO-001/26-27', poNumber: 'BH-2026-1122', partyCode: 'BHARAT',
    orderDate: '2026-04-05', leadTimeDays: 8,
    items: [
      { skuCode: 'PPF-WET',  orderQty: 6000, dispatchedQty: 6000 },
      { skuCode: 'PPF-DRY',  orderQty: 6000, dispatchedQty: 6000 },
      { skuCode: 'PPF-CHUT', orderQty: 4000, dispatchedQty: 3960, remark: 'Short Close' },
    ],
    status: 'COMPLETED',
  },
  {
    soNumber: 'AGL/SO-002/26-27', poNumber: '4101248803', partyCode: 'NEXGEN',
    orderDate: '2026-03-27', leadTimeDays: 10,
    items: [
      { skuCode: 'MG11-WET',  orderQty: 6700,  dispatchedQty: 4992 },
      { skuCode: 'MG11-DRY',  orderQty: 15900, dispatchedQty: 4992 },
      { skuCode: 'MG11-CHUT', orderQty: 15900, dispatchedQty: 5040 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-003/26-27', poNumber: 'TH-2026-2233', partyCode: 'TATA',
    orderDate: '2026-05-15', leadTimeDays: 12,
    items: [
      { skuCode: 'ST1500-202', orderQty: 8000, dispatchedQty: 3200 },
      { skuCode: 'ST1000-202', orderQty: 6000, dispatchedQty: 2400 },
      { skuCode: 'GX1500-202', orderQty: 4000, dispatchedQty: 1600 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-004/26-27', poNumber: 'SR-2026-4455', partyCode: 'SUNRISE',
    orderDate: '2026-06-01', leadTimeDays: 10,
    items: [
      { skuCode: 'CHUT-KAT', orderQty: 50000, dispatchedQty: 20160 },
      { skuCode: 'DOME-JAR', orderQty: 25000, dispatchedQty: 10500 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-005/26-27', poNumber: 'HV-2026-6677', partyCode: 'HAVELLS',
    orderDate: '2026-07-10', leadTimeDays: 7,
    items: [
      { skuCode: 'VA-WET',  orderQty: 3000, dispatchedQty: 1200 },
      { skuCode: 'VA-DRY',  orderQty: 3000, dispatchedQty: 1200 },
      { skuCode: 'VA-CHUT', orderQty: 2000, dispatchedQty: 720 },
    ],
    status: 'IN_PROGRESS',
  },
  {
    soNumber: 'AGL/SO-006/26-27', poNumber: 'ZN-2026-8899', partyCode: 'ZENITH',
    orderDate: '2026-08-20', leadTimeDays: 6,
    items: [
      { skuCode: 'VF-WET',  orderQty: 5000, dispatchedQty: 0 },
      { skuCode: 'VF-DRY',  orderQty: 5000, dispatchedQty: 0 },
      { skuCode: 'VF-CHUT', orderQty: 3000, dispatchedQty: 0 },
    ],
    status: 'RECEIVED',
  },
  {
    soNumber: 'AGL/SO-007/26-27', poNumber: 'PM-2026-1010', partyCode: 'PRIMEPACK',
    orderDate: '2026-09-15', leadTimeDays: 6,
    items: [
      { skuCode: 'PP-WET',     orderQty: 12000, dispatchedQty: 0 },
      { skuCode: 'PP-DRY',     orderQty: 12000, dispatchedQty: 0 },
      { skuCode: 'PP-CHUTNEY', orderQty: 8000,  dispatchedQty: 0 },
    ],
    status: 'RECEIVED',
  },
  {
    soNumber: 'AGL/SO-008/26-27', poNumber: 'CG-2026-1111', partyCode: 'CROMPTON',
    orderDate: '2026-10-01', leadTimeDays: 9,
    items: [
      { skuCode: 'BL-750',  orderQty: 4000, dispatchedQty: 0 },
      { skuCode: 'BL-1000', orderQty: 3000, dispatchedQty: 0 },
      { skuCode: 'JC-500',  orderQty: 6000, dispatchedQty: 0 },
    ],
    status: 'RECEIVED',
  },
];

// ── DELIVERY CHALLANS ───────────────────────────────────────
export const challansData = [
  // FY 24-25 Challans
  {
    dcNumber: 'HK/DC-001/24-25', soNumber: 'AGL/SO-005/24-25', partyCode: 'BHARAT', dcDate: '2024-04-01',
    vehicleNo: 'GJ-01-AB-1234',
    items: [
      { skuName: 'PP Wet',     quantityPcs: 2400, noOfBoxes: 20, pcsPerBox: 120, weightKg: 638.4 },
      { skuName: 'PP Dry',     quantityPcs: 2400, noOfBoxes: 20, pcsPerBox: 120, weightKg: 559.2 },
      { skuName: 'PP Chutney', quantityPcs: 1440, noOfBoxes: 8,  pcsPerBox: 180, weightKg: 189.6 },
    ],
  },
  {
    dcNumber: 'HK/DC-002/24-25', soNumber: 'AGL/SO-007/24-25', partyCode: 'SUNRISE', dcDate: '2024-04-02',
    vehicleNo: 'TN-01-CD-5678',
    items: [
      { skuName: 'Steele 1.5 Ltr', quantityPcs: 800,  noOfBoxes: 8,  pcsPerBox: 100, weightKg: 216 },
      { skuName: 'Steele 1.0 Ltr', quantityPcs: 100,  noOfBoxes: 1,  pcsPerBox: 100, weightKg: 18.7 },
      { skuName: 'Galaxy 1.5 Ltr', quantityPcs: 1600, noOfBoxes: 16, pcsPerBox: 100, weightKg: 432 },
      { skuName: 'Galaxy 1.0 Ltr', quantityPcs: 1400, noOfBoxes: 14, pcsPerBox: 100, weightKg: 261.8 },
    ],
  },
  {
    dcNumber: 'HK/DC-003/24-25', soNumber: 'AGL/SO-008/24-25', partyCode: 'PRIMEPACK', dcDate: '2024-04-04',
    vehicleNo: 'RJ-14-EF-9012',
    items: [
      { skuName: 'PP Wet',     quantityPcs: 4200, noOfBoxes: 35, pcsPerBox: 120, weightKg: 1118.25 },
      { skuName: 'PP Dry',     quantityPcs: 4200, noOfBoxes: 35, pcsPerBox: 120, weightKg: 978.6 },
      { skuName: 'PP Chutney', quantityPcs: 4140, noOfBoxes: 23, pcsPerBox: 180, weightKg: 545.1 },
    ],
  },
  {
    dcNumber: 'HK/DC-004/24-25', soNumber: 'AGL/SO-007/24-25', partyCode: 'SUNRISE', dcDate: '2024-04-06',
    vehicleNo: 'MH-04-GH-3456',
    items: [
      { skuName: 'Galaxy 1.5 Ltr', quantityPcs: 1500, noOfBoxes: 15, pcsPerBox: 100, weightKg: 405 },
      { skuName: 'Galaxy 1.0 Ltr', quantityPcs: 1400, noOfBoxes: 14, pcsPerBox: 100, weightKg: 261.8 },
    ],
  },
  {
    dcNumber: 'HK/DC-005/24-25', soNumber: 'AGL/SO-003/24-25', partyCode: 'SHARMA', dcDate: '2024-04-07',
    vehicleNo: 'DL-01-IJ-7890',
    items: [
      { skuName: 'Grinder Jar',    quantityPcs: 9324,  noOfBoxes: 74,  pcsPerBox: 126, weightKg: 2279.2 },
      { skuName: 'Chutney Katori', quantityPcs: 15552, noOfBoxes: 108, pcsPerBox: 144, weightKg: 2354.4 },
      { skuName: 'Dome Jar',       quantityPcs: 1785,  noOfBoxes: 17,  pcsPerBox: 105, weightKg: 589.9 },
      { skuName: 'Flat Jar',       quantityPcs: 2040,  noOfBoxes: 17,  pcsPerBox: 120, weightKg: 561 },
    ],
  },
  {
    dcNumber: 'HK/DC-006/24-25', soNumber: 'AGL/SO-001/24-25', partyCode: 'ZENITH', dcDate: '2024-04-09',
    vehicleNo: 'HP-01-KL-1234',
    items: [
      { skuName: 'VA Wet',     quantityPcs: 1080, noOfBoxes: 9, pcsPerBox: 120, weightKg: 287.55 },
      { skuName: 'VA Dry',     quantityPcs: 960,  noOfBoxes: 8, pcsPerBox: 120, weightKg: 223.68 },
      { skuName: 'VA Chutney', quantityPcs: 360,  noOfBoxes: 2, pcsPerBox: 180, weightKg: 47.4 },
    ],
  },
  {
    dcNumber: 'HK/DC-007/24-25', soNumber: 'AGL/SO-004/24-25', partyCode: 'ZENITH', dcDate: '2024-04-09',
    vehicleNo: 'HP-01-MN-5678',
    items: [
      { skuName: 'Value Flat Wet',     quantityPcs: 2040, noOfBoxes: 17, pcsPerBox: 120, weightKg: 543.15 },
      { skuName: 'Value Flat Dry',     quantityPcs: 2040, noOfBoxes: 17, pcsPerBox: 120, weightKg: 475.32 },
      { skuName: 'Value Flat Chutney', quantityPcs: 1980, noOfBoxes: 11, pcsPerBox: 180, weightKg: 260.7 },
    ],
  },
  {
    dcNumber: 'HK/DC-008/24-25', soNumber: 'AGL/SO-005/24-25', partyCode: 'BHARAT', dcDate: '2024-04-25',
    vehicleNo: 'GJ-01-OP-9012',
    items: [
      { skuName: 'PP Wet',     quantityPcs: 2520, noOfBoxes: 21, pcsPerBox: 120, weightKg: 670.3 },
      { skuName: 'PP Dry',     quantityPcs: 2520, noOfBoxes: 21, pcsPerBox: 120, weightKg: 587.16 },
      { skuName: 'PP Chutney', quantityPcs: 1440, noOfBoxes: 8,  pcsPerBox: 180, weightKg: 189.6 },
    ],
  },
  // FY 25-26 Challans
  {
    dcNumber: 'HK/DC-001/25-26', soNumber: 'AGL/SO-001/25-26', partyCode: 'TATA', dcDate: '2025-04-15',
    vehicleNo: 'MH-01-QR-3456',
    items: [
      { skuName: 'Steele 1.5 Ltr', quantityPcs: 2500, noOfBoxes: 25, pcsPerBox: 100, weightKg: 675 },
      { skuName: 'Galaxy 1.5 Ltr', quantityPcs: 1500, noOfBoxes: 15, pcsPerBox: 100, weightKg: 405 },
      { skuName: 'Galaxy 1.0 Ltr', quantityPcs: 1000, noOfBoxes: 10, pcsPerBox: 100, weightKg: 187 },
    ],
  },
  {
    dcNumber: 'HK/DC-002/25-26', soNumber: 'AGL/SO-001/25-26', partyCode: 'TATA', dcDate: '2025-04-25',
    vehicleNo: 'MH-01-ST-7890',
    items: [
      { skuName: 'Steele 1.5 Ltr', quantityPcs: 2500, noOfBoxes: 25, pcsPerBox: 100, weightKg: 675 },
      { skuName: 'Galaxy 1.5 Ltr', quantityPcs: 1500, noOfBoxes: 15, pcsPerBox: 100, weightKg: 405 },
      { skuName: 'Galaxy 1.0 Ltr', quantityPcs: 1000, noOfBoxes: 10, pcsPerBox: 100, weightKg: 187 },
    ],
  },
  {
    dcNumber: 'HK/DC-003/25-26', soNumber: 'AGL/SO-004/25-26', partyCode: 'ORIENT', dcDate: '2025-08-25',
    vehicleNo: 'WB-01-UV-1234',
    items: [
      { skuName: 'Dome Jar',    quantityPcs: 6300, noOfBoxes: 60, pcsPerBox: 105, weightKg: 2083.4 },
      { skuName: 'Flat Jar',    quantityPcs: 4200, noOfBoxes: 35, pcsPerBox: 120, weightKg: 1155 },
      { skuName: 'Grinder Jar', quantityPcs: 7560, noOfBoxes: 60, pcsPerBox: 126, weightKg: 1848.4 },
    ],
  },
  {
    dcNumber: 'HK/DC-004/25-26', soNumber: 'AGL/SO-005/25-26', partyCode: 'HAVELLS', dcDate: '2025-09-10',
    vehicleNo: 'UP-01-WX-5678',
    items: [
      { skuName: 'Value Flat Wet',     quantityPcs: 1800, noOfBoxes: 15, pcsPerBox: 120, weightKg: 478.8 },
      { skuName: 'Value Flat Dry',     quantityPcs: 1800, noOfBoxes: 15, pcsPerBox: 120, weightKg: 419.4 },
      { skuName: 'Value Flat Chutney', quantityPcs: 1260, noOfBoxes: 7,  pcsPerBox: 180, weightKg: 165.9 },
    ],
  },
  {
    dcNumber: 'HK/DC-005/25-26', soNumber: 'AGL/SO-005/25-26', partyCode: 'HAVELLS', dcDate: '2025-09-25',
    vehicleNo: 'UP-01-YZ-9012',
    items: [
      { skuName: 'Value Flat Wet',     quantityPcs: 1800, noOfBoxes: 15, pcsPerBox: 120, weightKg: 478.8 },
      { skuName: 'Value Flat Dry',     quantityPcs: 1800, noOfBoxes: 15, pcsPerBox: 120, weightKg: 419.4 },
      { skuName: 'Value Flat Chutney', quantityPcs: 1080, noOfBoxes: 6,  pcsPerBox: 180, weightKg: 142.2 },
    ],
  },
  {
    dcNumber: 'HK/DC-006/25-26', soNumber: 'AGL/SO-006/25-26', partyCode: 'CROMPTON', dcDate: '2025-11-05',
    vehicleNo: 'GJ-06-AB-3456',
    items: [
      { skuName: 'PP Wet',     quantityPcs: 2400, noOfBoxes: 20, pcsPerBox: 120, weightKg: 638.4 },
      { skuName: 'PP Dry',     quantityPcs: 2400, noOfBoxes: 20, pcsPerBox: 120, weightKg: 559.2 },
      { skuName: 'PP Chutney', quantityPcs: 1620, noOfBoxes: 9,  pcsPerBox: 180, weightKg: 213.3 },
    ],
  },
  {
    dcNumber: 'HK/DC-007/25-26', soNumber: 'AGL/SO-006/25-26', partyCode: 'CROMPTON', dcDate: '2025-11-20',
    vehicleNo: 'GJ-06-CD-7890',
    items: [
      { skuName: 'PP Wet',     quantityPcs: 2400, noOfBoxes: 20, pcsPerBox: 120, weightKg: 638.4 },
      { skuName: 'PP Dry',     quantityPcs: 2400, noOfBoxes: 20, pcsPerBox: 120, weightKg: 559.2 },
      { skuName: 'PP Chutney', quantityPcs: 1440, noOfBoxes: 8,  pcsPerBox: 180, weightKg: 189.6 },
    ],
  },
  {
    dcNumber: 'HK/DC-008/25-26', soNumber: 'AGL/SO-007/25-26', partyCode: 'BAJAJ', dcDate: '2025-11-20',
    vehicleNo: 'MH-20-EF-1234',
    items: [
      { skuName: 'Blender Jar 750ml',  quantityPcs: 1500, noOfBoxes: 15, pcsPerBox: 100, weightKg: 480 },
      { skuName: 'Blender Jar 1.0 Ltr',quantityPcs: 1000, noOfBoxes: 10, pcsPerBox: 100, weightKg: 380 },
      { skuName: 'Juicer Jar 500ml',   quantityPcs: 3000, noOfBoxes: 20, pcsPerBox: 150, weightKg: 540 },
    ],
  },
  // FY 26-27 Challans
  {
    dcNumber: 'HK/DC-001/26-27', soNumber: 'AGL/SO-001/26-27', partyCode: 'BHARAT', dcDate: '2026-04-12',
    vehicleNo: 'GJ-01-GH-5678',
    items: [
      { skuName: 'PP Flat Wet',     quantityPcs: 3000, noOfBoxes: 25, pcsPerBox: 120, weightKg: 798 },
      { skuName: 'PP Flat Dry',     quantityPcs: 3000, noOfBoxes: 25, pcsPerBox: 120, weightKg: 699 },
      { skuName: 'PP Flat Chutney', quantityPcs: 2160, noOfBoxes: 12, pcsPerBox: 180, weightKg: 284.5 },
    ],
  },
  {
    dcNumber: 'HK/DC-002/26-27', soNumber: 'AGL/SO-001/26-27', partyCode: 'BHARAT', dcDate: '2026-04-22',
    vehicleNo: 'GJ-01-IJ-9012',
    items: [
      { skuName: 'PP Flat Wet',     quantityPcs: 3000, noOfBoxes: 25, pcsPerBox: 120, weightKg: 798 },
      { skuName: 'PP Flat Dry',     quantityPcs: 3000, noOfBoxes: 25, pcsPerBox: 120, weightKg: 699 },
      { skuName: 'PP Flat Chutney', quantityPcs: 1800, noOfBoxes: 10, pcsPerBox: 180, weightKg: 237.1 },
    ],
  },
  {
    dcNumber: 'HK/DC-003/26-27', soNumber: 'AGL/SO-003/26-27', partyCode: 'TATA', dcDate: '2026-05-25',
    vehicleNo: 'MH-01-KL-3456',
    items: [
      { skuName: 'Steele 1.5 Ltr', quantityPcs: 3200, noOfBoxes: 32, pcsPerBox: 100, weightKg: 864 },
      { skuName: 'Steele 1.0 Ltr', quantityPcs: 2400, noOfBoxes: 24, pcsPerBox: 100, weightKg: 448.8 },
      { skuName: 'Galaxy 1.5 Ltr', quantityPcs: 1600, noOfBoxes: 16, pcsPerBox: 100, weightKg: 432 },
    ],
  },
  {
    dcNumber: 'HK/DC-004/26-27', soNumber: 'AGL/SO-004/26-27', partyCode: 'SUNRISE', dcDate: '2026-06-15',
    vehicleNo: 'TN-01-MN-7890',
    items: [
      { skuName: 'Chutney Katori', quantityPcs: 20160, noOfBoxes: 140, pcsPerBox: 144, weightKg: 3052.2 },
      { skuName: 'Dome Jar',       quantityPcs: 10500, noOfBoxes: 100, pcsPerBox: 105, weightKg: 3472.4 },
    ],
  },
  {
    dcNumber: 'HK/DC-005/26-27', soNumber: 'AGL/SO-005/26-27', partyCode: 'HAVELLS', dcDate: '2026-07-20',
    vehicleNo: 'UP-01-OP-1234',
    items: [
      { skuName: 'VA Wet',     quantityPcs: 1200, noOfBoxes: 10, pcsPerBox: 120, weightKg: 319.2 },
      { skuName: 'VA Dry',     quantityPcs: 1200, noOfBoxes: 10, pcsPerBox: 120, weightKg: 279.6 },
      { skuName: 'VA Chutney', quantityPcs: 720,  noOfBoxes: 4,  pcsPerBox: 180, weightKg: 94.8 },
    ],
  },
];

// ── FMS DATA (Invoices + Shipments + Payments) ──────────────
export const fmsData = [
  // FY 24-25
  {
    dcNumber: 'HK/DC-001/24-25', invoiceNo: 'AGL/TI-001/24-25', invoiceDate: '2024-04-01',
    partyCode: 'BHARAT', invoiceAmount: 524200, amountReceived: 524200,
    transporterName: 'Gujarat Roadways', transportType: 'Freight Paid',
    deliveryDate: '2024-04-08', creditPeriodDays: 45,
    receivedDate: '2024-05-15', receivedAmount: 524200,
  },
  {
    dcNumber: 'HK/DC-002/24-25', invoiceNo: 'AGL/TI-002/24-25', invoiceDate: '2024-04-02',
    partyCode: 'SUNRISE', invoiceAmount: 388751, amountReceived: 388751,
    transporterName: 'Shailendra Transport', transportType: 'Freight Paid',
    deliveryDate: '2024-04-09', creditPeriodDays: 45,
    receivedDate: '2024-05-22', receivedAmount: 388751,
  },
  {
    dcNumber: 'HK/DC-003/24-25', invoiceNo: 'AGL/TI-003/24-25', invoiceDate: '2024-04-04',
    partyCode: 'PRIMEPACK', invoiceAmount: 947004, amountReceived: 947004,
    transporterName: 'Om Logistics Ltd', lrNumber: '28628623', transportType: 'Freight Paid',
    deliveryDate: '2024-04-15', creditPeriodDays: 30,
    receivedDate: '2024-05-15', receivedAmount: 947004.26,
  },
  {
    dcNumber: 'HK/DC-004/24-25', invoiceNo: 'AGL/TI-004/24-25', invoiceDate: '2024-04-06',
    partyCode: 'SUNRISE', invoiceAmount: 278131, amountReceived: 278131,
    transporterName: 'Vishwakarma Logistics Ltd', lrNumber: 'MH-04-JU-1406', transportType: 'Freight Paid',
    deliveryDate: '2024-04-14', creditPeriodDays: 45,
    receivedDate: '2024-05-22', receivedAmount: 278131,
  },
  {
    dcNumber: 'HK/DC-005/24-25', invoiceNo: 'AGL/TI-005/24-25', invoiceDate: '2024-04-07',
    partyCode: 'SHARMA', invoiceAmount: 2428727, amountReceived: 2428727,
    transporterName: 'Aggarwal Roadlines', lrNumber: '42398', transportType: 'Freight Paid',
    deliveryDate: '2024-04-11', creditPeriodDays: 30,
    receivedDate: '2024-05-24', receivedAmount: 2428727,
  },
  {
    dcNumber: 'HK/DC-006/24-25', invoiceNo: 'AGL/TI-006/24-25', invoiceDate: '2024-04-09',
    partyCode: 'ZENITH', invoiceAmount: 210307, amountReceived: 210307,
    transporterName: 'Om Logistics Ltd', lrNumber: '28628667', transportType: 'Freight Paid',
    deliveryDate: '2024-04-14', creditPeriodDays: 45,
    receivedDate: '2024-06-04', receivedAmount: 210307,
  },
  {
    dcNumber: 'HK/DC-007/24-25', invoiceNo: 'AGL/TI-007/24-25', invoiceDate: '2024-04-09',
    partyCode: 'ZENITH', invoiceAmount: 456200, amountReceived: 456200,
    transporterName: 'Om Logistics Ltd', lrNumber: '28628670', transportType: 'Freight Paid',
    deliveryDate: '2024-04-15', creditPeriodDays: 45,
    receivedDate: '2024-06-04', receivedAmount: 456200,
  },
  {
    dcNumber: 'HK/DC-008/24-25', invoiceNo: 'AGL/TI-008/24-25', invoiceDate: '2024-04-25',
    partyCode: 'BHARAT', invoiceAmount: 568350, amountReceived: 568350,
    transporterName: 'Gujarat Roadways', transportType: 'Freight Paid',
    deliveryDate: '2024-05-02', creditPeriodDays: 45,
    receivedDate: '2024-06-10', receivedAmount: 568350,
  },
  // FY 25-26
  {
    dcNumber: 'HK/DC-001/25-26', invoiceNo: 'AGL/TI-001/25-26', invoiceDate: '2025-04-15',
    partyCode: 'TATA', invoiceAmount: 725000, amountReceived: 725000,
    transporterName: 'Gati Express', lrNumber: 'GT-25-0001', transportType: 'Freight Paid',
    deliveryDate: '2025-04-25', creditPeriodDays: 60,
    receivedDate: '2025-06-20', receivedAmount: 725000,
  },
  {
    dcNumber: 'HK/DC-002/25-26', invoiceNo: 'AGL/TI-002/25-26', invoiceDate: '2025-04-25',
    partyCode: 'TATA', invoiceAmount: 725000, amountReceived: 725000,
    transporterName: 'Gati Express', lrNumber: 'GT-25-0002', transportType: 'Freight Paid',
    deliveryDate: '2025-05-05', creditPeriodDays: 60,
    receivedDate: '2025-07-01', receivedAmount: 725000,
  },
  {
    dcNumber: 'HK/DC-003/25-26', invoiceNo: 'AGL/TI-003/25-26', invoiceDate: '2025-08-25',
    partyCode: 'ORIENT', invoiceAmount: 1875000, amountReceived: 1500000,
    transporterName: 'Calcutta Carriers', lrNumber: 'CC-25-4401', transportType: 'Freight Paid',
    deliveryDate: '2025-09-10', creditPeriodDays: 30,
    receivedDate: '2025-10-15', receivedAmount: 1500000,
  },
  {
    dcNumber: 'HK/DC-004/25-26', invoiceNo: 'AGL/TI-004/25-26', invoiceDate: '2025-09-10',
    partyCode: 'HAVELLS', invoiceAmount: 435000, amountReceived: 435000,
    transporterName: 'Delhivery Freight', lrNumber: 'DL-25-7701', transportType: 'Freight Paid',
    deliveryDate: '2025-09-17', creditPeriodDays: 45,
    receivedDate: '2025-10-28', receivedAmount: 435000,
  },
  {
    dcNumber: 'HK/DC-005/25-26', invoiceNo: 'AGL/TI-005/25-26', invoiceDate: '2025-09-25',
    partyCode: 'HAVELLS', invoiceAmount: 418000, amountReceived: 418000,
    transporterName: 'Delhivery Freight', lrNumber: 'DL-25-7702', transportType: 'Freight Paid',
    deliveryDate: '2025-10-02', creditPeriodDays: 45,
    receivedDate: '2025-11-10', receivedAmount: 418000,
  },
  {
    dcNumber: 'HK/DC-006/25-26', invoiceNo: 'AGL/TI-006/25-26', invoiceDate: '2025-11-05',
    partyCode: 'CROMPTON', invoiceAmount: 562000, amountReceived: 350000,
    transporterName: 'Rivigo Freight', lrNumber: 'RV-25-9901', transportType: 'Freight Paid',
    deliveryDate: '2025-11-14', creditPeriodDays: 30,
    receivedDate: '2025-12-10', receivedAmount: 350000,
  },
  {
    dcNumber: 'HK/DC-007/25-26', invoiceNo: 'AGL/TI-007/25-26', invoiceDate: '2025-11-20',
    partyCode: 'CROMPTON', invoiceAmount: 548000, amountReceived: 0,
    transporterName: 'Rivigo Freight', lrNumber: 'RV-25-9902', transportType: 'Freight Paid',
    deliveryDate: '2025-11-28', creditPeriodDays: 30,
  },
  {
    dcNumber: 'HK/DC-008/25-26', invoiceNo: 'AGL/TI-008/25-26', invoiceDate: '2025-11-20',
    partyCode: 'BAJAJ', invoiceAmount: 680000, amountReceived: 400000,
    transporterName: 'TCI Express', lrNumber: 'TCI-25-1122', transportType: 'Freight Paid',
    deliveryDate: '2025-12-01', creditPeriodDays: 45,
    receivedDate: '2026-01-10', receivedAmount: 400000,
  },
  // FY 26-27
  {
    dcNumber: 'HK/DC-001/26-27', invoiceNo: 'AGL/TI-001/26-27', invoiceDate: '2026-04-12',
    partyCode: 'BHARAT', invoiceAmount: 645000, amountReceived: 645000,
    transporterName: 'Gujarat Roadways', transportType: 'Freight Paid',
    deliveryDate: '2026-04-20', creditPeriodDays: 45,
    receivedDate: '2026-05-30', receivedAmount: 645000,
  },
  {
    dcNumber: 'HK/DC-002/26-27', invoiceNo: 'AGL/TI-002/26-27', invoiceDate: '2026-04-22',
    partyCode: 'BHARAT', invoiceAmount: 632000, amountReceived: 632000,
    transporterName: 'Gujarat Roadways', transportType: 'Freight Paid',
    deliveryDate: '2026-04-30', creditPeriodDays: 45,
    receivedDate: '2026-06-05', receivedAmount: 632000,
  },
  {
    dcNumber: 'HK/DC-003/26-27', invoiceNo: 'AGL/TI-003/26-27', invoiceDate: '2026-05-25',
    partyCode: 'TATA', invoiceAmount: 985000, amountReceived: 500000,
    transporterName: 'Gati Express', lrNumber: 'GT-26-3001', transportType: 'Freight Paid',
    deliveryDate: '2026-06-05', creditPeriodDays: 60,
    receivedDate: '2026-07-15', receivedAmount: 500000,
  },
  {
    dcNumber: 'HK/DC-004/26-27', invoiceNo: 'AGL/TI-004/26-27', invoiceDate: '2026-06-15',
    partyCode: 'SUNRISE', invoiceAmount: 1875000, amountReceived: 0,
    transporterName: 'Shailendra Transport', transportType: 'Freight Paid',
    deliveryDate: '2026-06-25', creditPeriodDays: 45,
  },
  {
    dcNumber: 'HK/DC-005/26-27', invoiceNo: 'AGL/TI-005/26-27', invoiceDate: '2026-07-20',
    partyCode: 'HAVELLS', invoiceAmount: 298000, amountReceived: 0,
    transporterName: 'Delhivery Freight', lrNumber: 'DL-26-4401', transportType: 'Freight Paid',
    deliveryDate: '2026-07-27', creditPeriodDays: 45,
  },
];

// ── PPC DATA (Production Planning) ─────────────────────────
export const ppcData = [
  // Current month PPC entries for active orders
  {
    month: 10, year: 2026, soNumber: 'AGL/SO-003/26-27', partyCode: 'TATA', skuCode: 'ST1500-202',
    orderQty: 8000, fgStock: 2500, wipStock: 800, bufferFG: 200, bufferWIP: 100,
    totalQtyToProduce: 5500, producedQtyTillDate: 3200, balanceProductionQty: 2300,
    achievedProductionPct: 58, dispatchedQty: 3200, dispatchPct: 40,
    pendingFromPrevMonth: 1200, planInNextMonth: 1100,
    dailyPlan: [
      { date: '2026-10-01', dispPlan: 200, dispActual: 180 },
      { date: '2026-10-02', dispPlan: 200, dispActual: 220 },
      { date: '2026-10-03', dispPlan: 200, dispActual: 200 },
      { date: '2026-10-04', dispPlan: 200, dispActual: 0 },
      { date: '2026-10-05', dispPlan: 200, dispActual: 190 },
      { date: '2026-10-06', dispPlan: 0, dispActual: 0 },
      { date: '2026-10-07', dispPlan: 200, dispActual: 210 },
    ],
  },
  {
    month: 10, year: 2026, soNumber: 'AGL/SO-003/26-27', partyCode: 'TATA', skuCode: 'ST1000-202',
    orderQty: 6000, fgStock: 3200, wipStock: 600, bufferFG: 150, bufferWIP: 80,
    totalQtyToProduce: 2800, producedQtyTillDate: 2400, balanceProductionQty: 400,
    achievedProductionPct: 86, dispatchedQty: 2400, dispatchPct: 40,
    pendingFromPrevMonth: 800, planInNextMonth: 400,
    dailyPlan: [
      { date: '2026-10-01', dispPlan: 150, dispActual: 140 },
      { date: '2026-10-02', dispPlan: 150, dispActual: 160 },
      { date: '2026-10-03', dispPlan: 150, dispActual: 150 },
    ],
  },
  {
    month: 10, year: 2026, soNumber: 'AGL/SO-004/26-27', partyCode: 'SUNRISE', skuCode: 'CHUT-KAT',
    orderQty: 50000, fgStock: 10000, wipStock: 5000, bufferFG: 500, bufferWIP: 300,
    totalQtyToProduce: 40000, producedQtyTillDate: 20160, balanceProductionQty: 19840,
    achievedProductionPct: 50, dispatchedQty: 20160, dispatchPct: 40,
    pendingFromPrevMonth: 5000, planInNextMonth: 8000,
    dailyPlan: [
      { date: '2026-10-01', dispPlan: 1000, dispActual: 960 },
      { date: '2026-10-02', dispPlan: 1000, dispActual: 1008 },
      { date: '2026-10-03', dispPlan: 1000, dispActual: 1000 },
      { date: '2026-10-04', dispPlan: 1000, dispActual: 850 },
      { date: '2026-10-05', dispPlan: 1000, dispActual: 1100 },
    ],
  },
  {
    month: 10, year: 2026, soNumber: 'AGL/SO-004/26-27', partyCode: 'SUNRISE', skuCode: 'DOME-JAR',
    orderQty: 25000, fgStock: 4000, wipStock: 2000, bufferFG: 300, bufferWIP: 150,
    totalQtyToProduce: 21000, producedQtyTillDate: 10500, balanceProductionQty: 10500,
    achievedProductionPct: 50, dispatchedQty: 10500, dispatchPct: 42,
    pendingFromPrevMonth: 3000, planInNextMonth: 5000,
    dailyPlan: [
      { date: '2026-10-01', dispPlan: 500, dispActual: 480 },
      { date: '2026-10-02', dispPlan: 500, dispActual: 525 },
      { date: '2026-10-03', dispPlan: 500, dispActual: 490 },
    ],
  },
  {
    month: 10, year: 2026, soNumber: 'AGL/SO-005/26-27', partyCode: 'HAVELLS', skuCode: 'VA-WET',
    orderQty: 3000, fgStock: 2800, wipStock: 1000, bufferFG: 100, bufferWIP: 50,
    totalQtyToProduce: 200, producedQtyTillDate: 1200, balanceProductionQty: 0,
    achievedProductionPct: 100, dispatchedQty: 1200, dispatchPct: 40,
    pendingFromPrevMonth: 0, planInNextMonth: 900,
    dailyPlan: [
      { date: '2026-10-01', dispPlan: 100, dispActual: 120 },
      { date: '2026-10-02', dispPlan: 100, dispActual: 100 },
    ],
  },
  {
    month: 10, year: 2026, soNumber: 'AGL/SO-005/26-27', partyCode: 'HAVELLS', skuCode: 'VA-DRY',
    orderQty: 3000, fgStock: 2600, wipStock: 900, bufferFG: 100, bufferWIP: 50,
    totalQtyToProduce: 400, producedQtyTillDate: 1200, balanceProductionQty: 0,
    achievedProductionPct: 100, dispatchedQty: 1200, dispatchPct: 40,
    pendingFromPrevMonth: 0, planInNextMonth: 900,
    dailyPlan: [
      { date: '2026-10-01', dispPlan: 100, dispActual: 110 },
      { date: '2026-10-02', dispPlan: 100, dispActual: 90 },
    ],
  },
];

// ── DISPATCH SCHEDULE DATA ──────────────────────────────────
export const schedulesData = [
  {
    soNumber: 'AGL/SO-003/26-27', partyCode: 'TATA', poNumber: 'TH-2026-2233', poDate: '2026-05-15',
    status: 'ACTIVE',
    items: [
      {
        skuName: 'Steele 1.5 Ltr', poQty: 8000, dispatchedQty: 3200, balanceQty: 4800,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-05-25', plannedQty: 1600, totalActualQty: 1600, actualDates: ['2026-05-25'], actualQtys: [1600] },
          { phaseNo: 'P2', plannedDate: '2026-06-10', plannedQty: 1600, totalActualQty: 1600, actualDates: ['2026-06-10'], actualQtys: [1600] },
          { phaseNo: 'P3', plannedDate: '2026-07-10', plannedQty: 1600, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-08-10', plannedQty: 1600, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-09-10', plannedQty: 1600, totalActualQty: 0 },
        ],
      },
      {
        skuName: 'Steele 1.0 Ltr', poQty: 6000, dispatchedQty: 2400, balanceQty: 3600,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-05-25', plannedQty: 1200, totalActualQty: 1200, actualDates: ['2026-05-25'], actualQtys: [1200] },
          { phaseNo: 'P2', plannedDate: '2026-06-10', plannedQty: 1200, totalActualQty: 1200, actualDates: ['2026-06-10'], actualQtys: [1200] },
          { phaseNo: 'P3', plannedDate: '2026-07-10', plannedQty: 1200, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-08-10', plannedQty: 1200, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-09-10', plannedQty: 1200, totalActualQty: 0 },
        ],
      },
      {
        skuName: 'Galaxy 1.5 Ltr', poQty: 4000, dispatchedQty: 1600, balanceQty: 2400,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-05-25', plannedQty: 800, totalActualQty: 800, actualDates: ['2026-05-25'], actualQtys: [800] },
          { phaseNo: 'P2', plannedDate: '2026-06-10', plannedQty: 800, totalActualQty: 800, actualDates: ['2026-06-10'], actualQtys: [800] },
          { phaseNo: 'P3', plannedDate: '2026-07-10', plannedQty: 800, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-08-10', plannedQty: 800, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-09-10', plannedQty: 800, totalActualQty: 0 },
        ],
      },
    ],
  },
  {
    soNumber: 'AGL/SO-004/26-27', partyCode: 'SUNRISE', poNumber: 'SR-2026-4455', poDate: '2026-06-01',
    status: 'ACTIVE',
    items: [
      {
        skuName: 'Chutney Katori', poQty: 50000, dispatchedQty: 20160, balanceQty: 29840,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-06-15', plannedQty: 10000, totalActualQty: 10080, actualDates: ['2026-06-15'], actualQtys: [10080] },
          { phaseNo: 'P2', plannedDate: '2026-07-15', plannedQty: 10000, totalActualQty: 10080, actualDates: ['2026-07-15'], actualQtys: [10080] },
          { phaseNo: 'P3', plannedDate: '2026-08-15', plannedQty: 10000, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-09-15', plannedQty: 10000, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-10-15', plannedQty: 10000, totalActualQty: 0 },
        ],
      },
      {
        skuName: 'Dome Jar', poQty: 25000, dispatchedQty: 10500, balanceQty: 14500,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-06-15', plannedQty: 5000, totalActualQty: 5250, actualDates: ['2026-06-15'], actualQtys: [5250] },
          { phaseNo: 'P2', plannedDate: '2026-07-15', plannedQty: 5000, totalActualQty: 5250, actualDates: ['2026-07-15'], actualQtys: [5250] },
          { phaseNo: 'P3', plannedDate: '2026-08-15', plannedQty: 5000, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-09-15', plannedQty: 5000, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-10-15', plannedQty: 5000, totalActualQty: 0 },
        ],
      },
    ],
  },
  {
    soNumber: 'AGL/SO-005/26-27', partyCode: 'HAVELLS', poNumber: 'HV-2026-6677', poDate: '2026-07-10',
    status: 'DRAFT',
    items: [
      {
        skuName: 'VA Wet', poQty: 3000, dispatchedQty: 1200, balanceQty: 1800,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-07-20', plannedQty: 600, totalActualQty: 600, actualDates: ['2026-07-20'], actualQtys: [600] },
          { phaseNo: 'P2', plannedDate: '2026-08-10', plannedQty: 600, totalActualQty: 600, actualDates: ['2026-08-10'], actualQtys: [600] },
          { phaseNo: 'P3', plannedDate: '2026-09-10', plannedQty: 600, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-10-10', plannedQty: 600, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-11-10', plannedQty: 600, totalActualQty: 0 },
        ],
      },
      {
        skuName: 'VA Dry', poQty: 3000, dispatchedQty: 1200, balanceQty: 1800,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-07-20', plannedQty: 600, totalActualQty: 600, actualDates: ['2026-07-20'], actualQtys: [600] },
          { phaseNo: 'P2', plannedDate: '2026-08-10', plannedQty: 600, totalActualQty: 600, actualDates: ['2026-08-10'], actualQtys: [600] },
          { phaseNo: 'P3', plannedDate: '2026-09-10', plannedQty: 600, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-10-10', plannedQty: 600, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-11-10', plannedQty: 600, totalActualQty: 0 },
        ],
      },
      {
        skuName: 'VA Chutney', poQty: 2000, dispatchedQty: 720, balanceQty: 1280,
        phases: [
          { phaseNo: 'P1', plannedDate: '2026-07-20', plannedQty: 400, totalActualQty: 360, actualDates: ['2026-07-20'], actualQtys: [360] },
          { phaseNo: 'P2', plannedDate: '2026-08-10', plannedQty: 400, totalActualQty: 360, actualDates: ['2026-08-10'], actualQtys: [360] },
          { phaseNo: 'P3', plannedDate: '2026-09-10', plannedQty: 400, totalActualQty: 0 },
          { phaseNo: 'P4', plannedDate: '2026-10-10', plannedQty: 400, totalActualQty: 0 },
          { phaseNo: 'P5', plannedDate: '2026-11-10', plannedQty: 400, totalActualQty: 0 },
        ],
      },
    ],
  },
];
