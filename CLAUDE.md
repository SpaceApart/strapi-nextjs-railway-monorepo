# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies (use pnpm)
pnpm install

# Start all apps in development mode
pnpm dev

# Start specific apps
pnpm dev:web    # Next.js frontend only
pnpm dev:cms    # Strapi CMS only

# Build for production
pnpm build      # Build all apps
pnpm build:web  # Build Next.js only
pnpm build:cms  # Build Strapi only

# Type checking
pnpm type-check

# Linting and formatting
pnpm lint
pnpm format

# Clean build artifacts
pnpm clean

# Commit with conventional commits
pnpm commit
```

### Testing
```bash
# Run tests (when implemented)
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Strapi-specific
```bash
# Access Strapi CLI from CMS directory
cd apps/cms && pnpm strapi

# Generate TypeScript types for Strapi
cd apps/cms && pnpm strapi ts:generate-types
```

## Architecture

This is a **monorepo** using pnpm workspaces and Turborepo for build orchestration:

- **apps/web**: Next.js 14 frontend with App Router, TypeScript, and shadcn/ui
- **apps/cms**: Strapi v5 headless CMS with PostgreSQL
- **packages/**: Shared code between apps (ui, types, configs)

### Key Integration Points

1. **API Communication**: The Next.js app communicates with Strapi via the `strapiAPI` client in `/apps/web/src/lib/strapi.ts`. This client handles authentication and provides typed API methods.

2. **Environment Variables**:
   - `NEXT_PUBLIC_STRAPI_URL`: Strapi URL for frontend (default: http://localhost:1337)
   - `STRAPI_API_TOKEN`: API token for server-side requests
   - `DATABASE_URL`: PostgreSQL connection string (used by Strapi)

3. **Database**: Strapi uses PostgreSQL configured in `/apps/cms/config/database.ts`. The connection uses environment variables for Railway deployment.

4. **Type Safety**: Both apps use TypeScript. Strapi generates types in `/apps/cms/types/generated/` that can be imported into the Next.js app.

5. **Build Pipeline**: Turborepo manages the build order - shared packages build first, then apps. The pipeline is defined in `/turbo.json`.

### Development Workflow

1. **Parallel Development**: Use `pnpm dev` to run both apps simultaneously
2. **Shared Components**: UI components in `packages/ui` can be imported by both apps
3. **Type Sharing**: Define shared types in `packages/types` for cross-app consistency
4. **Git Hooks**: Commits are validated with commitlint and code is auto-formatted with lint-staged

### Deployment

This monorepo is optimized for Railway deployment with:
- Automatic PostgreSQL provisioning
- Environment variable injection
- Separate services for web and CMS apps
- Shared monorepo deployment