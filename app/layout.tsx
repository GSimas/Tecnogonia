import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  'https://tecnogonia-gustavo-simas.simas-gustavo.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Tecnogonia — criando tecnologias que nos criam',
  description: 'Uma obra sobre Ciência, Tecnologia e Sociedade a partir do livro Tecnogonia, de Gustavo Simas.',
  authors: [{ name: 'Gustavo Simas', url: 'https://gustavosimas.com' }],
  keywords: ['Tecnogonia', 'Ciência Tecnologia e Sociedade', 'CTS', 'tecnologia', 'inteligência artificial', 'filosofia da tecnologia', 'Gustavo Simas'],
  openGraph: {
    title: 'Tecnogonia — criando tecnologias que nos criam',
    description: 'Uma obra sobre Ciência, Tecnologia e Sociedade a partir do livro Tecnogonia, de Gustavo Simas.',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en'],
    url: siteUrl,
    images: [{ url: '/og.png', width: 1680, height: 945, alt: 'Tecnogonia — criando tecnologias que nos criam' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tecnogonia — criando tecnologias que nos criam',
    description: 'Uma obra sobre Ciência, Tecnologia e Sociedade a partir do livro Tecnogonia, de Gustavo Simas.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><body>{children}</body></html>;
}
