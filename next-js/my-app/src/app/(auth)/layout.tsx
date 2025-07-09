export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div>
            Header
        </div>
        <div>
            {children}
        </div>
        <div>Footer</div>
    </div>
  );
}
