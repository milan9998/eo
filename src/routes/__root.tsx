import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

/* ---------- SEO config ---------- */
const SEO = {
  url: "https://eo-interiors.com/",
  title: "EO-Interiors | Interior Design & 3D Visualization Studio",
  description:
    "EO-Interiors creates refined interior design concepts, realistic 3D visualizations, technical documentation and full project development for elegant residential and commercial spaces. Founded by Emilija Obradović.",
  image: "https://eo-interiors.com/portfolio-custom-1.png",
};

/* ---------- Schema.org structured data ---------- */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "InteriorDesignStudio"],
      "@id": "https://eo-interiors.com/#business",
      name: "EO-Interiors",
      description:
        "Interior design studio specializing in refined interior concepts, 3D visualizations, technical documentation and full project development for residential and commercial spaces.",
      url: "https://eo-interiors.com/",
      image: "https://eo-interiors.com/portfolio-custom-1.png",
      email: "info@eo-interiors.com",
      telephone: "+381694220690",
      priceRange: "$$$",
      areaServed: "Worldwide",
      founder: {
        "@type": "Person",
        name: "Emilija Obradović",
        jobTitle: "Founder & Creative Director",
      },
      sameAs: [
        "https://www.instagram.com/eo.interiors",
        "https://www.linkedin.com/in/emilija-obradovic-776225294",
      ],
      makesOffer: [
        "Interior Design",
        "3D Visualization",
        "Technical Documentation",
        "Project Development",
        "Design Consultations",
      ].map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://eo-interiors.com/#website",
      url: "https://eo-interiors.com/",
      name: "EO-Interiors",
      publisher: { "@id": "https://eo-interiors.com/#business" },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": "https://eo-interiors.com/#faq",
      mainEntity: [
        {
          q: "How much does an interior design project cost?",
          a: "The cost of a project depends on the size of the space, the complexity of the design and the level of detail required. Each project is individually tailored, so pricing is provided after an initial consultation and understanding of your needs.",
        },
        {
          q: "Can you work with clients remotely?",
          a: "Yes. EO Interiors works with clients both locally and remotely. Through detailed communication, plans and 3D visualizations, the entire design process can be successfully completed online.",
        },
        {
          q: "What do I need to start a project?",
          a: "To begin, we typically need basic floor plans, measurements, photos of the space and a short description of your goals, preferences and lifestyle needs. From there, the design process can start.",
        },
        {
          q: "Will I see the design before implementation?",
          a: "Yes. Every project includes realistic 3D visualizations that allow you to clearly understand how your future space will look and feel before any work begins.",
        },
        {
          q: "How long does the design process take?",
          a: "The timeline depends on the scope and complexity of the project, but most interior design projects take from a few weeks up to a maximum of 3 months, from concept development to final delivery. In the case of a turnkey implementation, the overall duration may be longer and depends on contractor availability, craftsmen schedules, and the overall construction timeline.",
        },
      ].map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SEO.title },
      { name: "description", content: SEO.description },
      {
        name: "keywords",
        content:
          "interior design, interior designer, 3D visualization, technical documentation, project development, interior design Serbia, luxury interior design, EO Interiors, Emilija Obradovic, enterijer, dizajn enterijera, 3D vizualizacija",
      },
      { name: "author", content: "EO-Interiors" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#1C0F0A" },
      // Open Graph
      { property: "og:site_name", content: "EO-Interiors" },
      { property: "og:title", content: SEO.title },
      { property: "og:description", content: SEO.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SEO.url },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: SEO.image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "EO-Interiors — luxury interior design" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.title },
      { name: "twitter:description", content: SEO.description },
      { name: "twitter:image", content: SEO.image },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SEO.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(STRUCTURED_DATA),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
