import SidebarNotes from "@/components/SidebarNotes/SidebarNotes";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const SidebarNotesPage = async () => {
  return (
    <div>
      <SidebarNotes tags={tags} />
    </div>
  );
};

export default SidebarNotesPage;
