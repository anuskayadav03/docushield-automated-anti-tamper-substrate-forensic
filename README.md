# 🛡️ DocuShield — Frontend

### Automated Anti-Tamper & Substrate Forensic Triage

DocuShield is a **frontend dashboard prototype** for a document-forensics and triage system designed for environments such as **banking institutions and land-registry offices**.

The frontend provides a modern dashboard interface for viewing document cases, priority triage information, scan requests, alerts, and case activity.

> **Current Status:** Frontend prototype completed. Backend integration is not implemented yet.

---

## 🚨 Problem

High-volume banking and land-registry offices handle a large number of identity and property-related documents.

Potential problems include:

* Forged documents
* Altered documents
* Suspicious QR codes
* Document inconsistencies
* Difficulties in prioritizing cases
* Time-consuming manual verification

DocuShield's frontend is designed as the interface through which officers can eventually monitor and review these cases.

---

## 💡 Frontend Solution

The DocuShield frontend provides a centralized dashboard where users can:

* View document verification statistics
* Start a new document scan
* Monitor priority cases
* View the triage queue
* Review suspicious cases
* Track case status
* View recent activity
* Navigate between different dashboard sections

The current version uses **frontend/static data** to demonstrate the complete user interface.

---

## ✨ Features

### 📊 Dashboard

The main dashboard provides an overview of the document verification environment.

It includes sections for:

* Total documents
* Pending reviews
* High-priority cases
* Flagged documents
* Recent activity
* Case statistics

---

### 📄 New Scan

The frontend includes a **New Scan** workflow.

Users can open the scan interface from the dashboard and provide document-related information.

The scan interface is currently a frontend component and does not yet send the document to a backend processing service.

---

### 🚦 Priority Triage Queue

The dashboard contains a priority triage queue for displaying cases that require attention.

The interface shows information such as:

* Case ID
* Document type
* Priority
* Risk level
* Status
* Detection information
* Time/date

Currently, these values are **frontend/demo data**.

In a future backend version, these values can be received dynamically from an API.

---

### 🔍 Case Review

The frontend provides a case-review interface for displaying information associated with suspicious or high-priority documents.

The interface is designed so that additional forensic information can later be connected to each case.

---

### 📈 Statistics & Status

The dashboard uses visual elements to make important information easier to understand.

Examples include:

* Status badges
* Priority indicators
* Statistics cards
* Activity information
* Case counts

---

### 🎨 Modern Dashboard UI

The frontend uses a modern administrative-dashboard design with:

* Dark interface
* Teal accent theme
* Sidebar navigation
* Dashboard cards
* Status indicators
* Modal interfaces
* Responsive layout
* Clear typography
* Interactive UI elements

---

## 🖥️ Technologies Used

### HTML

Used to create the dashboard structure and UI components.

### CSS

Used for:

* Dashboard layout
* Colors and themes
* Sidebar
* Cards
* Tables
* Modals
* Buttons
* Responsive design
* Typography
* Animations and visual effects

### JavaScript

Used for frontend interactions such as:

* Opening and closing modals
* Scan interface interactions
* Navigation
* Button actions
* Dynamic UI updates
* Dashboard interactions

---

## 📁 Project Structure

```text
docushield-automated-anti-tamper-substrate-forensic/
│
├── frontend/
│   │
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   │
│   └── assets/
│
└── README.md
```

> The exact filenames may change as the frontend continues to be developed.

---

## 🔄 Current Frontend Flow

```text
User
  │
  ▼
DocuShield Dashboard
  │
  ├── Dashboard
  │
  ├── New Scan
  │
  ├── Priority Triage Queue
  │
  ├── Case Review
  │
  └── Recent Activity
```

---

## 📸 Frontend Screens

The frontend currently includes interfaces for:

### Dashboard

Central overview of document cases and system statistics.

### New Scan Modal

Interface for starting a new document scanning process.

### Priority Triage Queue

Displays cases according to their priority and status.

### Case Information

Provides a structured view of individual document cases.

---

## ⚙️ Current Data Handling

At the current stage, the dashboard uses **frontend/demo data**.

For example:

```javascript
const cases = [
    {
        id: "DS-1024",
        documentType: "Identity Document",
        priority: "HIGH",
        status: "UNDER REVIEW"
    }
];
```

This means the values displayed in the dashboard and priority queue are currently controlled by the frontend.

### Future Backend Integration

When the backend is developed, these values can be replaced with API responses:

```text
Frontend
   │
   │ API Request
   ▼
Backend
   │
   ▼
Database / Forensic Processing
   │
   ▼
API Response
   │
   ▼
Frontend Dashboard
```

The frontend UI can then display real-time case information instead of static/demo data.

---

## 🚀 Future Development

The next stage of the project can include:

* Backend API
* Database integration
* Document upload
* Real document processing
* OCR
* QR-code verification
* Anti-tamper analysis
* Automated risk scoring
* Dynamic priority queue
* User authentication
* Case management
* Audit logs
* Real-time dashboard updates

These features are **not part of the current frontend implementation**.

---

## 🎯 Project Objective

The current frontend demonstrates how a document-forensics system could provide officers with a **centralized and easy-to-use dashboard** for monitoring document cases and prioritizing suspicious submissions.

The frontend serves as the foundation for future backend and forensic-analysis integration.

---

## 📌 Project Status

**Frontend:** ✅ Completed / In Development

**Backend:** ⏳ Not implemented yet

**Database:** ⏳ Not implemented yet

**Forensic Processing:** ⏳ Not implemented yet

**API Integration:** ⏳ Not implemented yet

---

## 👩‍💻 Author

**Anuska Yadav**

GitHub: [anuskayadav03](https://github.com/anuskayadav03)

---

## 📄 License

This project is currently developed as an educational/project prototype.
