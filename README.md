# FinanceFlow - Next.js Full-Stack Personal Finance Tracker

A beautiful, modern personal finance tracking application built with Next.js 15, TypeScript, and MongoDB. Track your income and expenses with intuitive visualizations and comprehensive analytics.

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
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd financeflow-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker
   
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🏗️ Project Structure

```
financeflow-nextjs/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── transactions/        # Transaction CRUD operations
│   │   │   ├── route.ts        # GET, POST transactions
│   │   │   ├── [id]/route.ts   # PUT, DELETE specific transaction
│   │   │   └── stats/route.ts  # Transaction statistics
│   │   └── health/route.ts     # Health check endpoint
│   ├── globals.css             # Global styles and CSS variables
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   ├── Dashboard.tsx           # Main dashboard component
│   ├── TransactionForm.tsx     # Transaction form component
│   ├── TransactionList.tsx     # Transaction list component
│   ├── ExpenseChart.tsx        # Monthly expense chart
│   ├── CategoryChart.tsx       # Category pie chart
│   └── Navbar.tsx              # Navigation component
├── hooks/                      # Custom React hooks
│   ├── useTransactions.ts      # Transaction management hook
│   └── use-toast.ts            # Toast notification hook
├── lib/                        # Utility libraries
│   ├── api.ts                  # API client and utilities
│   ├── utils.ts                # Helper functions
│   ├── mockData.ts             # Sample data and categories
│   ├── mongodb.ts              # MongoDB connection
│   └── models/                 # Database models
│       └── Transaction.ts      # Transaction schema
├── types/                      # TypeScript type definitions
│   └── transaction.ts          # Transaction-related types
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies and scripts
```

## 🛠️ Technology Stack

### **Full-Stack Framework**
- **Next.js 15** - React framework with App Router, API routes, and server components
- **TypeScript** - Type-safe JavaScript for better development experience
- **React 18** - Modern React with hooks and concurrent features

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Composable charting library for React

### **Database & Backend**
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **Next.js API Routes** - Built-in API endpoints

### **Forms & Validation**
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

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
- **Anonymous Usage** - No account required, uses local storage for user identification
- **Real-time Updates** - Instant feedback on all actions
- **Form Validation** - Comprehensive input validation
- **Error Handling** - Graceful error messages and recovery
- **Loading States** - Smooth loading indicators

## 🔧 API Endpoints

### **Transactions**
- `GET /api/transactions?userId={userId}` - Get all transactions for a user
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/{id}` - Update a transaction
- `DELETE /api/transactions/{id}?userId={userId}` - Delete a transaction
- `GET /api/transactions/stats?userId={userId}` - Get transaction statistics

### **Health Check**
- `GET /api/health` - Server health status

## 🎨 Customization

### **Styling**
The application uses Tailwind CSS with custom CSS variables for theming. You can customize colors, spacing, and other design tokens in:
- `app/globals.css` - CSS variables and base styles
- `tailwind.config.js` - Tailwind configuration

### **Categories**
Add or modify transaction categories in:
- `lib/mockData.ts` - Update the categories object

### **Charts**
Customize chart colors and styling in:
- `components/ExpenseChart.tsx`
- `components/CategoryChart.tsx`

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL` (your Vercel domain)

3. **Database Setup**
   - Use MongoDB Atlas for production
   - Update `MONGODB_URI` with your Atlas connection string

### **Other Deployment Options**
- **Netlify** - Full-stack deployment with serverless functions
- **Railway** - Simple deployment with built-in database
- **DigitalOcean App Platform** - Container-based deployment

## 🔒 Environment Variables

### **Required Variables**
```env
MONGODB_URI=mongodb://localhost:27017/finance-tracker
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### **Production Variables**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing full-stack framework
- **shadcn/ui** for the beautiful component library
- **Recharts** for the excellent charting components
- **Lucide** for the comprehensive icon set
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible database solution

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Next.js 15, TypeScript, and MongoDB**