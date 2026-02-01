"use client";

import css from "./NoteForm.module.css";
import { useId } from "react";
import { useRouter } from "next/navigation";
import type { NewNote } from "../../types/note";
import { useMutation } from "@tanstack/react-query";

const tags: ["Todo" | "Work" | "Personal" | "Meeting" | "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const id = useId();

  return (
    <form className={css.form} action={}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select id={`${id}-tag`} name="tag" className={css.select}></select>
      </div>
      <div className={css.action}>
        <button className={css.cancelButton} type="button">
          Cancel
        </button>
        <button className={css.submitButton} type="submit">
          Create note
        </button>
      </div>
    </form>
  );
}
