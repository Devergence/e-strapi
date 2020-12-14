import style from '../styles/Home.module.css';
import fetch from 'isomorphic-unfetch';
import {IProduct} from "../interfaces";

export default function Home(props: { products:IProduct[] }) {
  const { products } = props;
  return (
    <div className={style.container}>
     <h1>{products[0].meta_description}</h1>
    </div>
  )
}

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const res = await fetch(`${API_URL}/products`)
  const data = await res.json();

  return {
    props: {
      products: data
    }
  }
}