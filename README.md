# Strapi + Next.js Railway Monorepo

Production-ready monorepo starter with Strapi v5, Next.js 14, and Railway deployment.

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Backend:** Strapi v5 + TypeScript  
- **Database:** Railway PostgreSQL
- **UI:** shadcn/ui + TailwindCSS
- **Monorepo:** pnpm workspaces + Turborepo
- **Deployment:** Railway (all-in-one)

## 📁 Project Structure

```
├── apps/
│   ├── web/          # Next.js 14 frontend
│   └── cms/          # Strapi v5 backend
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configurations
│   └── types/        # Shared TypeScript types
└── pnpm-workspace.yaml
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all apps
pnpm build

# Lint & format
pnpm lint
pnpm format
```

## 📦 Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production  
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - TypeScript type checking

## 🚢 Deployment

This monorepo is configured for Railway deployment with:
- PostgreSQL database
- Automatic deployments from Git
- Environment variable management

---

Built with ❤️ using modern tooling