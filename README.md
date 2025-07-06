# FinanceFlow - Personal Finance Tracker

A beautiful, modern personal finance tracking application built with React, TypeScript, and Node.js. Track your income and expenses with intuitive visualizations and comprehensive analytics.

![FinanceFlow Dashboard](https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 📊 **Dashboard Overview**
- **Real-time Balance Tracking** - Monitor your current financial position
- **Income & Expense Summary** - Visual breakdown of your financial activity
- **Top Category Analysis** - Identify your biggest spending categories
- **Recent Transactions** - Quick view of your latest financial activities

### 💰 **Transaction Management**
- **Quick Add Form** - Add transactions instantly from the sidebar
- **Full Transaction Dialog** - Detailed transaction entry with validation
- **Edit & Delete** - Modify or remove transactions with confirmation
- **Category Organization** - Predefined categories for income and expenses

### 📈 **Analytics & Insights**
- **Monthly Expense Charts** - Bar charts showing income vs expenses over time
- **Category Pie Charts** - Visual breakdown of spending by category
- **Financial Statistics** - Comprehensive overview of your financial health
- **Trend Analysis** - Track your financial patterns over time

### 🎨 **Beautiful UI/UX**
- **Modern Design** - Clean, professional interface with gradients and shadows
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Interactive Elements** - Hover effects, animations, and micro-interactions
- **Dark/Light Theme Ready** - Built with theme support using CSS variables

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd financeflow
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   **Frontend (.env):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   **Backend (server/.env):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🏗️ Project Structure

```
financeflow/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── Dashboard.tsx        # Main dashboard component
│   │   ├── TransactionForm.tsx  # Transaction form component
│   │   ├── TransactionList.tsx  # Transaction list component
│   │   ├── ExpenseChart.tsx     # Monthly expense chart
│   │   ├── CategoryChart.tsx    # Category pie chart
│   │   └── Navbar.tsx           # Navigation component
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTransactions.ts   # Transaction management hook
│   │   └── use-toast.ts         # Toast notification hook
│   ├── lib/                     # Utility libraries
│   │   ├── api.ts              # API client and utilities
│   │   ├── utils.ts            # Helper functions
│   │   └── mockData.ts         # Sample data and categories
│   ├── types/                   # TypeScript type definitions
│   │   └── transaction.ts       # Transaction-related types
│   └── main.tsx                # Application entry point
├── server/                      # Backend source code
│   ├── config/                 # Configuration files
│   │   └── database.js         # MongoDB connection
│   ├── controllers/            # Route controllers
│   │   └── transactionController.js
│   ├── middleware/             # Express middleware
│   │   └── validation.js       # Input validation
│   ├── models/                 # Database models
│   │   └── Transaction.js      # Transaction schema
│   ├── routes/                 # API routes
│   │   └── transactions.js     # Transaction routes
│   └── server.js              # Express server setup
├── public/                     # Static assets
├── package.json               # Frontend dependencies
└── README.md                  # This file
```

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - Beautiful, accessible component library
- **Recharts** - Composable charting library for React
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful, customizable icons

### **Backend**
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **Express Validator** - Middleware for input validation
- **CORS** - Cross-origin resource sharing support

## 📱 Features in Detail

### **Transaction Categories**

**Income Categories:**
- Salary, Freelance, Investment, Business
- Rental Income, Dividends, Bonus, Gift
- Other Income

**Expense Categories:**
- Housing, Food & Dining, Transportation
- Entertainment, Healthcare, Shopping
- Utilities, Insurance, Education, Travel
- Subscriptions, Personal Care, Gifts & Donations
- Other Expense

### **Data Visualization**
- **Monthly Trends** - Track income and expenses over time
- **Category Breakdown** - See where your money goes
- **Balance Overview** - Monitor your financial health
- **Interactive Charts** - Hover for detailed information

### **User Experience**
- **Anonymous Usage** - No account required, uses local storage
- **Real-time Updates** - Instant feedback on all actions
- **Form Validation** - Comprehensive input validation
- **Error Handling** - Graceful error messages and recovery
- **Loading States** - Smooth loading indicators

## 🔧 API Endpoints

### **Transactions**
- `GET /api/transactions` - Get all transactions for a user
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/stats` - Get transaction statistics

### **Health Check**
- `GET /api/health` - Server health status

## 🎨 Customization

### **Styling**
The application uses Tailwind CSS with custom CSS variables for theming. You can customize colors, spacing, and other design tokens in:
- `src/index.css` - CSS variables and base styles
- `tailwind.config.js` - Tailwind configuration

### **Categories**
Add or modify transaction categories in:
- `src/lib/mockData.ts` - Update the categories object

### **Charts**
Customize chart colors and styling in:
- `src/components/ExpenseChart.tsx`
- `src/components/CategoryChart.tsx`

## 🚀 Deployment

### **Frontend Deployment**
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider (Netlify, Vercel, etc.)

### **Backend Deployment**
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Deploy to a Node.js hosting provider (Heroku, Railway, etc.)
3. Update environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Recharts** for the excellent charting components
- **Lucide** for the comprehensive icon set
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Node.js**
