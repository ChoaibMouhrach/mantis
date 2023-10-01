interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center p-4">
      {children}
    </main>
  );
};

export default AuthLayout;
