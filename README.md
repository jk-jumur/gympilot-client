<div align="center">

# 🏋️ GymPilot

### Fitness & Gym Management Platform

A production-ready full-stack platform connecting fitness enthusiasts, professional trainers, and platform administrators — featuring Stripe payments, real-time role management, and a vibrant community.

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF4D00?style=for-the-badge&logo=vercel&logoColor=white)](https://gympilot-client.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://gympilot-server.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jk-jumur/gympilot-client)

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-Session-FF4D00?style=flat-square)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)

</div>

---

## 📖 Overview

**GymPilot** is a comprehensive fitness management ecosystem built with modern web technologies. It serves three distinct user roles — **Members**, **Trainers**, and **Admins** — each with dedicated dashboards and workflows.

From discovering classes and booking sessions via **Stripe**, to trainer approval workflows, to platform-wide moderation — GymPilot handles the complete lifecycle of a fitness platform.

### Why This Project?

- 🎯 **Production-Grade Architecture** — Clean separation of concerns, role-based access control, secure session management
- 💳 **Real Payment Integration** — Stripe Checkout with automated booking creation on payment success
- 🔐 **Security-First** — HTTPOnly cookies, session verification middleware, role-based route protection
- 🎨 **Polished UI/UX** — Dark/Light theme, Framer Motion animations, skeleton loaders, toast notifications
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized

---

## 🔑 Test Credentials

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 
| **Trainer** | `trainer@test.com` | `Test1234` | Class management |
| **User** | `user@test.com` | `Test1234` | Book classes, apply as trainer |

---

## ✨ Feature Highlights

<table>
<tr>
<td width="50%" valign="top">

### 🌐 Public Features
- **Landing Page** — Framer Motion hero, Featured Classes (booking-sorted), Latest Forum Posts, 6 static sections
- **All Classes** — MongoDB `$regex` search + category `$in` filter + server-side pagination
- **Community Forum** — Public post browsing with server-side pagination
- **Authentication** — Email/password + Google OAuth via Better Auth

</td>
<td width="50%" valign="top">

### 👤 Member Features
- **Personal Dashboard** — Booking stats, favorites counter, trainer application status
- **Stripe Checkout** — Secure class booking with auto-confirmation
- **Favorites** — Save/remove classes with duplicate prevention
- **Trainer Application** — Submit with experience & specialty

</td>
</tr>
<tr>
<td valign="top">

### 🏋️ Trainer Features
- **Class Management** — Create, edit, delete classes with Imgbb image upload
- **Student Insights** — View enrolled students per class via modal
- **Forum Authoring** — Publish and manage knowledge posts
- **Approval Workflow** — New classes enter "Pending" state for admin review

</td>
<td valign="top">

### 🛡️ Admin Features
- **Platform Analytics** — User, class, and transaction counts
- **User Management** — Block/Unblock, promote to admin
- **Trainer Approval** — Approve/Reject with feedback + auto role update
- **Class Moderation** — Approve, reject, or delete any class
- **Transaction Ledger** — Read-only Stripe payment history

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
| Category | Technology |
|---|---|
| **Framework** | Next.js 16.3.6 (App Router) |
| **Language** | JavaScript (ES2024) |
| **Styling** | Tailwind CSS v4 |
| **UI Library** | HeroUI |
| **Animation** | Framer Motion |
| **Icons** | React Icons (Heroicons v2) |
| **Auth Client** | Better Auth |
| **Theme** | next-themes |
| **Notifications** | react-hot-toast |
| **Image Hosting** | Imgbb API |

### Backend (see [server repo](https://github.com/jk-jumur/gympilot-server))
- **Express.js** REST API
- **MongoDB** (Native Driver)
- **Better Auth** (Session + HTTPOnly Cookies)
- **Stripe** Checkout
- **Vercel** Serverless deployment

---

## 🔐 Security Implementation

```mermaid
flowchart LR
    A[User Login] --> B[Better Auth]
    B --> C[HTTPOnly Session Cookie]
    C --> D[Frontend Request]
    D --> E[verifyToken Middleware]
    E --> F{Session Valid?}
    F -->|Yes| G[verifyRole Middleware]
    F -->|No| H[401 Unauthorized]
    G --> I{Role Allowed?}
    I -->|Yes| J[Access Granted]
    I -->|No| K[403 Forbidden]