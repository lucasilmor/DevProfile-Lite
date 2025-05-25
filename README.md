# DevProfile Lite

Protótipo de uma aplicação React para exibir perfis de desenvolvedores com autenticação via Firebase.
Usuários podem se cadastrar, fazer login e visualizar seu perfil (pré-cadastrado no Firestore).

---

## 🔧 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/devprofile-lite.git
cd devprofile-lite
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Firebase

No arquivo `src/services/firebase.ts`, substitua pelo seguinte conteúdo com **suas credenciais do Firebase**:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Você encontra esses dados no [console do Firebase](https://console.firebase.google.com).

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Tecnologias e bibliotecas utilizadas

* **React + TypeScript** — base da aplicação
* **Tailwind CSS** — estilização responsiva e moderna
* **Firebase** — autenticação (email/senha) e banco de dados (Firestore)
* **React Router DOM** — rotas protegidas
* **Vercel** — plataforma de deploy 

---
