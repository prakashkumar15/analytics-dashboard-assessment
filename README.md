# MapUp - Analytics Dashboard Assessment

## Overview

This project analyzes an Electric Vehicle (EV) population dataset and presents key insights through an interactive frontend analytics dashboard. The focus of the implementation is to transform raw EV data into meaningful metrics and visual summaries that help users understand trends, distributions, and patterns within the dataset.

The dashboard displays high-level statistics such as total vehicles, manufacturers, and models, along with interactive table features including searching, sorting, and pagination. The solution is designed with clarity, usability, and performance in mind.

AI and LLM tools were used during development to assist with understanding requirements and improving implementation efficiency. All design decisions, data processing logic, and technical choices are clearly understood and can be explained if required.
## Tech Stack Used

### Frontend Framework

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library built on Radix UI
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful icon library

### Data Visualization

- **Recharts 2.15.4** - Composable charting library built on React components

### Data Processing

- **PapaParse 5.5.3** - CSV parsing library
- **TanStack Table 8.21.3** - Headless UI for building powerful tables

### Development Tools

- **ESLint 9** - Code linting
- **PostCSS** - CSS processing


## Project Structure

```
dashboard/
├── app/
│   ├── api/
│   │   ├── route.ts                 # Main data API with pagination
│   │   ├── metrics/
│   │   │   └── route.ts            # Metrics API (totals, top manufacturers)
│   │   ├── yearly/
│   │   │   └── route.ts            # Yearly analytics API
│   │   └── utils/
│   │       └── csvread.ts          # CSV loading utility
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main dashboard page
├── components/
│   ├── columns.tsx                 # Table column definitions
│   └── ui/                         # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── data-table.tsx          # Data table component
│       ├── input.tsx
│       ├── navigation-menu.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-mobile.ts               # Mobile detection hook
├── lib/
│   └── utils.ts                    # Utility functions
└── public/                         # Static assets
```

## Features Implemented

### 📊 Dashboard Analytics

- **Key Metrics Cards**: Total Vehicles, Manufacturers, Models, and EV Types
- **Interactive Bar Chart**: Top 10 manufacturers with sorting and filtering
- **Yearly Pie Charts**: Electric vehicle type distribution by year
- **Top Models Ranking**: Year-specific top 10 models with serial numbers

### 📋 Data Table

- **Paginated Data Table**: Full dataset with sorting and filtering
- **Search Functionality**: Search by manufacturer
- **Responsive Design**: Mobile-friendly table layout

### 🎛️ Interactive Features

- **Year Selector**: Switch between different years for analysis
- **Real-time Updates**: Dynamic data loading and rendering
- **Navigation Menu**: Professional navigation with dropdowns

### 🎨 UI/UX

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Loading States**: Proper loading indicators
- **Error Handling**: Graceful error management

## API Endpoints

### GET `/api`

- **Purpose**: Main data endpoint with pagination
- **Query Params**: `page`, `limit`
- **Response**: Paginated vehicle data with metadata

### GET `/api/metrics`

- **Purpose**: Dashboard metrics and aggregations
- **Response**:
  ```json
  {
    "totalVehicles": 50000,
    "totalManufacturers": 45,
    "totalModels": 150,
    "totalEVTypes": 2,
    "topManufacturers": [...]
  }
  ```

### GET `/api/yearly`

- **Purpose**: Yearly analytics data
- **Response**:
  ```json
  {
    "yearlyData": [...],
    "yearlyTopModels": [...]
  }
  ```

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd analytics-dashboard-assessment/dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build
```

### Environment Setup

- No additional environment variables required
- CSV data is loaded from the local filesystem
- All dependencies are included in package.json

## Deployment

The dashboard has been deployed and is accessible at:

**🚀 Live Dashboard URL:** [Add your deployment URL here]

### Deployment Platform Used

- Vercel – Used for fast and reliable deployment with native Next.js support.

