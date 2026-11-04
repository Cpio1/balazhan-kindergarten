import { Blocks, MessagesSquare, Music, Music4, Palette, PersonStanding, Speech } from "lucide-react";

export const lessonIcons = {
  speech: MessagesSquare,
  art: Palette,
  games: Blocks,
  move: PersonStanding,
  music: Music,
  speechTherapy: Speech,
  dance: Music4,
} as const;
