"use client";

import css from "./NoteForm.module.css";
import { useId } from "react";
import { useRouter } from "next/navigation";
import type { NewNote } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { addNote } from "@/lib/api";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const id = useId();

  const draft = useNoteDraftStore((state) => state.draft);
  const setDraft = useNoteDraftStore((state) => state.setDraft);
  const clearDraft = useNoteDraftStore((state) => state.clearDraft);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  const handleSubmit = (formData: FormData) => {
    const value = Object.fromEntries(formData) as unknown as NewNote;
    mutate(value);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          defaultValue={draft?.title}
          onChange={handleChange}
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          defaultValue={draft?.content}
          onChange={handleChange}
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        {
          <select
            defaultValue={draft?.tag}
            onChange={handleChange}
            id={`${id}-tag`}
            name="tag"
            className={css.select}
          >
            {tags.map((tag) => (
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </select>
        }
      </div>
      <div className={css.actions}>
        <button
          onClick={handleCancel}
          className={css.cancelButton}
          type="button"
        >
          Cancel
        </button>
        <button className={css.submitButton} type="submit">
          Create note
        </button>
      </div>
    </form>
  );
}
