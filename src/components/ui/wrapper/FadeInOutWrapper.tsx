interface PropsI {
  showEl?: boolean;
  children: React.ReactNode;
  otherClassName?: string;
}

const FadeInOutWrapper = ({
  showEl = true,
  children,
  otherClassName,
}: PropsI) => {
  return (
    <div
      className={`  inline-block min-h-0  px-3 ${
        showEl ? "opacity-100 scale-100" : "opacity-0 scale-50"
      } transition-all duration-200 ease-linear ${otherClassName}`}
    >
      {children}
    </div>
  );
};

export default FadeInOutWrapper;
