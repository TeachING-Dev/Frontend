export type ArchiveFolder = {
  id: number;
  name: string;
  count: number;
  date: string;
};

export const ARCHIVE_FOLDERS: ArchiveFolder[] = [
  {
    id: 1,
    name: "Backend",
    count: 4,
    date: "2026.01.01",
  },
  {
    id: 2,
    name: "Frontend",
    count: 0,
    date: "2026.01.01",
  },
  {
    id: 3,
    name: "Design",
    count: 0,
    date: "2026.01.01",
  },
  {
    id: 4,
    name: "AI",
    count: 0,
    date: "2026.01.01",
  },
  {
    id: 5,
    name: "Database",
    count: 0,
    date: "2026.01.01",
  },
];