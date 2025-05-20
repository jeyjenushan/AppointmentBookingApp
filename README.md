# Hospital Appointment Booking System

![System Overview](https://via.placeholder.com/800x400?text=System+Architecture+Diagram)  
_A secure, role-based appointment management platform for healthcare providers_

## 🌟 Key Features

### 👨‍⚕️ Multi-Role Access

- **Admin**: Doctor management, slot configuration
- **Doctor**: Appointment approval, schedule management
- **Patient**: Online booking, payment processing

### 🔒 Security Features

- Role-based authorization
- Secure authentication with temporary passwords
- Encrypted data transmission
- Protected API endpoints

### ⚙️ Core Functionalities

- 7-day doctor slot management
- Real-time appointment tracking
- Interactive dashboards with analytics
- Online payment integration
- Automated notifications
- Cancellation & rescheduling with refunds

## 🛠 Technology Stack

### Frontend

- **Framework**: React.js
- **UI Components**: Material-UI
- **Data Visualization**: Recharts
- **Date Handling**: Day.js

### Backend

- **Framework**: Spring Boot
- **Security**: Spring Security + JWT
- **Database**: MySQL

### Infrastructure

- **Database**: MySQL 8.0+
- **Build Tools**: Maven, npm

## 📋 System Workflow

1. **Admin Setup**

   - Registers doctors with temporary credentials
   - Configures weekly availability slots
   - Monitors system analytics

2. **Doctor Onboarding**

   - Receives activation email
   - Sets permanent credentials
   - Views/manages appointment calendar

3. **Patient Journey**
   - Searches doctors by specialty
   - Books available slots
   - Makes secure payments
   - Receives confirmation
   - Manages appointments

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- Java JDK 11+
- MySQL 8.0+
- Maven

### Installation Steps

1. **Database Setup**

   - Create MySQL database
   - Import schema (provided in `/database`)

2. **Backend Configuration**

   - Update `application.properties` with DB credentials
   - Configure email service settings
   - Set payment gateway keys

3. **Frontend Setup**

   - Configure API base URL in `.env`
   - Set up payment processor keys

4. **Running the System**

   ```bash
   # Start backend
   mvn spring-boot:run

   # Start frontend
   npm start
   ```
