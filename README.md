# 🏭 Hemant Global - Dispatch Planning & Execution System (DPES ERP)

> **Enterprise B2B Order-to-Dispatch ERP Platform**  
> Complete lifecycle management: **Party & SKU Masters ➔ Sales Orders ➔ PPC Planning ➔ Dispatch Scheduling ➔ Delivery Challan ➔ Invoices & FMS ➔ Dispatch Ledger**.

---

## 📑 विषय-सूची (Table of Contents)
1. [प्रोजेक्ट परिचय (Project Overview)](#1-प्रोजेक्ट-परिचय-project-overview)
2. [संपूर्ण बिजनेस प्रोसेस फ्लो (Complete Business Process Flow)](#2-संपूर्ण-बिजनेस-प्रोसेस-फ्लो-complete-business-process-flow)
3. [उपयोग की गई तकनीकें (Technology Stack Used)](#3-उपयोग-की-गई-तकनीकें-technology-stack-used)
4. [मॉड्यूल और कार्यप्रणाली (Modules & Features)](#4-मॉड्यूल-और-कार्यप्रणाली-modules--features)
5. [प्रोजेक्ट डायरेक्टरी संरचना (Project Directory Structure)](#5-प्रोजेक्ट-डायरेक्टरी-संरचना-project-directory-structure)
6. [बैकएंड API रूट्स (Backend REST API Endpoints)](#6-बैकएंड-api-रूट्स-backend-rest-api-endpoints)
7. [इंस्टॉलेशन और सेटअप गाइड (Setup & Run Instructions)](#7-इंस्टॉलेशन-और-सेटअप-गाइड-setup--run-instructions)

---

## 1. प्रोजेक्ट परिचय (Project Overview)

**DPES (Dispatch Planning & Execution System)** एक आधुनिक, पूर्णतः डिजिटल **Enterprise Resource Planning (ERP)** सॉल्यूशन है। इसे विशेष रूप से मैन्युफैक्चरिंग और लॉजिस्टिक्स कंपनियों के लिए डिज़ाइन किया गया है ताकि कस्टमर ऑर्डर प्राप्त होने से लेकर, प्रोडक्शन प्लानिंग, पैकिंग, ट्रांसपोर्ट शेड्यूलिंग, डिलीवरी चालान जनरेशन, टैक्स इनवॉइसिंग और पेमेंट क्लियरेंस तक की पूरी प्रक्रिया पारदर्शी, सटीक और रियल-टाइम हो सके।

### मुख्य उद्देश्य (Core Objectives):
- **ऑर्डर ट्रैकिंग**: हर कस्टमर PO और SKU का रियल-टाइम डिस्पैच स्टेटस।
- **शून्य त्रुटि (Zero Dispatch Errors)**: बॉक्स काउंट, वजन (Weight in Kg), और व्हीकल एलोकेशन की ऑटो-कैलकुलेशन।
- **फास्ट इनवॉइसिंग और FMS**: डिलीवरी चालान बनते ही इनवॉइस लिंकिंग और पेमेंट स्टेटस ट्रैकिंग।
- **उच्चतम सुरक्षा और रोल-बेस्ड एक्सेस**: एडमिन, पीपीसी, लॉजिस्टिक्स और अकाउंट्स टीम के लिए अलग-अलग अधिकार।

---

## 2. संपूर्ण बिजनेस प्रोसेस फ्लो (Complete Business Process Flow)

सिस्टम में डेटा और ऑपरेशन 7 मुख्य चरणों (Phases) में प्रोसेस होते हैं:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 1. Master Data  │ ───>  │ 2. Sales Order  │ ───>  │ 3. PPC Planning │
│  (Party & SKU)  │       │  (PO Creation)  │       │  (Production)   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                                             │
                                                             ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 6. Invoices/FMS │ <───  │ 5. Delivery DC  │ <───  │ 4. Dispatch     │
│  (Tax & Pay)    │       │  (Print & Gate) │       │    Planning     │
└─────────────────┘       └─────────────────┘       └─────────────────┘
         │
         ▼
┌─────────────────┐
│ 7. Audit Ledger │
│  (Full Trace)   │
└─────────────────┘
```

### चरण 1: मास्टर डेटा सेटअप (Master Data Setup)
- **Parties Master**: सभी ग्राहकों (OEMs, वितरकों) की प्रोफाइल, GST नंबर, डिलीवरी एड्रेस, क्रेडिट अवधि (Credit Period Days) और लीड टाइम की एंट्री।
- **SKU Master**: तैयार माल (Finished Goods) का कैटलॉग, SKU कोड, विवरण, कैटेगरी, प्रति बॉक्स पीस की संख्या (Pcs/Box), और प्रति पीस वजन (Kg)।

### चरण 2: सेल्स ऑर्डर निर्माण (Sales Order Intake)
- सेल्स टीम ग्राहक से प्राप्त Purchase Order (PO) दर्ज करती है।
- एक ऑर्डर में मल्टीपल SKUs, ऑर्डर्ड क्वांटिटी (Units), और प्रॉमिस डिलीवरी डेट जोड़ी जाती है।
- सिस्टम आटोमेटिक ऑर्डर नंबर जेनरेट करता है (उदा. `ORD-2025-0891`).

### चरण 3: पीपीसी उत्पादन योजना (PPC - Production Planning & Control)
- पीपीसी टीम बैकऑर्डर और कमिटेड ऑर्डर्स को रिव्यू करती है।
- मशीन कैपेसिटी और स्टॉक के अनुसार प्रोडक्शन स्लॉट अलॉट किए जाते हैं।
- Planned Qty बनाम Dispatched Qty का अंतर रियल-टाइम मॉनिटर होता है।

### चरण 4: डिस्पैच शेड्यूलिंग (Dispatch Planning & Staging)
- लॉजिस्टिक्स टीम तैयार माल के लिए ट्रांसपोर्ट, व्हीकल नंबर, और ड्राइवर विवरण मैप करती है।
- किस ऑर्डर से कितने बॉक्स और कुल वजन (Gross Weight) डिस्पैच होना है, इसका प्लान तैयार होता है।

### चरण 5: डिलीवरी चालान और गेट पास (Delivery Challans & Gate Pass)
- वेयरहाउस से माल निकलते समय आधिकारिक **Delivery Challan (DC)** सिस्टम से तैयार होता है (उदा. `HK/DC-001/25-26`)।
- इसमें कुल बॉक्स, वजन, पार्टी का नाम और संबंधित PO नंबर शामिल होते हैं।
- **Printable Modal**: गेट पास और वाहन चालक के लिए फॉर्मल 3-कॉपी चालान प्रिंट करने की सुविधा।

### चरण 6: इनवॉइसिंग और पेमेंट क्लियरेंस (Invoicing & FMS Receivables)
- डिलीवरी चालान के आधार पर तुरंत **Tax Invoice** जेनरेट होता है (उदा. `AGL/TI-001/25-26`)।
- कुल इनवॉइस राशि (₹) और नियत तारीख (Due Date) रिकॉर्ड होती है।
- पेमेंट स्टेटस ट्रैकिंग: **PAID**, **PARTIAL**, या **PENDING**।
- **Payment Record Modal**: आंशिक या पूर्ण भुगतान मिलने पर UTR/चेक नंबर और तारीख दर्ज की जाती है।

### चरण 7: डिस्पैच लेज़र और ऑडिट ट्रेल (Dispatch Ledger & Audit Trail)
- ऑर्डर से लेकर पेमेंट तक का 100% ऑडिट लॉग।
- Excel एक्सपोर्ट सुविधा (एक क्लिक में पूरी रिपोर्ट डाउनलोड)।

---

## 3. उपयोग की गई तकनीकें (Technology Stack Used)

### 💻 Frontend (यूजर इंटरफेस)
| टेक्नोलॉजी | वर्जन / पैकेज | उपयोग का कारण |
| :--- | :--- | :--- |
| **React.js** | `v18.3.1` | कॉम्पोनेंट-बेस्ड मॉडर्न SPA आर्किटेक्चर |
| **Vite** | `v5.3.4` | सुपर-फास्ट HMR और ऑप्टिमाइज़्ड प्रोडक्शन बंडलिंग |
| **Redux Toolkit** | `v2.11.2` | ग्लोबल स्टेट मैनेजमेंट और ऑटोमैटिक डेटा सिंक |
| **Material UI (MUI)** | `v5.15.21` | एंटरप्राइज-ग्रेड थीमिंग, मोडल, ड्रॉअर और फॉर्म्स |
| **MUI X-DataGrid** | `v7.12.0` | हाई-परफॉरमेंस टेबल्स, सॉर्टिंग, फ़िल्टरिंग, पेजिनेशन |
| **Emotion React/Styled** | `v11.11` | डायनामिक CSS-in-JS स्टाइलिंग |
| **Recharts** | `v2.12.7` | एनालिटिक्स, डिस्पैच ट्रेंड्स और रेवेन्यू विज़ुअलाइज़ेशन चार्ट्स |
| **Lucide React** | `v0.408.0` | क्लीन, मॉडर्न SVG आइकॉन्स |
| **Dayjs** | `v1.11.11` | लाइटवेट डेट फॉर्मेटिंग और वित्तीय वर्ष कैलकुलेशन |
| **XLSX & File-Saver** | `v0.18.5` | एक्सेल (XLSX) डेटा एक्सपोर्ट और रिपोर्ट डाउनलोड |
| **Notistack** | `v3.0.1` | स्नैकबार और लाइव एक्शन नोटिफिकेशन्स |

### ⚙️ Backend (सर्वर और बिजनेस लॉजिक)
| टेक्नोलॉजी | वर्जन / पैकेज | उपयोग का कारण |
| :--- | :--- | :--- |
| **Node.js** | `>=18.0.0` | हाई-कॉनकरेंसी एसिंक्रोनस रनटाइम एन्वायरनमेंट |
| **Express.js** | `v4.21.0` | रोबस्ट और फ्लेक्सिबल RESTful API फ्रेमवर्क |
| **MongoDB & Mongoose** | `v8.6.0` | NoSQL डेटाबेस और स्कीमा वैलिडेशन मॉडलिंग |
| **JWT (jsonwebtoken)** | `v9.0.2` | स्टेटलेस सुरक्षित टोकन-बेस्ड ऑथेंटिकेशन |
| **Bcryptjs** | `v2.4.3` | पासवर्ड हैशिंग और एन्क्रिप्शन सुरक्षा |
| **Joi** | `v17.13.3` | API रिक्वेस्ट बॉडी और डेटा वैलिडेशन |
| **Security Shield** | `Helmet, HPP, Cors, Mongo-Sanitize, Rate-Limit` | XSS, नोएसक्यूएल इंजेक्शन, डीडॉस और डेटा पॉल्यूशन से सुरक्षा |
| **Winston & Morgan** | `v3.14.0` | सिस्टम एरर लॉगिंग और HTTP एक्सेस प्रोफाइलिंग |
| **PDFKit** | `v0.18.0` | बैकएंड से ऑटोमैटिक PDF चालान और इनवॉइस जनरेशन |

---

## 4. मॉड्यूल और कार्यप्रणाली (Modules & Features)

1. **Dashboard (`/dashboard`)**:
   - मुख्य मेट्रिक्स: Total Active Orders, Pending Planning Units, Dispatched Today, Pending Receivables.
   - ऑर्डर डिस्पैच प्रोग्रेस चार्ट और रिसेंट एक्टिविटी लॉग।
2. **Sales Orders (`/orders`)**:
   - सभी ग्राहक ऑर्डर्स की लिस्ट, डिलीवरी डेट्स, प्रोग्रेस बार, स्टेटस चिप्स।
   - **Order Create Modal**: मल्टीपल SKUs, ऑटो-कैलकुलेशन और सर्च फ़िल्टर।
   - **Order Detail Drawer**: साइडबार में ऑर्डर की फुल हिस्ट्री और लाइन आइटम्स।
3. **PPC Planning (`/ppc`)**:
   - कमिटेड क्वांटिटी बनाम शेड्यूल की प्लानिंग।
4. **Dispatch Planning (`/planning`)**:
   - डिस्पैच एलोकेशन, व्हीकल लोडिंग और ड्राइवर असाइनमेंट।
5. **Delivery Challans (`/challans`)**:
   - जारी किए गए सभी चालानों की लिस्ट।
   - **Challan Print Preview**: A4 प्रिंटेबल चालान व्यू।
6. **Invoices & FMS (`/invoices`)**:
   - टैक्स इनवॉइस लेज़र, अमाउंट (₹), स्टेटस (PAID/PARTIAL/PENDING)।
   - **Payment Modal**: पेमेंट रिसीव्ड एंट्री।
7. **Dispatch Ledger (`/ledger`)**:
   - सम्पूर्ण डिस्पैच हिस्ट्री और एक्सेल रिपोर्ट डाउनलोड बटन।
8. **Master Data (`/masters/parties`, `/masters/skus`)**:
   - कस्टमर और प्रोडक्ट मास्टर्स।
   - **Add Party Modal** और **Add SKU Modal** तत्काल नई एंट्री के लिए।
9. **Admin Control Center (`/admin`)**:
   - यूज़र्स का रोल असाइनमेंट, एक्टिव/इनएक्टिव स्टेटस, सिस्टम ऑडिट लॉग्स।

---

## 5. प्रोजेक्ट डायरेक्टरी संरचना (Project Directory Structure)

```text
Order to dispatch/
├── backend/                        # Node.js + Express REST API Server
│   ├── src/
│   │   ├── config/                 # DB, Logger & JWT Configurations
│   │   ├── middleware/             # Auth, Roles, Error & Security Handlers
│   │   ├── modules/                # Domain-Driven Functional Modules
│   │   │   ├── auth/               # User registration, login, profile
│   │   │   ├── party/              # Customer Master CRUD
│   │   │   ├── sku/                # SKU / Product Master CRUD
│   │   │   ├── order/              # Sales Orders & items
│   │   │   ├── ppc/                # PPC Production Scheduling
│   │   │   ├── schedule/           # Dispatch Scheduling & vehicle plans
│   │   │   ├── challan/            # Delivery Challan & PDF generator
│   │   │   ├── invoice/            # Invoices & billing logic
│   │   │   ├── payment/            # Payment receipts & updates
│   │   │   ├── shipment/           # Logistics & tracking
│   │   │   └── fms/                # Freight Management Clearance
│   │   ├── seeds/                  # Seed data for rapid testing
│   │   ├── utils/                  # Helper utilities & API response wrappers
│   │   ├── app.js                  # Express middleware setup
│   │   └── server.js               # Server bootstrap entry point
│   └── package.json
│
├── frontend/                       # React 18 + Vite Web Application
│   ├── src/
│   │   ├── components/             # Reusable UI components (Sidebar, Badges, Modals)
│   │   ├── features/               # Modular Feature Pages
│   │   │   ├── admin/              # Admin Control Center & User Management
│   │   │   ├── auth/               # Login & Token Handlers
│   │   │   ├── dashboard/          # Analytics & Visual KPI Dashboard
│   │   │   ├── execution/          # ChallansList, Create & Print Modal
│   │   │   ├── ledger/             # InvoicesList, DispatchLedger, PaymentModal
│   │   │   ├── masters/            # PartiesList, SkusList, Add Modals
│   │   │   ├── orders/             # OrdersList, OrderCreateModal, DetailDrawer
│   │   │   ├── planning/           # DispatchPlanning
│   │   │   └── ppc/                # PPCPlanning
│   │   ├── store/                  # Redux Toolkit store & API slices
│   │   ├── theme/                  # Brand tokens, colors, MUI theme provider
│   │   ├── utils/                  # Excel exporter, formatters, storage helpers
│   │   ├── App.jsx                 # Routes & Layout configuration
│   │   └── main.jsx                # Application root entry
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md                       # Comprehensive Project Documentation
```

---

## 6. बैकएंड API रूट्स (Backend REST API Endpoints)

| मेथड | एंडपॉइंट | विवरण | एक्सेस |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | यूजर लॉगिन और JWT टोकन प्राप्ति | Public |
| `GET` | `/api/parties` | सभी पार्टी/कस्टमर्स की सूची | Authenticated |
| `POST` | `/api/parties` | नई पार्टी की मास्टर एंट्री | Admin / Manager |
| `GET` | `/api/skus` | सभी SKUs / आइटम्स की सूची | Authenticated |
| `POST` | `/api/skus` | नए SKU की मास्टर एंट्री | Admin / PPC |
| `GET` | `/api/orders` | सभी सेल्स ऑर्डर्स का डेटा | Authenticated |
| `POST` | `/api/orders` | नया सेल्स ऑर्डर क्रिएट करना | Sales / Admin |
| `GET` | `/api/challans` | डिलीवरी चालानों की सूची | Logistics / Admin |
| `POST` | `/api/challans` | नया DC जारी करना | Logistics |
| `GET` | `/api/invoices` | टैक्स इनवॉइस और पेमेंट लिस्ट | Accounts / Admin |
| `POST` | `/api/payments` | इनवॉइस पेमेंट रिसीव्ड दर्ज करना | Accounts |
| `GET` | `/api/fms/ledger` | कंसोलिडेटेड डिस्पैच ऑडिट लेज़र | All Roles |

---

## 7. इंस्टॉलेशन और सेटअप गाइड (Setup & Run Instructions)

### आवश्यकताएं (Prerequisites):
- **Node.js**: v18.0.0 या अधिक
- **MongoDB**: लोकल या MongoDB Atlas क्लाउड क्लस्टर
- **NPM** या **Yarn**

### 1. रिपॉजिटरी क्लोन करें:
```bash
git clone https://github.com/Hemantkumar468/Order-to-dispatch-.git
cd "Order to dispatch"
```

### 2. बैकएंड सेटअप:
```bash
cd backend
npm install

# .env फाइल कॉन्फ़िगर करें:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/dpes
# JWT_SECRET=your_jwt_secret_key

# सर्वर शुरू करें:
npm start
```
*बैकएंड `http://localhost:5000` पर रन होगा।*

### 3. फ्रंटएंड सेटअप:
```bash
cd ../frontend
npm install

# डेवलपमेंट सर्वर शुरू करें:
npm run dev
```
*वेब एप्लिकेशन `http://localhost:3000` पर उपलब्ध होगा।*

### 4. प्रोडक्शन बिल्ड:
```bash
npm run build
```

---

## 🎯 मुख्य खूबियाँ (Highlights)
- **High-Contrast Dark/Light Slate UI**: सफेद बैकग्राउंड पर गहरा काला और स्लेट टेक्स्ट (`#0f172a`), जो पढ़ने में अत्यंत स्पष्ट है।
- **Zero-Downtime Fallback**: बैकएंड डेटाबेस कनेक्ट न होने पर भी सिस्टम में अंतर्निहित मॉक डेटा और लोकल स्टोरेज फॉलबैक है, जिससे UI कभी क्रैश नहीं होता।
- **Excel Export Ready**: ऑर्डर्स, चालान और इनवॉइस का डेटा एक क्लिक में एक्सेल शीट में डाउनलोड होता है।
- **Printable DC Generator**: डिलीवरी चालान की प्रोफेशनल A4 प्रिंटिंग।
