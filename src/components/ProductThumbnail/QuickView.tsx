import React from "react";
import Modal from "../Modal";
import Image from "../Image";
import { ProductType } from "../../redux/models/catalogs";

type Props = {
  data: ProductType;
};

const QuickView: React.FC<Props> = ({ data }) => {
  const [largeImageUrl, setLargeImageUrl] = React.useState(
    data._embedded.images?.[0].url
  );

  return (
    <Modal
      anchor={
        <span className="float-right bg-gray-300 px-2 py-1 text-xs cursor-pointer mt-1">
          View
        </span>
      }
    >
      <div className="flex items-start bg-white max-w-screen-md w-full rounded p-4">
        <div className="flex mr-4 max-h-96 overflow-scroll">
          {data._embedded.images.length &&
            data._embedded.images.map((image, index) => (
              <Image
                key={index}
                className="w-24 cursor-pointer"
                alt={data.name}
                src={image.url}
                onClick={() => setLargeImageUrl(image.url)}
              />
            ))}
        </div>
        <div className="flex w-full">
          <div className="flex mr-8">
            {largeImageUrl ? (
              <Image className="w-56" alt={data.name} src={largeImageUrl} />
            ) : null}
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h2 className="text-gray-900 title-font text-base font-medium mr-12">
                {data.supplier}
              </h2>
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {data.name}
              </h3>
              <p className="mt-1">${data.price}</p>
              {data.messaging.marketing.length ? (
                <p className="text-xs text-blue-400">
                  {data.messaging.marketing[0].short}
                </p>
              ) : null}
            </div>
            <button className="bg-blue-300 rounded p-2 text-sm mx-auto">
              Go to this Deal
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickView;
