import React from "react";

export default function AdSpace(props) {
  return <div>List of Adspaces </div>;
}

async function getServerSideProps(context) {
  return {
    props: {},
  };
}
