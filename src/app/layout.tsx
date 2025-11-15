import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "antd/dist/reset.css";
import "@mantine/charts/styles.css";

import AppContainer from "../../common/AppContainer";
import "./globals.css";

// ✅ Import font Google trực tiếp
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: [
    "200",
    "300",
    "400",
    "500",
   
  ],
  style: ["normal", "italic"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "T&T Group",
  description: "Điều khiển mô hình và quản lý bất động sản",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        <MantineProvider>
          <Notifications position="top-center" />
          <ModalsProvider>
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header />
              <main style={{ flex: 1, marginTop: "3%", padding: "2% 0" }}>
                <AppContainer>{children}</AppContainer>
              </main>
              <Footer />
            </div>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
