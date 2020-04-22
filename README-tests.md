<!-- Name -->
<h1 align="center">Zuppester</h1>

<!-- Badges -->
<div align="center">
    Submission of technical evaluation for test engineer candidates for Zup</a><br /><br />

<!-- Imagens de build -->
![Total tests](https://img.shields.io/badge/total%20tests-14-blue)
![Tests type](https://img.shields.io/badge/tests%20types-e2e%20and%20api-blueviolet)
![GitHub](https://img.shields.io/badge/license-MIT-brightgreen)

</div>

## 📍 Getting Started

### ✅ Requirements

[x] **Node** (8 or higher)<br />
[x] **Yarn** (or NPM)<br />
[x] [**Personal access token to GitHub repos**](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

### 🔧 Installation

1. Clone this repo:<br />
``git clone https://github.com/thiagoaag/DittrichLucas_zuppester.git``

2. Install the dependencies:<br />
``yarn or npm``

### 🚧 Setup

Replace the credentials you want in the `branch.feature` and `hooks.js` files (user, password, token, repo and branch)

### 🚀 Usage

- Run `api` test:<br />
``yarn or npm test:api``

- Run `e2e` test:<br />
``yarn or npm test:e2e``

## 📷 Screenshots

![API](https://i.imgur.com/0aff53y.png)

---

![e2e](https://i.imgur.com/PQl2M2o.png)

## 📝 Roadmap

1. Check more points to make the test more comprehensive (such as the committed file banner and the branch where the file will be committed)
1. Migrate tests to TS to make testing safe with respect to types
1. Create a branch for the file commit test to make the test less coupled
1. Organize files better (separate assertions into files like given.js, for example)
1. Add constants as environment variables
1. Add lint for testing

## ⭐ Contributing

1. Make the project fork (<https://github.com/thiagoaag/DittrichLucas_zuppester>)
1. Create a _branch_ for your modification (`git checkout -b feature/fooBar`)
1. Do the _commit_ (`git commit -am '[feature] add some fooBar'`)
1. _Push_ (`git push origin feature/fooBar`)
1. Create a new _Pull Request_
