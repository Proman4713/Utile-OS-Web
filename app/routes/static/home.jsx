export function meta({}) {
  return [
    { title: "Home — Utile OS" }
  ];
}

export function loader({ context }) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }) {
  return <h1>h</h1>;
}
