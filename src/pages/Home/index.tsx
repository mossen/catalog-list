import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container";
import ProductThumbnail from "../../components/ProductThumbnail";

import { RootState, Dispatch } from "../../redux/store";
import { CatalogType } from "../../redux/models/catalogs";
import Loading from "../../components/Loading";

const Home: React.FC = () => {
  const loadingState = useSelector((state: RootState) => state.loading);
  const catalogsState = useSelector((state: RootState) => state.catalogs);
  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    dispatch.catalogs.getCatalogs();
  }, []);

  console.log("home :>> ", loadingState, catalogsState);

  return (
    <Container>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="w-full">filter</div>
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
