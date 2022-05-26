import { useRouter } from "next/router";

export default function Edit() {
  const { lid } = useRouter().query;
  return <div>edit listing {lid}</div>;
}
