import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectOrder from "./SelectOrder";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import { RootState, Dispatch } from "../../redux/store";
import { CatalogType } from "../../redux/models/catalogs";
import ProductThumbnail from "../../components/ProductThumbnail";

const Home: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const loadingState = useSelector((state: RootState) => state.loading);
  const catalogsState = useSelector((state: RootState) => state.catalogs);

  React.useEffect(() => {
    dispatch.catalogs.getCatalogs();
  }, []);

  return (
    <Container>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="w-full">
            <SelectOrder
              dispatch={dispatch}
              selectedOption={catalogsState.order}
            />
          </div>
          {loadingState.models.catalogs ? (
            <Loading />
          ) : (
            <div className="flex flex-wrap -m-4">
              {catalogsState.data?._embedded &&
                catalogsState.data._embedded.product.map(
                  (catalog: CatalogType, index: number) => (
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
