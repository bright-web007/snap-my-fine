# SnapMyFine - Complete Flow Documentation

## Overview
SnapMyFine is a web application that allows users to pay parking fines quickly by scanning their tickets. The app processes ticket images, extracts payment details, and facilitates secure payments to councils.

---

## Complete User Flow

### 1. **Homepage/Landing (Section 1)**
**Location:** `HomeSection` component
**State:** Default state when app loads

#### User Actions:
- **"Scan Ticket" Button** → Navigates to Camera Section
- **"Upload from Gallery" Button** → Opens file picker to select image
- **"Show All" Link** (if transactions exist) → Opens All Transactions Section
- **Recent Transactions Display** → Shows last 2 successful/failed transactions

#### What Happens:
- App loads with branding and main action buttons
- Fetches and displays recent transaction history from localStorage
- Shows "How it works" explanation

---

### 2. **Camera Section (Section 2)**
**Location:** `CameraSection` component
**Trigger:** User clicks "Scan Ticket" from homepage

#### User Actions:
- **"Capture Ticket" Button** → Requests camera permissions and starts video feed
- **"Take Snapshot" Button** → Captures image from video feed
- **"Upload from Gallery" Button** → Opens file picker
- **Back Arrow** → Returns to homepage

#### What Happens:
- Requests camera permissions (preferably back camera for mobile)
- Shows live video feed in preview area
- On snapshot: Converts video frame to JPEG format, saves to localStorage
- **Navigation:** After capture → Automatically goes to Image Preview Section

---

### 3. **Image Preview Section (Section 3)**
**Location:** `ImagePreviewSection` component
**Trigger:** After taking photo or uploading from gallery

#### API Calls Made:
- **POST `/api/ticket/process`** → Sends image data for OCR processing

#### User Actions:
- **"Retake Photo" Button** → Goes back to Camera Section
- **"Upload from Gallery" Button** → Opens file picker for new image

#### What Happens:
- Displays captured/uploaded image
- Shows "Processing your ticket..." message
- **Automatic Processing:** Calls `processTicket()` hook which:
  - Sends base64 image data to `/api/ticket/process`
  - External service performs OCR extraction
  - Returns ticket details (PCN number, council, amount, etc.)
- **Auto-Navigation:** After 5 seconds (if successful) → Goes to Review Section
- **Error Handling:** If invalid ticket → Shows error notification and returns to homepage

---

### 4. **Review Details Section (Section 4)**
**Location:** `ReviewSection` component
**Trigger:** After successful ticket processing

#### API Calls Made:
- **POST `/api/ticket/confirm`** → Verifies ticket with council systems

#### User Actions:
- **Edit Form Fields:** Council, PCN Number, Vehicle Number, Fine Amount, Email
- **"Continue" Button** → Confirms ticket details with council
- **Back Arrow** → Returns to Camera Section

#### What Happens:
- Pre-fills form with extracted ticket data
- User can edit/correct any details
- On continue: Calls `confirmTicket()` which:
  - Sends ticket details to council verification API
  - Validates ticket exists and gets current payment status
- **Success:** → Proceeds to Payment Section
- **Error Cases:**
  - "No outstanding charge" → Shows success notification and stays on review
  - "Council not supported" → Shows error notification via dropdown
  - "Failed to confirm" → Shows error notification

---

### 5. **Payment Details Section (Section 5)**
**Location:** `PaymentSection` component
**Trigger:** After successful ticket confirmation

#### User Actions:
- **"Pay Now" Button** → Initiates payment process
- **"Pay Later" Button** → Opens Save Fine Section
- **Back Arrow** → Returns to Review Section (or Saved Fines if came from there)

#### What Happens:
- Displays final payment details and amount
- Shows council name and PCN information
- User chooses to pay immediately or save for later

---

### 6. **Redirecting Section (Section 6)**
**Location:** `RedirectingSection` component  
**Trigger:** User clicks "Pay Now"

#### API Calls Made:
- **POST `/api/payment/create`** → Initiates payment with external provider

#### What Happens:
- Shows "Redirecting to secure payment..." message
- Creates payment session with external payment provider
- **Auto-redirect:** Opens payment provider's secure checkout page
- **Navigation:** After payment completion → Returns to app via webhook/callback

---

### 7. **Payment Received Section (Section 7)**
**Location:** `PaymentReceivedSection` component
**Trigger:** Return from successful payment

#### What Happens:
- Shows "Payment received" confirmation
- Displays payment details
- **Auto-Navigation:** After 30 seconds → Goes to Processing Section

---

### 8. **Processing Payment Section (Section 8)**
**Location:** `ProcessingSection` component
**Trigger:** After Payment Received section

#### What Happens:
- Shows "Processing your payment..." message
- Backend processes payment with council systems
- **Auto-Navigation:** After 20 seconds → Goes to Payment Status Section

---

### 9. **Payment Status Section (Section 9)**
**Location:** `PaymentStatusSection` component
**Trigger:** After Processing section

#### API Calls Made:
- **POST `/api/ticket/pay`** → Submits payment to council
- **PUT `/api/ticket/update`** → Updates ticket with payment ID

#### User Actions:
- **"Get Receipt" Button** → Proceeds to Receipt Section
- **"Save Receipt" Button** → Downloads/saves receipt

