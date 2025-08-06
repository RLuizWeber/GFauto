import './globals.css';
import localFont from 'next/font/local';
import Footer from "../components/global/Footer";
import UserDisplay from "../components/global/UserDisplay";

// Configure a fonte Geist Sans = gfauto/githubVercel/GFauto/app/layout.tsx
const geistSans = localFont({
  src: [
    {
      path: '../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
});

// Configure a fonte Geist Mono
const geistMono = localFont({
  src: [
    {
      path: '../public/fonts/GeistMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GeistMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/GeistMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
});

// Use no seu layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        {/* Header com UserDisplay */}
        <div className="fixed top-0 right-0 z-50 p-4">
          <UserDisplay />
        </div>
        
        {children}
        <Footer />
      </body>
    </html>
  );
}

