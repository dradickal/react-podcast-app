# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this React podcast application repository.

## Project Overview

This is a React 18 podcast application built with Vite, featuring:
- Client-side React app with routing
- Express.js API server for podcast data
- Audio player functionality
- Series and episode management
- Context-based state management

## Development Commands

### Frontend (React App)
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend (API Server)
```bash
# Start API server in development mode
npm run api:dev

# Build API server for production
npm run api:build

# Start API server in production
npm run api
```

### Testing
This project currently has no test framework configured. When adding tests, consider:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing

## Code Style Guidelines

### File Structure
- `src/` - React components and utilities
- `src/util/` - Utility functions and data helpers
- `server/` - Express.js API server
- `public/` - Static assets (images, fonts)

### Component Conventions
- Use functional components with hooks
- Export components as named exports: `export function ComponentName()`
- Use PascalCase for component names
- Keep components focused on single responsibility

### Import Style
```javascript
// React imports first
import { useState, useEffect } from "react";

// Third-party libraries
import { Link, Outlet } from 'react-router-dom';

// Local imports (relative paths)
import { SeriesHeader } from "./SeriesHeader";
import { useEpisode } from "./EpisodeContext";
import icons from './util/iconsMapper';
import './ComponentName.css';
```

### State Management
- Use React Context for global state (see EpisodeContext.jsx)
- Prefer `useState` for local component state
- Use custom hooks for complex state logic
- Follow pattern: `const [state, setState] = useState(initialValue)`

### Naming Conventions
- Components: PascalCase (`EpisodeCard`, `SeriesHeader`)
- Functions: camelCase (`timecodeFromSec`, `actionClick`)
- Variables: camelCase (`listeningStatus`, `contextData`)
- Constants: UPPER_SNAKE_CASE (`BASE_API`, `ROOT_PATH`)
- Files: PascalCase for components (`EpisodeCard.jsx`), camelCase for utilities (`dateComparison.js`)

### CSS Organization
- Co-locate CSS files with components (`ComponentName.css`)
- Use BEM-like naming: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Import CSS at the bottom of component files

### Error Handling
- Use try-catch blocks for async operations
- Throw descriptive errors with context
- Handle fetch errors gracefully in API calls
- Use error boundaries for React component errors

### API Integration
- Use the `BASE_API` environment variable for API endpoints
- Follow the existing data utility pattern in `src/util/DataUtility/`
- Handle loading states with fallback components
- Use React Router loaders for data fetching

### Environment Variables
- `BASE_API` - API endpoint URL
- `IMAGE_PATH` - Path to static images
- `ROOT_PATH` - Application root path for routing

### ESLint Configuration
This project uses ESLint with React-specific rules:
- React 18.2 target
- JSX runtime enabled
- React hooks rules enforced
- No unused variables allowed (`max-warnings: 0`)

### Build Configuration
- Vite as build tool
- ESNext target for modern browsers
- Proxy configuration for API development
- Base path configuration for deployment

## Development Workflow

1. Start both frontend and API servers for full development experience
2. Use the proxy configuration in Vite to connect frontend to API during development
3. Follow the existing component patterns and naming conventions
4. Run lint command before committing changes
5. Test both development and production builds

## Common Patterns

### Data Fetching
```javascript
// Use React Router loaders for route-level data
loader: async ({ params }) => {
  const data = await getSeriesListData();
  return processData(data);
}
```

### Context Usage
```javascript
// Follow EpisodeContext pattern
const Context = createContext();
export function Provider({ children }) {
  const [state, setState] = useState(null);
  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  );
}
export function useContext() {
  return useContext(Context);
}
```

### Component Props
- Destructure props in function signature
- Use descriptive prop names
- Provide default values where appropriate
- Use TypeScript-style JSDoc comments for complex props

## Deployment Notes

- Frontend builds to `/demo/podcast-web-app/` base path
- API server builds to `dist-server/main.js`
- Uses PM2 for process management in production
- Environment-specific configuration in Vite config