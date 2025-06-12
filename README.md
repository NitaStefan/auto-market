# AutoDac 🚗

**AutoDac** is a full-stack web application built with **Next.js** and **Supabase**, created for a client in the second-hand auto industry. It enables the admin to manage car posts (for sale or dismantling), sync them with their Facebook Page using Facebook's Graph API, and interact with users via WhatsApp, Facebook, or direct calls.

---

## 🌟 Features

### 🔧 Admin Panel

- **Create, modify, delete car posts** (for sale or dismantling).
- **Repost** functionality for Facebook when images are changed (as Facebook API does not support image editing in existing posts).
- **Facebook Sync** via Graph API:
  - Publish posts on the connected Facebook Page.
  - Modify or delete Facebook posts.
  - Track **reactions count** and **comments** from Facebook users in real-time inside the admin dashboard.

### 📣 Car Post Public View

- Car post details visible to all users.
- Visitors can:
  - 📞 **Call** the admin directly.
  - 💬 **Send a WhatsApp message** using a predefined template.
  - 🔗 **Redirect to the Facebook post** for additional visibility and interaction.

### 🔍 Advanced Filtering

- Filter posts by:
  - **Car type**: For Sale / For Dismantling.
  - **Car brand**.
  - **Price range** (only for cars that are for sale).

### 🚛 Car Towing Section

- Static section describing the towing service.
- Includes a call-to-action phone number button for immediate contact.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React-based framework)
- **Backend-as-a-Service**: [Supabase](https://supabase.io/)
- **Authentication & Database**: Supabase
- **Social Integration**: [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- **Messaging**: WhatsApp Predefined Links
- **Deployment**: Vercel (or your preferred platform)

---

## 🔐 Admin Capabilities Overview

| Action                             | Application | Facebook                  |
| ---------------------------------- | ----------- | ------------------------- |
| Post                               | ✅          | ✅                        |
| Modify                             | ✅          | ✅ (unless images change) |
| Delete                             | ✅          | ✅                        |
| Repost (new FB post)               | ✅          | ✅                        |
| View Facebook reactions & comments | ✅          | ✅                        |

---

## 📲 User Interactions

- **Call the owner**: Tap-to-call on mobile.
- **Message on WhatsApp**: Opens chat with a predefined message.
- **View on Facebook**: Redirects to the synced Facebook post.

---

## 📌 Project Goal

To provide an easy-to-manage interface for the admin to promote second-hand car listings across both a personal platform and social media, while enabling seamless communication with potential buyers or dismantlers.

---

## 💼 Client Info

This app was custom-built for a client managing second-hand cars, with a strong focus on social integration and efficient post management. The application is designed to streamline operations, maximize reach, and simplify customer communication.
