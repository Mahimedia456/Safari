import {
  Apple,
  Play,
} from "lucide-react";

function StoreButton({
  type,
  href = "#",
}) {
  const isApple = type === "apple";

  return (
    <a
      href={href}
      aria-label={
        isApple
          ? "Download Safari on the App Store"
          : "Get Safari on Google Play"
      }
      className="
        group
        inline-flex
        min-h-[68px]
        min-w-[210px]
        items-center
        gap-4
        border
        border-current/25
        bg-black
        px-5
        py-3
        text-white
        transition-all
        duration-500
        hover:bg-white
        hover:text-black
      "
    >
      {isApple ? (
        <Apple
          size={30}
          strokeWidth={1.6}
        />
      ) : (
        <Play
          size={27}
          strokeWidth={1.6}
        />
      )}

      <span className="text-left">
        <span
          className="
            block
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.11em]
            opacity-55
          "
        >
          {isApple
            ? "Download on the"
            : "Get it on"}
        </span>

        <span
          className="
            mt-1
            block
            text-[18px]
            font-semibold
            leading-none
            tracking-[-0.035em]
          "
        >
          {isApple
            ? "App Store"
            : "Google Play"}
        </span>
      </span>
    </a>
  );
}

export default function StoreButtons({
  appleHref = "#",
  googleHref = "#",
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-3
        sm:flex-row
        ${className}
      `}
    >
      <StoreButton
        type="apple"
        href={appleHref}
      />

      <StoreButton
        type="google"
        href={googleHref}
      />
    </div>
  );
}