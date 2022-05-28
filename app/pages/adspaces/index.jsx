import React from "react";

export default function AdSpace(props) {
  return <div>List of Adspaces </div>;
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
