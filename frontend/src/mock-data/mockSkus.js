export const defaultMockSkus = [
  { _id: 's-1', code: 'ST1500-202', name: 'Steele 1.5 Ltr', category: 'Mixer Jar', pcsPerBox: 100, weightPerPc: 0.27, fgStock: 2500, wipStock: 800 },
  { _id: 's-2', code: 'ST1000-202', name: 'Steele 1.0 Ltr', category: 'Mixer Jar', pcsPerBox: 100, weightPerPc: 0.187, fgStock: 3200, wipStock: 600 },
  { _id: 's-3', code: 'GX1500-202', name: 'Galaxy 1.5 Ltr', category: 'Mixer Jar', pcsPerBox: 100, weightPerPc: 0.27, fgStock: 1800, wipStock: 1200 },
  { _id: 's-4', code: 'GX1000-202', name: 'Galaxy 1.0 Ltr', category: 'Mixer Jar', pcsPerBox: 100, weightPerPc: 0.187, fgStock: 2100, wipStock: 500 },
  { _id: 's-5', code: 'TB1500-204', name: 'Taper Jar - Bidding 1.5 Ltr', category: 'Mixer Jar', pcsPerBox: 100, weightPerPc: 0.25, fgStock: 1500, wipStock: 700 },
  { _id: 's-6', code: 'TP0750-202', name: 'Taper Jar - Patti 0.750 Ltr', category: 'Mixer Jar', pcsPerBox: 100, weightPerPc: 0.15, fgStock: 2000, wipStock: 400 },
  { _id: 's-7', code: 'PP-WET', name: 'PP Wet', category: 'PP Jar', pcsPerBox: 120, weightPerPc: 0.266, fgStock: 5000, wipStock: 2000 },
  { _id: 's-8', code: 'PP-DRY', name: 'PP Dry', category: 'PP Jar', pcsPerBox: 120, weightPerPc: 0.233, fgStock: 4800, wipStock: 1800 },
  { _id: 's-9', code: 'PP-CHUTNEY', name: 'PP Chutney', category: 'PP Jar', pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 6000, wipStock: 2500 },
  { _id: 's-10', code: 'PPF-WET', name: 'PP Flat Wet', category: 'PP Flat', pcsPerBox: 120, weightPerPc: 0.266, fgStock: 3500, wipStock: 1500 },
  { _id: 's-11', code: 'PPF-DRY', name: 'PP Flat Dry', category: 'PP Flat', pcsPerBox: 120, weightPerPc: 0.233, fgStock: 3500, wipStock: 1500 },
  { _id: 's-12', code: 'PPF-CHUT', name: 'PP Flat Chutney', category: 'PP Flat', pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 4000, wipStock: 1800 },
  { _id: 's-13', code: 'VA-WET', name: 'VA Wet', category: 'VA Jar', pcsPerBox: 120, weightPerPc: 0.266, fgStock: 2800, wipStock: 1000 },
  { _id: 's-14', code: 'VA-DRY', name: 'VA Dry', category: 'VA Jar', pcsPerBox: 120, weightPerPc: 0.233, fgStock: 2600, wipStock: 900 },
  { _id: 's-15', code: 'VA-CHUT', name: 'VA Chutney', category: 'VA Jar', pcsPerBox: 180, weightPerPc: 0.1317, fgStock: 3200, wipStock: 1100 },
];

export const getStoredSkus = () => {
  try {
    const raw = localStorage.getItem('dpes_custom_skus');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse stored skus:', e);
    return [];
  }
};

export const saveStoredSku = (sku) => {
  try {
    const current = getStoredSkus();
    const updated = [sku, ...current.filter(s => s._id !== sku._id && s.code !== sku.code)];
    localStorage.setItem('dpes_custom_skus', JSON.stringify(updated));
    window.dispatchEvent(new Event('skus-updated'));
    return updated;
  } catch (e) {
    console.error('Failed to save sku to storage:', e);
    return [];
  }
};
