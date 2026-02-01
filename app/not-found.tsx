import Link from "next/link";
import css from "./Home.module.css";
import { Metadata } from "next";
import { url } from "inspector";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "Page not found",
    description: "The page you are looking for does not exist on NoteHub.",
    url: "https://08-zustand-chi-three.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Page Not Found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <div>
        <Link href="/">Go back home</Link>
      </div>
    </div>
  );
};

export default NotFound;
