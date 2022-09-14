import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

export default function productDetails({ product }) {
  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;

  const data = await getData();

  const filteredProduct = data.products.find(
    (product) => product.id === productId
  );

  if (!filteredProduct) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: filteredProduct,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: pathWithParams,
    // paths: [
    //   { params: { pathWithParams: "p1" } },
    //   // { params: { productId: "p2" } },
    //   // { params: { productId: "p3" } },
    // ],
    fallback: true,
    // fallback: "blocking",
  };
}
