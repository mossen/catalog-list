import React from "react";
import cx from "classnames";
import { ProductType } from "../../redux/models/catalogs";

type Props = {
  data: ProductType;
};

/**
 * Product Thumbnail component
 *
 * @param {ProductType} { data }
 * @return {*} React.node
 */
const ProductThumbnail: React.FC<Props> = ({ data }) => {
  // TODO: add href when product page is created
  // TODO: use lazy loading for images
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <figure className="max-w-xs lg:w-1/5 md:w-1/3 sm:w-1/2 p-4 w-full">
      <a className="block relative h-72 rounded overflow-hidden" href="">
        <img
          alt={data.name}
          className={cx(
            { "animate-pulse": !isLoaded },
            "bg-gray-200 object-cover object-center w-full h-full block"
          )}
          src={data._embedded.images[0].url}
          onLoad={() => setIsLoaded(true)}
        />
      </a>
      <figcaption className="mt-4">
        <span className="float-right bg-gray-300 px-2 py-1 text-xs cursor-pointer mt-1">
          View
        </span>
        <a href="">
          <h2 className="text-gray-900 title-font text-base font-medium mr-12 truncate">
            {data.supplier}
          </h2>
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 truncate">
            {data.name}
          </h3>
          <p className="mt-1">${data.price}</p>
          {data.messaging.marketing.length ? (
            <p className="text-xs text-blue-400">
              {data.messaging.marketing[0].short}
            </p>
          ) : null}
        </a>
      </figcaption>
    </figure>
  );
};

export default ProductThumbnail;
