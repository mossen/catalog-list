import React from "react";
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";

import SelectOrder from "./SelectOrder";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import { RootState, Dispatch } from "../../redux/store";
import { ProductType } from "../../redux/models/catalogs";
import ProductThumbnail from "../../components/ProductThumbnail";

/**
 * Home page
 *
 * @return React.node
 */
const Home: React.FC = () => {
  // TODO: update url based on the order and pagination
  const dispatch = useDispatch<Dispatch>();
  const loadingState = useSelector((state: RootState) => state.loading);
  const catalogsState = useSelector((state: RootState) => state.catalogs);

  React.useEffect(() => {
    dispatch.catalogs.getCatalogs();
  }, []);

  const handlePaginationSelect = (page: number) => {
    dispatch.catalogs.setPage(page);
  };

  return (
    <Container>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center mb-10">
            <SelectOrder
              className="w-full md:w-1/3"
              dispatch={dispatch}
              selectedOption={catalogsState.order}
            />
            <Pagination
              className="mt-4 md:mt-0"
              current={catalogsState.page}
              total={catalogsState.data.page_count}
              onChange={(page) => handlePaginationSelect(page)}
            />
          </div>
          {loadingState.models.catalogs ? (
            <Loading />
          ) : (
            <div className="flex flex-wrap justify-center -m-4">
              {catalogsState.data?._embedded &&
                catalogsState.data._embedded.product.map(
                  (catalog: ProductType, index: number) => (
                    <ProductThumbnail key={index} data={catalog} />
                  )
                )}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Home;
