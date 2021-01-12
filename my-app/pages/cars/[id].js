import { useRouter } from "next/router";

import Head from "next/head";

export default function Car({ car }) {
  const router = useRouter();
  const { id } = router.query; // get route query, .e.g. 1234 in /cars/1234

  return (
    <>
      <Head>
        <title>
          {car.color} {car.id}
        </title>
      </Head>
      <h1>Car ID: {id}</h1>
      <p>Color: {car.color}</p>
      <img src={car.image}></img>
    </>
  );
}

// SSR: ("latest")

export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();
  return {
    props: { car: data },
  };
}

// or SSG: ("static")

// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();
//   return {
//     props: { car: data },
//   };
// }

// export async function getStaticPaths() {
//   const req = await fetch(`http://localhost:3000/cars.json`);
//   const data = await req.json();

//   const paths = data.map((car) => {
//     return { params: { id: car } };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }
