import DialogContainer from "./dialogs/dialogContainer";
import "./globals.css";
import { ReduxProvider } from "./state management/store/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative bg-red-50"
      >
        <ReduxProvider>
          <DialogContainer />
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
