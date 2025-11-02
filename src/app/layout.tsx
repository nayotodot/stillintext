import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto_sans_jp = Noto_Sans_JP({
	subsets: ["latin"],
	variable: "--font-noto-sans",
});

export const metadata: Metadata = {
	title: "Still in Text",
	description: "Convert to glitch text"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={noto_sans_jp.className}>
				{children}
			</body>
		</html>
	);
}
