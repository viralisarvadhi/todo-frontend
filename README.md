# Todo Frontend App

## Overview
Single-page React application for managing todos with a clean table interface.

## Tech Stack
- React 19
- Vite
- Plain CSS

## Setup
```bash
npm install
```

## Run
```bash
npm run dev
```

App runs at: **http://localhost:5173**

## Features

### Todo Management
- **Create**: Add new todos with title and optional detail
- **Read**: View all todos in a table format
- **Update**: Toggle todo status between "pending" and "done"
- **Delete**: Remove todos from the list

### UI Components

#### Todo Form
- Title input (required)
- Detail input (optional)
- Submit button to create new todo

#### Todo Table
Displays all todos with columns:
- **Title**: Todo title
- **Detail**: Additional description
- **Status**: Button to toggle between "pending" and "done"
- **Created**: Timestamp of creation
- **Actions**: Delete button

### Styling
- Completed todos show with strikethrough and reduced opacity
- Responsive table layout
- Clean, minimal design
- Hover effects on interactive elements

## API Integration
Connects to backend at **http://localhost:3000**

### API Calls
- `GET /todos` - Fetch all todos on mount
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo status
- `DELETE /todos/:id` - Delete todo

## File Structure
```
frontend(t)/
├── src/
│   ├── App.jsx       # Main component with todo logic
│   ├── App.css       # Component styles
│   ├── main.jsx      # React entry point
│   └── index.css     # Global styles
├── index.html        # HTML template
├── vite.config.js    # Vite configuration
└── package.json      # Dependencies
```

## Usage

1. Start the backend server first (port 3000)
2. Start the frontend dev server (port 5173)
3. Open http://localhost:5173 in your browser
4. Add, update, and delete todos through the UI

## Requirements
- Backend must be running at http://localhost:3000
- Modern browser with JavaScript enabled
