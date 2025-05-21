export const metadata = {
  title: 'Биржевой монито',
  description: 'Биржевой монитор',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
