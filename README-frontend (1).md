# API Dados Recife — App Mobile

Aplicativo mobile desenvolvido em React Native com Expo que exibe escolas da Rede Municipal do Recife, rastreia a localização do usuário e registra visitas às escolas.

---

## Tecnologias

- React Native + Expo
- React Navigation (Bottom Tabs)
- Expo Location
- API pública: [Portal Dados Abertos do Recife](https://dados.recife.pe.gov.br)

---

## Telas

- **Escolas** — lista as escolas municipais do Recife via API do Dados Recife (GeoJSON)
- **Localização** — obtém a localização do usuário e permite registrar uma escola visitada
- **Histórico** — exibe todos os registros salvos no backend

---

## Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- [Expo Go](https://expo.dev/client) instalado no celular
- Backend rodando na mesma rede Wi-Fi ([repositório do backend](https://github.com/SEU_USUARIO/app-api-backend))

---

## Como instalar

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/app-api.git
cd app-api

# Instale as dependências
npm install --legacy-peer-deps
npx expo install expo-location react-native-screens react-native-safe-area-context
```

---

## Configuração

Abra o arquivo `src/services/backend.js` e substitua o IP pelo IP da máquina onde o backend está rodando:

```javascript
const BACKEND_URL = 'http://SEU_IP:3000';
```

Para descobrir seu IP no Windows:
```bash
ipconfig
# Procure por "Endereço IPv4" na seção do Wi-Fi
```

> Celular e computador precisam estar na mesma rede Wi-Fi.

---

## Como rodar

```bash
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** no celular.

---

## Estrutura do projeto

```
app-api/
├── src/
│   ├── screens/
│   │   ├── EscolasScreen.js       # Lista escolas da API do Recife
│   │   ├── LocalizacaoScreen.js   # Localização do usuário e registro de visita
│   │   └── HistoricoScreen.js     # Histórico de visitas salvas no backend
│   ├── services/
│   │   ├── api.js                 # Chamadas à API do Dados Recife (GeoJSON)
│   │   └── backend.js             # Chamadas ao backend (POST e GET)
│   ├── components/
│   │   └── EscolaCard.js          # Componente reutilizável de card de escola
│   └── styles/
│       └── global.js              # Cores e estilos globais do app
└── App.js                         # Navegação principal (Bottom Tabs)
```

---

## API utilizada

- **Portal:** [Dados Abertos do Recife](https://dados.recife.pe.gov.br)
- **Dataset:** Rede de Educação Municipal
- **Formato:** GeoJSON com localização geográfica de cada escola
- **Endpoint CKAN:** `https://dados.recife.pe.gov.br/api/3/action/package_show?id=rede-de-educacao-municipal`
