interface Board {
  title: string;
  type: BoardType;
  order: number;
  id: string;
  isPublic: boolean;
}

type BoardType = 'DEFAULT' | 'GALLERY'

export type {Board, BoardType};
