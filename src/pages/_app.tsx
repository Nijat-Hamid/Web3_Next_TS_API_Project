import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ 
      fontFamily:inter.style.fontFamily
     }}>
			<Component {...pageProps} />
		</MantineProvider>
	);
}
