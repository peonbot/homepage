export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteAnimation {
  name: string;
  frames: SpriteFrame[];
}

export interface SpriteSheet {
  image: HTMLImageElement;
  animations: SpriteAnimation[];
  frameWidth: number;
  frameHeight: number;
}

// Animation row names in order
const ANIMATION_NAMES = ['idle', 'working', 'done', 'needHelp', 'searching'] as const;
export type AnimationName = typeof ANIMATION_NAMES[number];

/**
 * Loads a sprite sheet with fixed grid dimensions
 * Automatically filters out empty/blank frames
 * @param imageSrc - Path to the sprite sheet image
 * @param columns - Number of frames per row
 * @param rows - Number of animation rows (default 5)
 */
export async function analyzeSpriteSheet(
  imageSrc: string,
  columns: number,
  rows: number = 5
): Promise<SpriteSheet> {
  const image = await loadImage(imageSrc);

  // Create canvas to analyze pixel data
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const frameWidth = Math.floor(image.width / columns);
  const frameHeight = Math.floor(image.height / rows);

  const animations: SpriteAnimation[] = [];

  for (let row = 0; row < rows; row++) {
    const frames: SpriteFrame[] = [];

    for (let col = 0; col < columns; col++) {
      const frame = {
        x: col * frameWidth,
        y: row * frameHeight,
        width: frameWidth,
        height: frameHeight,
      };

      // Only include non-empty frames
      if (!isFrameEmpty(imageData, frame, image.width)) {
        frames.push(frame);
      }
    }

    animations.push({
      name: ANIMATION_NAMES[row] || `animation_${row}`,
      frames,
    });
  }

  return {
    image,
    animations,
    frameWidth,
    frameHeight,
  };
}

/**
 * Check if a frame is empty (has very few non-transparent pixels)
 */
function isFrameEmpty(
  imageData: ImageData,
  frame: SpriteFrame,
  imageWidth: number
): boolean {
  let opaquePixels = 0;
  const threshold = 20; // Minimum opaque pixels to be considered non-empty

  for (let y = frame.y; y < frame.y + frame.height; y++) {
    for (let x = frame.x; x < frame.x + frame.width; x++) {
      const idx = (y * imageWidth + x) * 4;
      const alpha = imageData.data[idx + 3];
      if (alpha > 30) {
        opaquePixels++;
        if (opaquePixels >= threshold) {
          return false; // Frame has content
        }
      }
    }
  }

  return true; // Frame is empty
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
