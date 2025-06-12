<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/NitaStefan/autodac@main/docs-assets/AutoDac-logo-text.svg" width="160" alt="AutoDac Logo" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white" alt="Next.js Badge" style="margin: 3px;" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white" alt="Supabase Badge" style="margin: 3px;" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript Badge" style="margin: 3px;" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge" style="margin: 3px;" />
  <img src="https://img.shields.io/badge/Shadcn%2Fui-000?logo=shadcnui&logoColor=white" alt="shadcn/ui Badge" style="margin: 3px;" />
  <img src="https://img.shields.io/badge/Facebook%20Graph%20API-1877F2?logo=facebook&logoColor=white" alt="Facebook API Badge" style="margin: 3px;" />
</p>

[![Live](https://img.shields.io/badge/Visit%20AutoDac-000?logo=vercel&logoColor=white)](https://www.autodac.ro/)
<br>

Full-stack web application developed for a client in the second-hand automotive industry. It enables the admin to manage car listings (whether for sale or dismantling), sync them with the business's Facebook Page using the Facebook Graph API and interact with users via WhatsApp, Facebook, or direct calls.

## 🎯 Project Goal

Provide a user-friendly interface for a non-technical admin to easily and efficiently manage and promote the offers on both their website and Facebook Page, while also enabling smooth communication with visitors interested in the business’s car services.

## ✨ Features

### Admin Controls

- **Create, modify, delete** car posts
- **Repost** on Facebook — required when changing images, as the Facebook API does not support image updates on existing posts
- **Facebook Integration** via Graph API:

  - Publish posts on the connected Facebook Page
  - Modify or delete Facebook posts
  - Track **reactions count** and **comments** from Facebook users in real-time, directly within the app

### Car Post Public View

Visitors can view all details of a car listing and take direct actions such as:

- **Call** the admin
- **Send WhatsApp message** using a predefined template
- **View Facebook post** for additional visibility and interaction

### Car Filtering

Filter posts by **car type** (for sale / dismantling), **car brand**, **price range** (for sale only).

### Car Towing Section

- Static section describing the towing service.
- Includes a call-to-action phone number button for immediate contact.

## ⚡ Quick Start

Steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/NitaStefan/autodac.git
   cd autodac
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Add environment variables**

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

   # Facebook
   FACEBOOK_APP_ID=
   FACEBOOK_APP_SECRET=
   FB_PAGE_ID=

   # App Base URL
   NEXT_PUBLIC_BASE_URL=
   ```

4. **Start the dev server**
   ```bash
   pnpm run dev
   ```
