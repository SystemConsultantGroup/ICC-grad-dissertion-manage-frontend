export default async function getTime() {
  const response = await fetch("/api/time");
  const responseText = await response.text();
  const serverTime = JSON.parse(responseText);
  return serverTime.time;
}
