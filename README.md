# interbank-frontend-frame


> Please use Nodejs > 9.x
> Node version 10.14.2 is recommended

Frontend framewor for Interbank R&D Team

### Set mirrors and repository

```bash
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

Switch repository with nrm

```bash
npm install nrm -g
nrm use taobao
```

### Setup development env

Install yarn for faster installation

```bash
npm install yarn -g
```

> Node-sass is a bitch for Windows! Copy this module from others before install deps.

Install dependencies

``` bash
yarn install
```

Start development for web

```bash
npm run dev
```

Start development for electron client

```bash
npm run dev:client
```

### Build and Release

Build for web

```bash
# testing with devtoll
npm run build

# production with gzip
npm run dist
```

Build for electron client

```bash
# testing with devtoll
npm run build:client

# production
npm run dist:client
```

Pack for electron client

```bash
# Unpacked client
npm run client:unpack

# Win32 application
npm run client:win32

# Win32 application
npm run client:win64
```

#  Unit Testing

TBD

---