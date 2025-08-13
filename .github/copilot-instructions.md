# AI Agent Instructions for NanuBhai E-commerce Client

## Project Overview
This is a Next.js 15.x e-commerce client application using the App Router pattern with TypeScript. The project follows a feature-based architecture with Redux for state management and server actions for API integration.

## Key Architecture Patterns

### Application Structure
- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components organized by feature
- `/src/services` - API integration layer
- `/src/actions` - Server actions for form handling and API calls
- `/src/redux` - Redux store and slices
- `/src/validation` - Zod schemas for form validation
- `/src/types` - TypeScript type definitions

### State Management
- Redux store configuration in `src/redux/store.ts`
- Authentication state managed via `authSlice`
- RTK Query for API state management (`apiSlice`)
- Server state revalidation using Next.js cache tags

### Authentication Flow
- JWT-based authentication using cookies
- Social login support (Google OAuth)
- Auth state persisted through `AuthProvider` component
- Protected routes handled by checking auth state

### Data Flow Patterns
1. Client-side state updates:
```typescript
dispatch(userLoggedIn({ user })); // Auth state
dispatch(apiSlice.util.resetApiState()); // Cache invalidation
```

2. Server actions for API calls:
```typescript
// Example in src/actions/user.ts
export async function loginAction(data: LoginSchemaType) {
  const result = await loginApi(data);
  // Handles validation, API calls, and error responses
}
```

## Development Workflow

### Running the Project
```bash
npm install
npm run dev     # Development
npm run build   # Production build
npm run start   # Production server
```

### Environment Setup
Required environment variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `NEXT_PUBLIC_TOKEN_NAME` - Cookie name for auth token

### Key Integration Points
1. API Base URL configured in `src/redux/features/apiSlice.ts`
2. Authentication token handling in service files (`getCookie()` function)
3. Form validation schemas in `src/validation/*.dto.ts`
4. Server cache invalidation via `revalidateTag()` in server actions

### Common Patterns
- Use `"use client"` directive for client-side components
- Implement form validation using Zod schemas
- Handle loading and error states in components
- Use Next.js Image component for optimized images
- Implement responsive layouts using Tailwind CSS

## Testing and Debugging
- Check auth state in Redux DevTools
- Verify API responses in Network tab
- Monitor server-side console for action logs
- Test form validation with invalid inputs
