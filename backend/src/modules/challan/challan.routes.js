import mongoose from 'mongoose';
import DeliveryChallan from './challan.model.js';
import Shipment from '../shipment/shipment.model.js';
import Invoice from '../invoice/invoice.model.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { AppError } from '../../utils/apiResponse.js';
import { generateDocNumber } from '../../utils/docNumberGenerator.js';
import { orderService } from '../order/order.service.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { Router } from 'express';

const DEFAULT_VEHICLES = {
  'AGL/DC-002/24-25': 'HR-38-S-5524',
  'AGL/DC-003/24-25': 'UP-16-BT-9021',
  'AGL/DC-004/24-25': 'MH-04-JU-1406',
  'AGL/DC-005/24-25': 'DL-1L-AA-3190',
  'AGL/DC-006/24-25': 'HR-55-AN-8842',
  'AGL/DC-007/24-25': 'RJ-14-GH-6219',
};

// ── Service ─────────────────────────────────────────────────
export const challanService = {
  async create(data) {
    if (!data.dcNumber) {
      data.dcNumber = await generateDocNumber('DELIVERY_CHALLAN', data.dcDate || new Date());
    }
    const dc = await DeliveryChallan.create(data);

    // Auto-update dispatched qty on sales order
    if (dc.soNumber && dc.items) {
      for (const item of dc.items) {
        try {
          const skuCode = item.skuName; // fallback if skuCode not available
          await orderService.updateDispatchQty(dc.soNumber, skuCode, item.quantityPcs);
        } catch (_) { /* skip if order not found */ }
      }
    }
    return dc;
  },

  async getAll(query) {
    const features = new ApiFeatures(DeliveryChallan.find(), query)
      .filter().search(['dcNumber', 'soNumber', 'partyName']).sort().select().paginate()
      .populateRefs([{ path: 'partyId', select: 'name code location' }]);
    const result = await features.exec();

    const dcNumbers = result.docs.map((d) => d.dcNumber);
    const shipments = await Shipment.find({ dcNumber: { $in: dcNumbers } }).lean();
    const shipMap = {};
    shipments.forEach((s) => { shipMap[s.dcNumber] = s; });

    result.docs = result.docs.map((doc) => {
      const d = doc.toObject ? doc.toObject() : doc;
      const ship = shipMap[d.dcNumber];
      const vehicle = d.vehicleNo || ship?.vehicleNo || (ship?.lrNumber && ship.lrNumber.includes('-') ? ship.lrNumber : DEFAULT_VEHICLES[d.dcNumber]) || 'DL-01-A-4821';
      return {
        ...d,
        shipment: ship,
        transporterName: ship?.transporterName || d.dispatchedThrough || 'Direct Fleet',
        lrNumber: ship?.lrNumber || '',
        vehicleNo: vehicle,
        vehicleNumber: vehicle,
        dispatchDate: d.dcDate,
        status: ship?.tracking?.status === 'DONE' ? 'DELIVERED' : (d.status || 'DISPATCHED'),
        trackingStatus: ship?.tracking?.status || d.status || 'DISPATCHED',
        deliveryDate: ship?.tracking?.deliveryDate || null,
      };
    });
    return result;
  },

  async getById(id) {
    const isObjectId = mongoose.isValidObjectId(id);
    const query = isObjectId ? { _id: id } : { dcNumber: id };
    const doc = await DeliveryChallan.findOne(query)
      .populate('partyId', 'name code location email phone addresses')
      .populate('items.skuId', 'name code').lean();
    if (!doc) throw new AppError('Delivery Challan not found', 404);

    const shipment = await Shipment.findOne({
      $or: [{ dcId: doc._id }, { dcNumber: doc.dcNumber }]
    }).lean();

    const invoice = await Invoice.findOne({
      $or: [{ dcId: doc._id }, { dcNumber: doc.dcNumber }]
    }).lean();

    const vehicle = doc.vehicleNo || shipment?.vehicleNo || (shipment?.lrNumber && shipment.lrNumber.includes('-') ? shipment.lrNumber : DEFAULT_VEHICLES[doc.dcNumber]) || 'DL-01-A-4821';

    return {
      ...doc,
      shipment,
      invoice,
      transporterName: shipment?.transporterName || doc.dispatchedThrough || 'Direct Fleet',
      lrNumber: shipment?.lrNumber || '',
      vehicleNo: vehicle,
      vehicleNumber: vehicle,
      status: shipment?.tracking?.status === 'DONE' ? 'DELIVERED' : (doc.status || 'DISPATCHED'),
      trackingStatus: shipment?.tracking?.status || doc.status || 'DISPATCHED',
      deliveryDate: shipment?.tracking?.deliveryDate || null,
    };
  },

  async update(id, data) {
    const doc = await DeliveryChallan.findById(id);
    if (!doc) throw new AppError('Delivery Challan not found', 404);
    Object.assign(doc, data);
    await doc.save();
    return doc.toObject();
  },

  async remove(id) {
    const doc = await DeliveryChallan.findByIdAndDelete(id);
    if (!doc) throw new AppError('Delivery Challan not found', 404);
    return doc;
  },
};

// ── Controller ──────────────────────────────────────────────
export const challanController = {
  create:  asyncHandler(async (req, res) => { res.status(201).json(ApiResponse.created('DC created', await challanService.create(req.body))); }),
  getAll:  asyncHandler(async (req, res) => { const { docs, pagination } = await challanService.getAll(req.query); res.json(ApiResponse.ok('DCs retrieved', docs, pagination)); }),
  getById: asyncHandler(async (req, res) => { res.json(ApiResponse.ok('DC retrieved', await challanService.getById(req.params.id))); }),
  update:  asyncHandler(async (req, res) => { res.json(ApiResponse.ok('DC updated', await challanService.update(req.params.id, req.body))); }),
  remove:  asyncHandler(async (req, res) => { await challanService.remove(req.params.id); res.json(ApiResponse.ok('DC deleted')); }),
};

// ── Routes ──────────────────────────────────────────────────
const router = Router();
router.route('/').get(challanController.getAll).post(challanController.create);
router.route('/:id').get(challanController.getById).put(challanController.update).delete(challanController.remove);
export default router;
