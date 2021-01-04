import React from "react";
import styled from "styled-components";
import Image from "../Image";
import QuickView from "./QuickView";
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

  return (
    <Figure className="lg:w-1/5 md:w-1/3 sm:w-1/2 p-4 w-full">
      <a className="block relative h-72 rounded overflow-hidden" href="">
        <Image alt={data.name} src={data._embedded.images[0].url} />
      </a>
      <figcaption className="mt-4">
        <QuickView data={data} />
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
    </Figure>
  );
};

const Figure = styled.figure`
  max-width: 20rem;
`;

export default ProductThumbnail;
