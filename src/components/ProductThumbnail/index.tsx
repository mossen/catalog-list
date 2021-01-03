import React from "react";
import { CatalogType } from "../../redux/models/catalogs";

type Props = {
  data: CatalogType;
};

/**
 * Product Thumbnail component
 *
 * @param {CatalogType} { data }
 * @return {*} React.node
 */
const ProductThumbnail: React.FC<Props> = ({ data }) => {
  // TODO: add href when product page is created
  return (
    <figure className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden" href="">
        <img
          alt={data.name}
          className="object-cover object-center w-full h-full block"
          src={data._embedded.images[0].url}
        />
      </a>
      <figcaption className="mt-4">
        <span className="float-right bg-gray-300 px-2 py-1 text-xs cursor-pointer mt-1">
          View
        </span>
        <a href="">
          <h2 className="text-gray-900 title-font text-lg font-medium mr-12 truncate">
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
