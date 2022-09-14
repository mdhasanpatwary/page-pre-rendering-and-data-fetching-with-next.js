import fs from "fs/promises";
import Link from "next/link";
import path from "path";

import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { products } = props;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/products/${product.id}`}>{product.title}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  //use case of redirect
  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: "/route-name",
  //     },
  //   };
  // }

  //use case of notFound
  // if (data.products.length === 0) {
  //   return {
  //     notFount: true,
  //   };
  // }

  return {
    props: {
      products: data.products,
    },
    // revalidate: 10,
    // notFount: true,
    // redirect: '/route-name',
  };
}
