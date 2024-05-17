export async function getDirection(eloc1, eloc2) {
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/map/direction?source=${eloc1}&destination=${eloc2}`;
  const result = await fetch(_url, {});
  return result.json();
}
