import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AddressProvider } from "@/context/AddressContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { MessageProvider } from "@/context/MessageContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { ProductProvider } from "@/context/ProductContext";
import { CouponProvider } from "@/context/CouponContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Blumyn",
  description: "Comfort, care, and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-background font-body`}
      >
        <CouponProvider>
          <ProductProvider>
            <MessageProvider>
              <ProfileProvider>
                <OrderProvider>
                  <AddressProvider>
                    <SubscriptionProvider>
                      <CartProvider>{children}</CartProvider>
                    </SubscriptionProvider>
                  </AddressProvider>
                </OrderProvider>
              </ProfileProvider>
            </MessageProvider>
          </ProductProvider>
        </CouponProvider>
      </body>
    </html>
  );
}