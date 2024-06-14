const AuthLayout = ({
    children,
  }: {
    children: React.ReactNode,
  })=> {
    return (
      <div className="bg-primary-900">
          {children}
          </div>
    );
  }

  export default AuthLayout