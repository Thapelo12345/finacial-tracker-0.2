import DialogContainer from "./dialogs/dialogContainer";
import "./globals.css";
import { Exo_2 } from "next/font/google"
import { ReduxProvider } from "./state_management/store/Providers";

const exo_2 = Exo_2({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= {`${exo_2.className} relative bg-red-50`}
      >
        <ReduxProvider>
          <DialogContainer />
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
