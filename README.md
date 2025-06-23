# Get Me a Chai

A simple "Buy Me a Chai" web app built with Next.js, React, and Razorpay. Users can create a profile, receive payments (as "chai"), and supporters can leave messages with their donations.

---

## Features

- User registration and login (NextAuth)
- User profile with cover and profile picture
- Accept payments via Razorpay
- Supporters can leave a message with their payment
- Dashboard for profile management
- Top supporters and payment history
- Toast notifications for actions and payments
- Responsive design

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API routes, MongoDB (Mongoose)
- **Payments:** Razorpay
- **Authentication:** NextAuth.js
- **Notifications:** react-toastify

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/get-me-a-chai.git
cd get-me-a-chai
```

### 2. Install dependencies

```sh
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
```

Each user should set their Razorpay credentials in their dashboard.

### 4. Run the development server

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
/app
  /[username]         # User profile pages
  /dashboard          # User dashboard
  /login              # Login page
  /api                # API routes (Razorpay, etc.)
/components           # React components (Navbar, PaymentPage, etc.)
/models               # Mongoose models (User, Payment)
/utils                # Utility functions (DB connection)
/public               # Static assets (images, default avatars, etc.)
```

---

## Usage

- Register or log in.
- Set up your profile and Razorpay credentials in the dashboard.
- Share your profile link (e.g., `/your-username`) to receive chai (payments).
- Supporters can pay and leave a message.
- View top supporters and payment history on your profile.

---

## Customization

- Update images in `/public/images/`.
- Change default amounts or messages in `PaymentPage.js`.
- Style with Tailwind CSS classes.

---

## License

MIT

---

## Credits

- [CodeWithHarry Sigma HTML Series](https://www.youtube.com/@CodeWithHarry)
- [Razorpay Docs](https://razorpay.com/docs/)
- [Next.js](https://nextjs.org/)