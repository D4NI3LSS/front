const BACKEND_URL = 'http://192.168.1.8:3000';

export async function salvarLocalizacao(dados) {
  const response = await fetch(`${BACKEND_URL}/localizacao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return response.json();
}

export async function buscarHistorico() {
  const response = await fetch(`${BACKEND_URL}/localizacao`);
  return response.json();
}