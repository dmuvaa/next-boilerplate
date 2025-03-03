# Next.js Supabase Boilerplate

A comprehensive starter template for modern web development, featuring Next.js 15, React 19, Supabase, Prisma, ShadCN UI, and more.

![Project Screenshot](placeholder-screenshot.png)

## Features

- **Next.js 15**: Utilizing the latest features and optimizations
- **React 19**: Leveraging the newest React capabilities
- **Supabase Integration**: For authentication and database management
- **Prisma ORM**: Simplifying database operations
- **ShadCN UI Components**: Beautiful, customizable UI elements
- **Dark/Light Mode**: With system preference detection
- **Hashnode CMS Integration**: For seamless blog management
- **Stripe/Paystack Integration**: For handling payments
- **Open AI integration**: For businesses that want to integrate AI features
- **SEO Optimization**: Built-in SEO component for better search engine visibility
- **Resend Integration**: For sending emails (e.g., contact form submissions)
- **TypeScript Support**: For enhanced code quality and developer experience
- **Responsive Design**: Mobile-first approach for all screen sizes
- **User Profiles**: Basic user profile management
- **Contact Form**: With server-side handling and email notifications

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn
- A Supabase account
- A Resend account
- A Hashnode account (for blog integration)
- Stripe/Paystack Account
- Open AI account

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/nextjs-supabase-boilerplate.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`
   cd nextjs-supabase-boilerplate
   \`\`\`

3. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
   or
   \`\`\`
   yarn install
   \`\`\`

4. Set up environment variables (see Environment Variables section below)

5. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
   or
   \`\`\`
   yarn dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_database_connection_string

# RESEND
RESEND_API_KEY=your_resend_api_key

# Hashnode
HASHNODE_PUBLICATION_ID=your_hashnode_publication_id
\`\`\`

### How to obtain the keys:

1. **Supabase**: 
   - Create a project at [supabase.com](https://supabase.com)
   - Find your API URL and anon key in the project settings

2. **Database URL**: 
   - This is provided by Supabase. You can find it in your project's database settings

3. **Resend**: 
   - Sign up at [resend.com](https://www.resend.com)
   - Obtain your API key and domain from your Resend dashboard.

4. **Hashnode**: 
   - Create an account at [hashnode.com](https://hashnode.com)
   - Set up a publication and find your publication ID in the publication settings

## Usage Guide

### Authentication

The boilerplate comes with Supabase authentication set up. Use the `AuthForm` component to handle sign-up and sign-in functionality.

### Database Operations

Prisma is configured to work with your Supabase database. Use the Prisma client in your API routes or server components to perform database operations.

### Blog Integration

The blog is integrated with Hashnode CMS, a feature-rich CMS platform, where you can create posts seamlessly. Posts are fetched and displayed in the `/blog` route.

### Stripe Integration

Stripe payment integration enables you to receive payments from your users.

### Paystack Integration

Paystack is a Stripe alternative for users in Africa who can't access Stripe.

### Resend + React Email

Resend Integration enables you to send transactional emails at scale.

### Contact Form

A contact form is available that sends emails using Mailgun. The form submission is handled by the `/api/contact` route.

### Styling

The project uses Tailwind CSS for styling. Customize the theme in the `tailwind.config.js` file.

## Project Structure

\`\`\`
├── src/app/
│   ├── api/
│   ├── blog/
│   ├── dashboard/
│   ├── profile/
│   ├── layout.tsx
│   └── page.tsx

├── components/ui
├── lib/
├── prisma/
├── public/
├── utils/
├── lib/
├── prisma/
├── public/


└── ...configuration files
\`\`\`

## Customization

- **Theme**: Modify the `theme-provider.tsx` file to customize the theme
- **Components**: Add or modify components in the `components/` directory
- **API Routes**: Add new API routes in the `app/api/` directory
- **Database Schema**: Update the schema in `prisma/schema.prisma` and run migrations
- **Web Pages**: Create web pages inside the `src/app` folder and add them to your header, footer, or dashboard.

## Deployment

This project is ready to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

