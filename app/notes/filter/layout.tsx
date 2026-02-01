import css from "./LayoutNotes.module.css";

type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <div className={css.container}>
      <section className={css.sidebar}>
        <aside>{sidebar}</aside>{" "}
      </section>
      <section className={css.notesWrapper}> {children}</section>
    </div>
  );
}

export default NotesLayout;
