import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { Metadata } from "next";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NotesByIdProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesByIdProps): Promise<Metadata> {
  const { slug } = await params;

  const rawTag = slug[0];
  const tag =
    rawTag === "all"
      ? "All notes"
      : rawTag.charAt(0).toUpperCase() + rawTag.slice(1);
  return {
    title: `Notes: ${tag}`,
    description: `Browse ${tag} notes in NoteHub`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Browse ${tag} notes in NoteHub`,
      url: `https://08-zustand-chi-three.vercel.app/notes/filter/${rawTag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub notes filtered by ${tag}`,
        },
      ],
    },
  };
}

const NotesByTag = async ({ params }: NotesByIdProps) => {
  const { slug } = await params;

  const rawTag = slug[0];
  const tag =
    rawTag === "all"
      ? undefined
      : rawTag.charAt(0).toUpperCase() + rawTag.slice(1);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
};
export default NotesByTag;
