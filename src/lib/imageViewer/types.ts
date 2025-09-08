export interface ImageViewerModalProps {
  images: Array<{ url: string; alt?: string; description?: string }>;
  initialIndex: number;
  onClose: () => void;
}

export interface SelectedImage {
  url: string;
  alt?: string;
  description?: string;
  index: number;
}

export type SlideDirection = 'left' | 'right' | null;
