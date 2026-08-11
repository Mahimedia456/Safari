export default function PageSectionLabel({
  number,
  children,
  light = false,
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-4
        text-[10px]
        font-bold
        uppercase
        tracking-[0.16em]
        ${
          light
            ? "text-white"
            : "text-black"
        }
      `}
    >
      <span
        className={
          light
            ? "text-white/35"
            : "text-black/35"
        }
      >
        {number}
      </span>

      <span>{children}</span>
    </div>
  );
}