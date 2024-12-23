import {Poppins, Montserrat} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});



export const metadata = {
  title: "VAMEPLEASE ADMIN",
  description: "Admin Dashboard of VAMEPLEASE, made by Christian James Santos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.class} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
