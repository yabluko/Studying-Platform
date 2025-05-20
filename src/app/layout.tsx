import Providers from "@/components/Providers/Providers";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
