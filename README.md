# 🧾 Enterprise GST Invoice, Quotation & Billing System

An **enterprise-grade, frontend-only web application** for generating
**GST-compliant Quotations, Proforma Invoices, Tax Invoices, and Bills**
with **accurate Indian GST calculations**.

Built to meet the standards of **large businesses, manufacturers,
vendors, and service companies**, this system produces **clean, legally
correct, audit-ready documents** comparable to industry leaders like
**Zoho and Tally**.

------------------------------------------------------------------------

## 🚀 Key Highlights

✅ 100% Client-side (No Backend, No Database)\
✅ Accurate Indian GST Calculation (CGST / SGST / IGST)\
✅ Professional, Audit-Ready Document Design\
✅ Fully Responsive & Print-Ready (A4 PDF)\
✅ Persistent Data using Browser localStorage

------------------------------------------------------------------------

## 🎯 Target Users

-   🏢 Large Enterprises\
-   🏭 Manufacturers\
-   🛒 Vendors & Distributors\
-   🧑‍💼 Service Providers\
-   📊 Accounts & Finance Teams

------------------------------------------------------------------------

## 📄 Supported Document Types

1.  📑 **Quotation**\
2.  🧾 **Proforma Invoice**\
3.  🧮 **Tax Invoice**\
4.  💵 **Bill / Cash Memo**

All document types follow a **consistent, professional layout** and
**uniform GST logic**.

------------------------------------------------------------------------

## 🎨 Design & UI Principles

-   🧼 Clean, corporate & professional look\
-   📄 White background with subtle borders\
-   🔤 Modern fonts (Inter / Roboto)\
-   📐 Clear visual hierarchy\
-   🖨️ A4 print-ready layouts\
-   🔍 Audit-friendly formatting

------------------------------------------------------------------------

## 🧱 Standard Document Layout

### 🏷️ HEADER

-   Company logo upload (optional)
-   Company name (bold)
-   Address
-   Phone & Email
-   GSTIN & PAN

### 📌 DOCUMENT DETAILS

-   Document title (Invoice / Quotation / Proforma / Bill)
-   Auto-generated document number (editable prefix)
-   Document date
-   Due date / Valid till
-   Place & Country of supply

### 👥 BILLED BY / BILLED TO

-   Two-column layout
-   Company / Client name
-   Address
-   GSTIN (optional)
-   Contact details

------------------------------------------------------------------------

## 📦 ITEM TABLE

  Column        Description
  ------------- --------------------
  Sr No         Item sequence
  Description   Goods / Services
  HSN / SAC     Tax classification
  Quantity      Item quantity
  Rate          Price per unit
  GST %         Applicable GST
  Amount        Auto-calculated

### 🔁 Table Features

-   Add / remove rows
-   Qty × Rate calculation
-   GST calculated per item

------------------------------------------------------------------------

## 🧮 GST & TAX CALCULATION (Core Logic)

### ✅ Supported GST Rates

-   0%, 5%, 12%, 18%, 28%
-   Default: **18%**

### 📍 GST Rules

-   **Intra-State Supply**\
    → CGST + SGST (9% + 9% for 18%)

-   **Inter-State Supply**\
    → IGST (18%)

-   GST calculated **per item and total**

-   GST-free billing supported (0%)

-   Accurate rounding

------------------------------------------------------------------------

## 💰 TOTALS SECTION

-   Subtotal (Before GST)
-   Discount (₹ or %)
-   CGST Total
-   SGST Total
-   IGST Total
-   Round Off
-   **Grand Total (Bold)**
-   Amount in Words (Auto-generated)

------------------------------------------------------------------------

## 🏦 PAYMENT DETAILS

-   Bank Name
-   Account Number
-   IFSC Code
-   UPI ID
-   Optional QR Code
-   Payment Terms (Advance / Net 15 / Net 30)

------------------------------------------------------------------------

## 📜 TERMS & FOOTER

-   Editable Terms & Conditions
-   Jurisdiction text
-   Declaration: *This is a system-generated document*
-   Authorized Signatory

------------------------------------------------------------------------

## ⚙️ SETTINGS PANEL (Saved in localStorage)

-   Company Details
-   Logo Upload
-   Seller State (GST logic)
-   GSTIN & PAN
-   Default GST Rate
-   Bank & Payment Info
-   Terms & Conditions
-   Document Prefixes
-   Starting Document Numbers

------------------------------------------------------------------------

## 🎨 TEMPLATES

-   🧾 Classic GST (Default)
-   ✨ Modern Clean
-   🧾 Simple Bill (Minimal)

------------------------------------------------------------------------

## 📤 EXPORT & OUTPUT

-   📄 A4 Size PDF
-   👁️ PDF Preview
-   ⬇️ Downloadable PDF
-   🖨️ Print-Friendly Layout

------------------------------------------------------------------------

## 🛠️ TECH STACK

-   ⚛️ React
-   🎨 Tailwind CSS
-   🧠 Client-side Calculations
-   💾 Browser localStorage
-   🚫 No Backend
-   🚫 No Database
-   🚫 No Authentication

------------------------------------------------------------------------

## ✅ QUALITY STANDARDS

-   ₹ Currency with 2 decimal places
-   Accurate GST (especially 18%)
-   Professional spacing & alignment
-   Zero spelling or calculation errors
-   Enterprise-grade UI quality

------------------------------------------------------------------------

## 🏁 SUMMARY

This project delivers a **powerful, professional, GST-compliant
invoicing system** built entirely on the frontend. It is ideal for
businesses that demand **accuracy, compliance, speed, and premium
presentation**---without backend complexity.

------------------------------------------------------------------------

### ✨ Built with precision. Designed for enterprises. Ready for audits.
