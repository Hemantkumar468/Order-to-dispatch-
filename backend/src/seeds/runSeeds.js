/**
 * Seed runner — inserts all data from seed file into MongoDB.
 * Run: npm run seed
 */
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import { logger } from '../utils/logger.js';
import { setCounter } from '../utils/docNumberGenerator.js';

// Models
import Party from '../modules/party/party.model.js';
import SKU from '../modules/sku/sku.model.js';
import SalesOrder from '../modules/order/order.model.js';
import DeliveryChallan from '../modules/challan/challan.model.js';
import Invoice from '../modules/invoice/invoice.model.js';
import Shipment from '../modules/shipment/shipment.model.js';
import Payment from '../modules/payment/payment.model.js';
import PPCEntry from '../modules/ppc/ppc.model.js';
import DispatchSchedule from '../modules/schedule/schedule.model.js';
import User from '../modules/auth/auth.model.js';

// Data
import { partiesData, skusData, ordersData, challansData, fmsData, ppcData, schedulesData } from './seedData.js';

const run = async () => {
  await connectDB();
  logger.info('🌱 Starting seed...');

  // ── 1. Clear existing data ──────────────────────────────
  await Promise.all([
    Party.deleteMany({}),
    SKU.deleteMany({}),
    SalesOrder.deleteMany({}),
    DeliveryChallan.deleteMany({}),
    Invoice.deleteMany({}),
    Shipment.deleteMany({}),
    Payment.deleteMany({}),
    PPCEntry.deleteMany({}),
    DispatchSchedule.deleteMany({}),
    User.deleteMany({}),
    mongoose.connection.collection('counters').deleteMany({}),
  ]);
  logger.info('🗑️  Cleared all collections');

  // ── 2. Insert Default Users ─────────────────────────────
  const users = await User.create([
    { name: 'Admin',    email: 'admin@hemantglobal.com',    password: 'admin123',    role: 'ADMIN' },
    { name: 'PPC User', email: 'ppc@hemantglobal.com',     password: 'ppc12345',    role: 'PPC' },
    { name: 'Accounts', email: 'accounts@hemantglobal.com', password: 'acc12345',    role: 'ACCOUNTS' },
    { name: 'Dispatch', email: 'dispatch@hemantglobal.com', password: 'disp12345',   role: 'DISPATCH' },
  ]);
  logger.info(`✅ Inserted ${users.length} users`);

  // ── 3. Insert Parties ───────────────────────────────────
  const parties = await Party.insertMany(partiesData);
  const partyMap = {};
  parties.forEach((p) => { partyMap[p.code] = p; });
  logger.info(`✅ Inserted ${parties.length} parties`);

  // ── 4. Insert SKUs ──────────────────────────────────────
  const skus = await SKU.insertMany(skusData);
  const skuMap = {};
  skus.forEach((s) => { skuMap[s.code] = s; });
  logger.info(`✅ Inserted ${skus.length} SKUs`);

  // ── 5. Insert Sales Orders ──────────────────────────────
  const orderDocs = ordersData.map((o) => {
    const party = partyMap[o.partyCode];
    const items = o.items.map((item) => {
      const sku = skuMap[item.skuCode];
      return {
        skuId:         sku?._id,
        skuName:       sku?.name || item.skuCode,
        skuCode:       item.skuCode,
        orderQty:      item.orderQty,
        dispatchedQty: item.dispatchedQty || 0,
        balanceQty:    Math.max(0, item.orderQty - (item.dispatchedQty || 0)),
        remark:        item.remark || null,
      };
    });

    const fy = o.soNumber.split('/').pop(); // "24-25" or "25-26"

    return {
      soNumber:      o.soNumber,
      poNumber:      o.poNumber,
      partyId:       party?._id,
      partyName:     party?.name,
      location:      party?.location,
      orderDate:     new Date(o.orderDate),
      receivedAt:    new Date(o.orderDate),
      financialYear: fy,
      leadTimeDays:  o.leadTimeDays || 7,
      status:        o.status || 'RECEIVED',
      items,
      totalOrderQty:      items.reduce((s, i) => s + i.orderQty, 0),
      totalDispatchedQty: items.reduce((s, i) => s + i.dispatchedQty, 0),
      totalBalanceQty:    items.reduce((s, i) => s + i.balanceQty, 0),
    };
  });

  const orders = await SalesOrder.insertMany(orderDocs);
  const orderMap = {};
  orders.forEach((o) => { orderMap[o.soNumber] = o; });
  logger.info(`✅ Inserted ${orders.length} sales orders`);

  // ── 6. Insert Delivery Challans ─────────────────────────
  const challanDocs = challansData.map((dc) => {
    const party = partyMap[dc.partyCode];
    const order = orderMap[dc.soNumber];
    const items = dc.items.map((item, idx) => ({
      srNo:        idx + 1,
      skuName:     item.skuName,
      quantityPcs: item.quantityPcs,
      noOfBoxes:   item.noOfBoxes,
      pcsPerBox:   item.pcsPerBox,
      weightKg:    item.weightKg,
    }));

    return {
      dcNumber:         dc.dcNumber,
      soNumber:         dc.soNumber,
      orderId:          order?._id,
      partyId:          party?._id,
      partyName:        party?.name,
      dcDate:           new Date(dc.dcDate),
      vehicleNo:        dc.vehicleNo || null,
      items,
      totalQuantityPcs: items.reduce((s, i) => s + i.quantityPcs, 0),
      totalBoxes:       items.reduce((s, i) => s + i.noOfBoxes, 0),
      totalWeightKg:    items.reduce((s, i) => s + i.weightKg, 0),
      dispatchedThrough:'Freight Paid',
      status:           'DELIVERED',
    };
  });

  const challans = await DeliveryChallan.insertMany(challanDocs);
  logger.info(`✅ Inserted ${challans.length} delivery challans`);

  // ── 7. Insert FMS (Invoices + Shipments + Payments) ─────
  let invoiceCount = 0;
  for (const fms of fmsData) {
    const party = partyMap[fms.partyCode];
    const dc = challans.find((c) => c.dcNumber === fms.dcNumber);

    // Invoice
    const invoice = await Invoice.create({
      invoiceNo:      fms.invoiceNo,
      dcId:           dc?._id,
      dcNumber:       fms.dcNumber,
      partyId:        party?._id,
      partyName:      party?.name,
      invoiceDate:    new Date(fms.invoiceDate),
      invoiceAmount:  fms.invoiceAmount,
      amountReceived: fms.amountReceived,
      balance:        fms.invoiceAmount - fms.amountReceived,
      status:         fms.amountReceived >= fms.invoiceAmount ? 'PAID' :
                      fms.amountReceived > 0 ? 'PARTIAL' : 'PENDING',
      creation: { status: 'DONE', actual: new Date(fms.invoiceDate) },
      emailToClient: { status: 'DONE' },
    });

    // Shipment
    await Shipment.create({
      dcId:            dc?._id,
      dcNumber:        fms.dcNumber,
      invoiceId:       invoice._id,
      transportType:   fms.transportType || 'Freight Paid',
      transporterName: fms.transporterName,
      lrNumber:        fms.lrNumber || '',
      tracking: {
        status:       'DONE',
        deliveryDate: fms.deliveryDate ? new Date(fms.deliveryDate) : null,
      },
    });

    // Payment
    await Payment.create({
      invoiceId: invoice._id,
      dcId:      dc?._id,
      dcNumber:  fms.dcNumber,
      partyId:   party?._id,
      partyName: party?.name,
      type:      'CLIENT_PAYMENT',
      followUp:     { status: fms.amountReceived > 0 ? 'DONE' : 'PENDING' },
      confirmation: {
        creditPeriodDays: fms.creditPeriodDays || 30,
        receivedDate:     fms.receivedDate ? new Date(fms.receivedDate) : null,
        receivedAmount:   fms.receivedAmount || 0,
        status:           fms.amountReceived >= fms.invoiceAmount ? 'DONE' :
                          fms.amountReceived > 0 ? 'YES' : 'PENDING',
      },
    });

    invoiceCount++;
  }
  logger.info(`✅ Inserted ${invoiceCount} FMS records (invoice + shipment + payment each)`);

  // ── 8. Insert PPC Entries ───────────────────────────────
  const ppcDocs = ppcData.map((p) => {
    const party = partyMap[p.partyCode];
    const sku = skuMap[p.skuCode];
    return {
      ...p,
      partyId:   party?._id,
      partyName: party?.name,
      skuId:     sku?._id,
      skuName:   sku?.name,
      dailyPlan: p.dailyPlan.map((d) => ({ ...d, date: new Date(d.date) })),
    };
  });

  const ppcEntries = await PPCEntry.insertMany(ppcDocs);
  logger.info(`✅ Inserted ${ppcEntries.length} PPC entries`);

  // ── 9. Insert Dispatch Schedules ────────────────────────
  const scheduleDocs = schedulesData.map((s) => {
    const party = partyMap[s.partyCode];
    const order = orderMap[s.soNumber];
    return {
      soNumber:  s.soNumber,
      poNumber:  s.poNumber,
      partyId:   party?._id,
      partyName: party?.name,
      orderId:   order?._id,
      poDate:    s.poDate ? new Date(s.poDate) : null,
      status:    s.status || 'DRAFT',
      items: s.items.map((item) => {
        const sku = skuMap[item.skuCode] || skus.find((sk) => sk.name === item.skuName);
        return {
          skuId:         sku?._id,
          skuName:       item.skuName,
          poQty:         item.poQty,
          dispatchedQty: item.dispatchedQty,
          balanceQty:    item.balanceQty,
          phases: item.phases.map((ph) => ({
            phaseNo:        ph.phaseNo,
            plannedDate:    ph.plannedDate ? new Date(ph.plannedDate) : null,
            plannedQty:     ph.plannedQty,
            totalActualQty: ph.totalActualQty || 0,
            actualDates:    (ph.actualDates || []).map((d) => new Date(d)),
            actualQtys:     ph.actualQtys || [],
          })),
        };
      }),
    };
  });

  const schedules = await DispatchSchedule.insertMany(scheduleDocs);
  logger.info(`✅ Inserted ${schedules.length} dispatch schedules`);

  // ── 10. Set counters to avoid conflicts ─────────────────
  await setCounter('AGL/SO_24-25', 8);
  await setCounter('AGL/SO_25-26', 7);
  await setCounter('AGL/SO_26-27', 8);
  await setCounter('HK/DC_24-25', 8);
  await setCounter('HK/DC_25-26', 8);
  await setCounter('HK/DC_26-27', 5);
  await setCounter('AGL/TI_24-25', 8);
  await setCounter('AGL/TI_25-26', 8);
  await setCounter('AGL/TI_26-27', 5);
  await setCounter('AGL-O2D', 30);
  logger.info('✅ Counters set');

  logger.info('🎉 Seed complete!');
  logger.info('📧 Login credentials:');
  logger.info('   Admin:    admin@hemantglobal.com / admin123');
  logger.info('   PPC:      ppc@hemantglobal.com / ppc12345');
  logger.info('   Accounts: accounts@hemantglobal.com / acc12345');
  logger.info('   Dispatch: dispatch@hemantglobal.com / disp12345');
  process.exit(0);
};

run().catch((err) => {
  logger.error(`Seed failed: ${err.message}`, { stack: err.stack });
  process.exit(1);
});
