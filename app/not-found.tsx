import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto text-center py-20">
      <div>
        <h1 className="text-4xl font-bold text-dark-1 dark:text-light-1 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-dark-2 dark:text-light-2 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-dark dark:bg-gradient-light text-white rounded-lg hover:opacity-80 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
