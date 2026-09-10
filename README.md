# Painel NOC

Aplicação desktop desenvolvida com **Electron**, utilizando **Node.js + Express** no backend e **MySQL** como banco de dados.

## Pré-requisitos

Antes de iniciar a instalação, certifique-se de que a máquina possui:

* Node.js instalado
* NPM instalado
* Acesso ao servidor MySQL utilizado pela aplicação
* Windows, Linux ou outro sistema operacional compatível com Electron

Para verificar se o Node.js e o NPM estão instalados:

```bash
node --version
npm --version
```

Caso os comandos retornem as versões instaladas, o ambiente está pronto para continuar.

---

## 1. Obter o projeto

Copie ou clone o projeto **painelnoc** para a máquina onde será executado.

Depois, acesse a pasta do projeto:

```bash
cd painelnoc
```

A pasta deve conter o arquivo:

```text
package.json
```

Esse arquivo contém as dependências e os comandos necessários para executar a aplicação.

---

## 2. Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

O NPM utilizará o `package.json` para instalar automaticamente as dependências necessárias.

### Dependências principais

A aplicação utiliza:

```text
express
cors
mysql2
```

Também são utilizadas as seguintes dependências de desenvolvimento:

```text
electron
concurrently
```

Após a instalação será criada a pasta:

```text
node_modules
```

Não é necessário instalar cada pacote manualmente.

---

## 3. Estrutura de execução

O projeto possui dois componentes principais:

### Backend

O servidor Node.js é iniciado através do arquivo:

```text
server/server.js
```

O comando utilizado é:

```bash
npm run server
```

Esse comando executa:

```bash
node server/server.js
```

### Aplicação Electron

A interface desktop é iniciada com:

```bash
npm run electron
```

Esse comando executa:

```bash
electron .
```

O arquivo principal configurado no projeto é:

```text
main.js
```

---

## 4. Iniciar a aplicação

Para iniciar todo o sistema normalmente, execute:

```bash
npm start
```

Esse é o método recomendado.

O comando inicia simultaneamente:

1. Servidor Node.js / Express
2. Aplicação Electron

Internamente, o projeto utiliza:

```bash
concurrently "npm run server" "npm run electron"
```

Portanto, não é necessário abrir dois terminais manualmente.

---

## 5. Configuração do MySQL

A aplicação utiliza o pacote:

```text
mysql2
```

Antes de iniciar o sistema, confirme se as configurações de conexão com o banco estão corretas.

Normalmente deverão ser verificados:

```text
Host
Porta
Banco de dados
Usuário
Senha
```

Também confirme se a máquina onde o **Painel NOC** será executado possui acesso de rede ao servidor MySQL.

Caso o banco esteja em outro servidor, é possível testar a conectividade com a porta padrão do MySQL:

### PowerShell

```powershell
Test-NetConnection IP_DO_SERVIDOR -Port 3306
```

Se estiver utilizando outra porta, substitua `3306` pela porta configurada no ambiente.

---

## 6. Testar separadamente

Caso a aplicação não inicialize corretamente através de:

```bash
npm start
```

execute os componentes separadamente para facilitar o diagnóstico.

### Terminal 1

```bash
npm run server
```

### Terminal 2

```bash
npm run electron
```

Dessa forma é possível identificar se o problema está no backend ou na inicialização do Electron.

---

## 7. Comandos disponíveis

| Comando            | Função                                    |
| ------------------ | ----------------------------------------- |
| `npm install`      | Instala todas as dependências             |
| `npm run server`   | Inicia o backend Node.js/Express          |
| `npm run electron` | Inicia a aplicação Electron               |
| `npm start`        | Inicia backend e Electron simultaneamente |

---

## 8. Solução de problemas

### `npm` não reconhecido

Caso apareça:

```text
'npm' não é reconhecido como um comando interno ou externo
```

verifique se o Node.js está instalado e se foi adicionado ao `PATH` do sistema.

Teste:

```bash
node --version
npm --version
```

---

### Dependências ausentes

Caso apareçam erros como:

```text
Cannot find module 'express'
Cannot find module 'mysql2'
Cannot find module 'electron'
```

execute novamente:

```bash
npm install
```

---

### Reinstalação das dependências

Caso existam problemas na pasta `node_modules`, remova as dependências e reinstale.

No Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

Se existir um `package-lock.json` válido, também pode ser utilizado:

```bash
npm ci
```

O `npm ci` é especialmente indicado para instalações padronizadas, pois utiliza exatamente as versões registradas no `package-lock.json`.

---

### Erro de conexão com MySQL

Verifique:

* IP ou hostname do servidor
* Porta do MySQL
* Usuário
* Senha
* Nome do banco
* Firewall
* Permissões do usuário MySQL
* Acesso de rede entre a máquina e o servidor

Teste a porta:

```powershell
Test-NetConnection IP_DO_SERVIDOR -Port 3306
```

---

## 9. Instalação rápida

Em uma máquina que já possui Node.js instalado, o processo básico é:

```bash
cd painelnoc
npm install
npm start
```

Ou, caso exista `package-lock.json`:

```bash
cd painelnoc
npm ci
npm start
```

---

## Informações do projeto

**Nome:** Painel NOC
**Versão:** 1.0.0
**Arquivo principal:** `main.js`

### Tecnologias

* Electron
* Node.js
* Express
* MySQL / mysql2
* CORS
* Concurrently

### Versões definidas no projeto

```text
Electron: ^43.0.0
Concurrently: ^9.0.0
Express: ^5.2.1
MySQL2: ^3.22.5
CORS: ^2.8.6
```
