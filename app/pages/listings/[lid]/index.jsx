import { useRouter } from "next/router";

export default function Listing() {
  const { lid } = useRouter().query;
  return <div>Listing {lid}</div>;
}

async function getServerSideProps(context) {
  return {
    props: {},
  };
}
