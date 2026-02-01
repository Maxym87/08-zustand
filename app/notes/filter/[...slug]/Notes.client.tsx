"use client";

import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import styles from "./NotePage.module.css";
import Link from "next/link";

type NotesClientProps = {
  initialTag?: string;
};

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setDebouncedValue(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateSearchQuery(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, debouncedValue, initialTag],
    queryFn: () => fetchNotes(currentPage, debouncedValue, initialTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={styles.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p className={styles.loading}>Loading notes...</p>}
      {isError && <p className={styles.error}>Server error!</p>}
      {data && !isLoading && <NoteList notes={data.notes} />}
    </div>
  );
}