#### What Happens:
- Confirms payment has been processed successfully
- Shows payment confirmation details
- Offers receipt options

---

### 10. **Receipt Section (Section 10)**
**Location:** `ReceiptSection` component
**Trigger:** User requests receipt

#### User Actions:
- **"Send to Email" Button** → Opens Check Inbox Section  
- **"Continue" Button** → Returns to homepage

#### What Happens:
- Displays formatted payment receipt
- Shows all transaction details
- Adds transaction to local history

---

### 11. **Save Fine Section (Section 11)**
**Location:** `SaveFineSection` component
**Trigger:** User clicks "Pay Later" from Payment Section

#### API Calls Made:
- **POST `/api/ticket/save`** → Saves ticket for later payment

#### User Actions:
- **Enter Email Address**
- **"Save Fine" Button** → Saves ticket details
- **Back Arrow** → Returns to Payment Section

#### What Happens:
- Collects user email for ticket identification
- Saves ticket details to backend/localStorage
- **Navigation:** After saving → Returns to homepage

---

### 12. **Check Inbox Section (Section 12)**
**Location:** `CheckInboxSection` component
**Trigger:** After requesting email receipt

#### User Actions:
- **"Open Gmail" Button** → Opens Gmail app/website
- **"Continue" Button** → Returns to homepage

#### What Happens:
- Instructs user to check email for receipt
- Provides quick access to Gmail

---

### 13. **Payment Failed Section (Section 13)**
**Location:** `PaymentFailedSection` component
**Trigger:** Payment fails or is cancelled

#### User Actions:
- **"Try Again" Button** → Returns to Redirecting Section
- **Back Button** → Returns to homepage

#### What Happens:
- Shows payment failure message
- Offers retry option
- Records failed transaction in history

---

### 14. **Saved Fines Section (Section 14)**
**Location:** `SavedFinesSection` component
**Trigger:** User has previously saved fines

#### API Calls Made:
- **GET `/api/ticket/fetch`** → Retrieves saved tickets
- **DELETE `/api/ticket/delete`** → Removes saved tickets

#### User Actions:
- **"Pay Fine" Button** (per fine) → Loads fine into Payment Section
- **"Delete" Button** (per fine) → Removes saved fine
- **Back Arrow** → Returns to homepage

#### What Happens:
- Displays list of previously saved fines
- Allows payment or deletion of saved items
- Tracks which section user came from for proper navigation

---

### 15. **All Transactions Section (Section 15)**
**Location:** `AllTransactionsSection` component
**Trigger:** User clicks "Show All" from homepage

#### User Actions:
- **View Transaction History**
- **Back Arrow** → Returns to homepage

#### What Happens:
- Shows complete transaction history (successful and failed)
- Displays transaction details and status

---

### 16. **Partial Payment Status Section (Section 16)**
**Location:** `PartialPaymentStatusSection` component
**Trigger:** When partial payment is detected

#### What Happens:
- Handles cases where only partial payment was made
- Shows remaining balance
- Offers options to pay remainder or contact support

---

## API Endpoints Summary

### Ticket Processing
- **POST `/api/ticket/process`** → OCR extraction of ticket image
- **POST `/api/ticket/confirm`** → Verify ticket with council
- **POST `/api/ticket/save`** → Save ticket for later
- **GET `/api/ticket/fetch`** → Retrieve saved tickets  
- **DELETE `/api/ticket/delete`** → Delete saved tickets
- **PUT `/api/ticket/update`** → Update ticket with payment info
- **POST `/api/ticket/pay`** → Submit payment to council

### Payment Processing
- **POST `/api/payment/create`** → Create payment session
- **GET `/api/payment/[id]`** → Get payment status

### Email Services
- **POST `/api/ticket/email/success`** → Send success receipt
- **POST `/api/ticket/email/remind`** → Send payment reminder

---

## Key Features

### Error Handling
- **Unsupported Council:** Shows dropdown notification, stays on review
- **Invalid Ticket Image:** Shows error notification, returns to homepage  
- **Payment Failure:** Navigates to Payment Failed section
- **Network Issues:** Shows appropriate error messages

### Data Flow
- **Image Processing:** Camera/Gallery → Base64 → API → OCR → Ticket Data
- **State Management:** Zustand store for ticket data and saved fines
- **Local Storage:** Transaction history and temporary data
- **External Integration:** Council APIs and payment providers

### Navigation Patterns
- **Linear Flow:** Home → Camera → Preview → Review → Payment → Receipt
- **Error Recovery:** Any error returns to appropriate previous section
- **Save/Resume:** Can save fines and resume payment later
- **History Access:** Can view and manage previous transactions

### Auto-Transitions
- Image Preview → Review (5 seconds after processing)
- Payment Received → Processing (30 seconds)
- Processing → Payment Status (20 seconds)

---

## Technical Architecture

### Frontend
- **Next.js 15** with App Router
- **React Components** for each section/screen
- **Zustand** for state management
- **TypeScript** for type safety

### Backend
- **Next.js API Routes** for backend functionality
- **External APIs** for council integration and payment processing
- **Sentry** for error tracking and monitoring

### Mobile Optimization  
- **Responsive Design** for mobile-first experience
- **Camera API** with mobile-specific optimizations
- **Touch-friendly** interfaces and navigation

This flow ensures a smooth user experience from ticket capture to payment completion, with proper error handling and recovery options at each step.