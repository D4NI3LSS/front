const CKAN_URL = 'https://dados.recife.pe.gov.br/api/3/action';

export async function buscarEscolas() {
  const metaResponse = await fetch(
    `${CKAN_URL}/package_show?id=rede-de-educacao-municipal`
  );
  const metaJson = await metaResponse.json();

  const recursos = metaJson.result.resources;
  const geojsonResource = recursos.find(
    (r) => r.format.toUpperCase() === 'GEOJSON'
  );

  if (!geojsonResource) throw new Error('GeoJSON não encontrado.');

  const geoResponse = await fetch(geojsonResource.url);
  const geoJson = await geoResponse.json();

  return geoJson.features.map((feature, index) => {
    const p = feature.properties;

    const coords = feature.geometry?.coordinates?.[0] ?? [];
    const lat = coords.length
      ? coords.reduce((sum, c) => sum + c[1], 0) / coords.length
      : null;
    const lng = coords.length
      ? coords.reduce((sum, c) => sum + c[0], 0) / coords.length
      : null;

    return {
      id: `${p.escola_codigo ?? 'escola'}-${index}`,
      nome: p.escola_nome ?? 'Escola sem nome',
      endereco: p.endereco ?? '',
      bairro: p.escola_tipo === 'Cre' ? 'Creche' : p.escola_tipo === 'Esc' ? 'Escola Municipal' : p.escola_tipo ?? '',
      latitude: lat,
      longitude: lng,
    };
  });
}