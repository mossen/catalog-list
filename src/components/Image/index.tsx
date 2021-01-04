import React from "react";
import cx from "classnames";

type Props = {
  alt?: string;
  src: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};
/**
 * Image component
 *
 * @param {*} { alt, src, className, onClick }
 * @return {*} React.ReactNode
 */
const Image: React.FC<Props> = ({ alt, src, className, onClick }) => {
  // TODO: use lazy loading for images
  if (!src) {
    return null;
  }

  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <img
      alt={alt}
      className={cx(
        className,
        { "animate-pulse": !isLoaded },
        "bg-gray-200 object-cover object-center h-full block"
      )}
      src={src}
      onClick={onClick ? (event) => onClick(event) : undefined}
      onLoad={() => setIsLoaded(true)}
    />
  );
};

export default Image;
