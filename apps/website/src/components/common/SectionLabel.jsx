export default function SectionLabel({
  number,
  children,
  className = "",
}) {
  return (
    <div
      className={`
        flex items-center gap-4
        uppercase-label
        ${className}
      `}
    >
      {number ? (
        <span className="opacity-40">
          {number}
        </span>
      ) : null}

      <span>{children}</span>
    </div>
  );
}