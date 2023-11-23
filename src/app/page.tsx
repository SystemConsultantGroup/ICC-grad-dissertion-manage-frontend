export default async function HomePage() {
  const data = await (await fetch("https://example.com/")).json();
  return (
    <>
      <h1>App Router 사용하기!</h1>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
