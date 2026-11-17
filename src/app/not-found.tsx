import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-24 text-center">
      <div>
        <p className="font-heading text-8xl font-bold text-brand-green/20">404</p>
        <h1 className="mt-2 font-heading text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for has moved or no longer exists.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-green">Back home</Link>
          <Link href="/contact" className="btn btn-outline-green">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
