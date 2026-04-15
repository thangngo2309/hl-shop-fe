'use client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"min-height: 100vh"}>
      {children}
    </div>
  );
}