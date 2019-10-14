# ejected-ui
A bare-bones create-react-app that has been ejected:

[toc]

# History
I wanted to see the [create-react-app](https://create-react-app.dev/docs/getting-started) architecture and how they [configured webpack](#config/webpack.config.js) to bundle the app for production.


## How I Did This

I created new app called `ejected-ui` using [create-react-app](https://create-react-app.dev/docs/getting-started):
```bash
npx create-react-app ejected-ui
```

CD into the new `ejected-ui` directory:
```bash
cd ejected-ui
```

Started the app on [localhost:8080](http://localhost:8080):
```bash
yarn start
```

Ejected the app:
```bash
yarn eject
```

## Ejected Directory Structure
I used `tree` to show directory structure (excluding node_modules)

```bash
brew install tree
```

```bash
tree -I node_modules
```

A bare-bones create-react app directory structure:
```bash
├── README.md
├── config
│   ├── env.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── jsconfig.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
├── yarn-error.log
└── yarn.lock
```

## Configuration
Of special note is how they setup [webpack.config.js](config/webpack.config.js).

# Getting Started
Create React App is an officially supported way to create single-page React applications. This shows how they setup up the configuration, and what's going behind the scenes. :)

## Quick Start

Clone git repo:
```bash
git clone https://github.com/flavioespinoza/ejected-ui.git
```

CD into the new `ejected-ui` directory:
```bash
cd ejected-ui
```

Install dependencies:
```bash
yarn install
```

Started the app on [localhost:8080](http://localhost:8080):
```bash
yarn start
```
