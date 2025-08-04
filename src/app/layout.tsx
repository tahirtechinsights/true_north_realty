import '../styles/globals.css';
import { Inter } from 'next/font/google';

// Optimize font loading with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Optional: ensures text remains visible during webfont load
  variable: '--font-inter', // Optional: if you want to use CSS variables
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/assets/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Essential meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Title and description */}
        <title>True North Realty - Your Canadian Home Experts</title>
        <meta name="description" content="Discover your perfect Canadian home with True North Realty. Browse featured properties across Canada." />

        {/* Three.js script - added defer for better performance */}
        <script 
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
          defer
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}