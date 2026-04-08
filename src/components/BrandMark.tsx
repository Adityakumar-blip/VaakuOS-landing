type BrandMarkProps = {
  className?: string;
};

export const BrandMark = ({ className = "" }: BrandMarkProps) => {
  return (
    <div
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground ${className}`.trim()}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 9C6 7 8 7 10 9C12 11 14 11 16 9C18 7 20 7 22 9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4 13C6 11 8 11 10 13C12 15 14 15 16 13C18 11 20 11 22 13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4 17C6 15 8 15 10 17C12 19 14 19 16 17C18 15 20 15 22 17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
