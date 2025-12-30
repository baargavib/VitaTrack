# VitaTrack: Real-Time Emergency Response Dashboard

## Project Overview

VitaTrack is a web application for real-time management of emergency medical services (EMS), featuring live ambulance tracking, emergency call handling, and secure authentication.

## Key Features

*   **Live Ambulance Tracking:** Real-time display of ambulance locations on an interactive map.
*   **Emergency Call Management:** Track and manage incoming emergency calls.
*   **Ambulance Status Monitoring:** View status, driver, and ETA for each ambulance.
*   **Real-Time Notifications:** Instant alerts for critical events.
*   **Secure Authentication:** User login/logout via Firebase Authentication.
*   **Admin Dashboard:** Centralized control for EMS operations.

## Technologies Used

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn-ui
*   **Backend/Services:** Firebase (Authentication, Firestore Database), Google Maps API

## Getting Started

### Prerequisites

*   Node.js (v18+ LTS recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_GIT_URL>
    ```
2.  **Navigate to project directory:**
    ```bash
    cd vita_track
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Firebase Setup

1.  **Create Firebase Project:** Go to [Firebase Console](https://console.firebase.google.com/), create a new project.
2.  **Register Web App:** Add a web app to your Firebase project to get `firebaseConfig`.
3.  **Enable Services:**
    *   **Authentication:** Enable "Email/Password" in Firebase Authentication.
    *   **Firestore:** Create a Firestore Database (start in production mode).
4.  **Configure `.env`:** Create a `.env` file in the project root and add your Firebase config:
    ```plaintext
    VITE_FIREBASE_API_KEY="YOUR_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="YOUR_APP_ID"
    VITE_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
    ```
5.  **Populate Firestore:** Manually add initial data for `ambulances` (with `location.lat`, `location.lng`) and `notifications` collections in the Firebase Console.

### Running the Application

```bash
npm run dev
```
