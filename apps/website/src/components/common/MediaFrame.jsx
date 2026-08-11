export default function MediaFrame({
  src,
  alt = "",
  className = "",
  imageClassName = "",
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-safari-stone
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`
            h-full
            w-full
            object-cover
            ${imageClassName}
          `}
        />
      ) : (
        <div
          className="
            flex
            h-full
            min-h-[400px]
            items-center
            justify-center
            px-8
            text-center
            text-sm
            font-medium
            uppercase
            tracking-[0.14em]
            text-black/40
          "
        >
          Creative placeholder
        </div>
      )}
    </div>
  );
}