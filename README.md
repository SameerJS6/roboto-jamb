# Jamb Assignment

A Next.js + Sanity Assignment by Roboto Studio.

![Mockup of Jamb](./mockup.png)

## Few Highlights

1. Custom Native Scrollbar for Desktop
2. Smooth Animation
3. Components Customizability and etc.

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SameerJS6/roboto-jamb.git
   cd roboto-jamb
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy the `.env.example` files to `.env` in both `apps/web/` and `apps/studio/` directories:

   **For the Next.js web app (`apps/web/.env.example`):**

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=
   NEXT_PUBLIC_SANITY_API_VERSION=2025-08-29
   NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333

   SANITY_API_READ_TOKEN=
   SANITY_API_WRITE_TOKEN=
   SANITY_REVALIDATE_SECRET=
   ```

   **For the Sanity Studio (`apps/studio/.env.example`):**

   ```bash
   SANITY_STUDIO_DATASET=dataset
   SANITY_STUDIO_PROJECT_ID=project_id
   SANITY_STUDIO_TITLE="Turbo Studio"
   SANITY_STUDIO_PRESENTATION_URL=http://localhost:3000
   SANITY_STUDIO_PRODUCTION_HOSTNAME=
   ```

   > **Note**: Get your Sanity project ID and dataset from [sanity.io/manage](https://sanity.io/manage). Generate API tokens in your Sanity project settings.

4. **Seed the database**

   > **Note**: This step is required to populate your Sanity dataset with initial content and media for the application to function properly.

   ```bash
   cd apps/studio
   npx sanity dataset import ./production.tar.gz production --replace
   ```

5. **Start the development servers**

   ```bash
   pnpm dev
   ```

   This will start both the Next.js app (http://localhost:3000) and Sanity Studio (http://localhost:3333).

6. **Access the applications**

   - **Next.js App**: http://localhost:3000
   - **Sanity Studio**: http://localhost:3333

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all apps
- `pnpm check` - Run linting and type checking
- `pnpm fix` - Auto-fix linting issues
- `pnpm format` - Format code with Ultracite
