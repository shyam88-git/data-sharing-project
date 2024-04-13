interface PropsI {
  children: React.ReactNode;
}

const MainLayout = ({ children }: PropsI) => {
  return (
    <main className=" relative min-h-screen max-w-[1920px] mx-auto overflow-hidden">
      {children}
    </main>
  );
};

export default MainLayout;
