import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApiStatus from "@/components/api-status";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Strapi + Next.js
            <span className="block text-primary">Railway Monorepo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Production-ready monorepo starter with Strapi v5, Next.js 14, 
            shadcn/ui, and Railway deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="p-6 border rounded-lg space-y-2">
            <h3 className="text-lg font-semibold">Strapi v5</h3>
            <p className="text-sm text-muted-foreground">
              Modern headless CMS with TypeScript, Railway PostgreSQL, and content management.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg space-y-2">
            <h3 className="text-lg font-semibold">Next.js 14</h3>
            <p className="text-sm text-muted-foreground">
              App Router, TypeScript, shadcn/ui components, and modern React patterns.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg space-y-2">
            <h3 className="text-lg font-semibold">Railway Deploy</h3>
            <p className="text-sm text-muted-foreground">
              All-in-one deployment with PostgreSQL, Redis, and automatic scaling.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </div>

        <div className="w-full max-w-md space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Try our components:
          </p>
          <div className="flex space-x-2">
            <Input placeholder="Enter your email..." />
            <Button>Subscribe</Button>
          </div>
          <ApiStatus />
        </div>
      </div>
    </main>
  );
}