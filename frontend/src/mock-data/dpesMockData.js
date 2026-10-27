import dayjs from 'dayjs';

export const initialMockState = {
  orders: [
    { id: 'AGL/SO-001/25-26', customer: 'Tata Home Products Pvt. Ltd.', item: 'Steele 1.5 Ltr', totalQty: 10000, orderDate: '2025-04-10', status: 'Active' },
    { id: 'AGL/SO-002/25-26', customer: 'Sunrise Home Appliances Ltd.', item: 'Galaxy 1.5 Ltr', totalQty: 9308, orderDate: '2025-12-17', status: 'Active' },
    { id: 'AGL/SO-003/25-26', customer: 'Royal Kitchen Appliances Pvt. Ltd.', item: 'Taper Jar 1.5 Ltr', totalQty: 5000, orderDate: '2025-12-17', status: 'Active' },
    { id: 'AGL/SO-004/25-26', customer: 'Orient Appliances India Ltd.', item: 'Dome Jar & Katori', totalQty: 45000, orderDate: '2025-08-15', status: 'Active' },
    { id: 'AGL/SO-005/25-26', customer: 'Havells India Kitchen Division', item: 'Value Flat Wet Jar', totalQty: 10000, orderDate: '2025-09-01', status: 'Active' },
    { id: 'AGL/SO-006/25-26', customer: 'Crompton Greaves Consumer Ltd.', item: 'PP Wet & Dry Jars', totalQty: 15000, orderDate: '2025-10-10', status: 'Active' },
  ],
  plans: [
    { id: 'PLN-101', orderId: 'AGL/SO-001/25-26', date: '2025-04-15', plannedQty: 5000 },
    { id: 'PLN-102', orderId: 'AGL/SO-001/25-26', date: '2025-04-25', plannedQty: 5000 },
    { id: 'PLN-201', orderId: 'AGL/SO-002/25-26', date: '2025-12-24', plannedQty: 3000 },
    { id: 'PLN-202', orderId: 'AGL/SO-002/25-26', date: '2026-01-05', plannedQty: 3000 },
    { id: 'PLN-203', orderId: 'AGL/SO-002/25-26', date: '2026-01-20', plannedQty: 3308 },
    { id: 'PLN-301', orderId: 'AGL/SO-003/25-26', date: '2025-12-28', plannedQty: 2500 },
    { id: 'PLN-302', orderId: 'AGL/SO-003/25-26', date: '2026-01-10', plannedQty: 2500 },
    { id: 'PLN-401', orderId: 'AGL/SO-004/25-26', date: '2025-08-25', plannedQty: 15000 },
    { id: 'PLN-402', orderId: 'AGL/SO-004/25-26', date: '2025-09-15', plannedQty: 15000 },
    { id: 'PLN-403', orderId: 'AGL/SO-004/25-26', date: '2025-10-05', plannedQty: 15000 },
    { id: 'PLN-501', orderId: 'AGL/SO-005/25-26', date: '2025-09-10', plannedQty: 5000 },
    { id: 'PLN-502', orderId: 'AGL/SO-005/25-26', date: '2025-09-25', plannedQty: 5000 },
  ],
  executions: [
    { id: 'EX-001', planId: 'PLN-101', actualQty: 5000, executionDate: '2025-04-15', referenceNumber: 'HK/DC-001/25-26' },
    { id: 'EX-002', planId: 'PLN-102', actualQty: 5000, executionDate: '2025-04-25', referenceNumber: 'HK/DC-002/25-26' },
    { id: 'EX-003', planId: 'PLN-201', actualQty: 2800, executionDate: '2025-12-24', referenceNumber: 'HK/DC-011/25-26' },
    { id: 'EX-004', planId: 'PLN-301', actualQty: 2500, executionDate: '2025-12-28', referenceNumber: 'HK/DC-012/25-26' },
    { id: 'EX-005', planId: 'PLN-401', actualQty: 15000, executionDate: '2025-08-25', referenceNumber: 'HK/DC-003/25-26' },
    { id: 'EX-006', planId: 'PLN-501', actualQty: 4800, executionDate: '2025-09-10', referenceNumber: 'HK/DC-004/25-26' },
  ],
};