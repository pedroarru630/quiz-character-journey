
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImagePreloaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImagePreloader = ({ src, alt, className }: ImagePreloaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsError(true);
    img.src = src;
  }, [src]);

  if (isError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className={`bg-gray-700 ${className}`} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      style={{ opacity: isLoaded ? 1 : 0 }}
    />
  );
};

export default ImagePreloader;
