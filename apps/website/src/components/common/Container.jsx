export default function Container({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[1800px]
        px-[var(--page-gutter)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}