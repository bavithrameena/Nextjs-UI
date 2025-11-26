import './globals.css'
export const metadata = {
  title: 'GlobalX — Crew Check-In Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/html5-qrcode@2.4.9/minified/html5-qrcode.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
