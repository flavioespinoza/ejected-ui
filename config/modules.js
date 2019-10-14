'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const chalk = require('react-dev-utils/chalk');
const resolve = require('resolve');

/**
 * Get additional module paths based on the `baseUrl` of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const baseUrl = options.baseUrl;

  /**
   * We need to explicitly check: if (`baseUrl` === `null` or `undefined` && !== a `falsy` value),
   * We do this, because TypeScript treats an empty string as `.`.
   * */
  if (baseUrl == null) {
    /**
     * If there's no baseUrl set we respect `NODE_PATH`.
     *
     * `Important:` Use of `NODE_PATH` is deprecated,
     * and will be removed in the next major release of `create-react-app`.
     *
     * */
    const nodePath = process.env.NODE_PATH || '';
    return nodePath.split(path.delimiter).filter(Boolean);
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  /**
   * We don't need to do anything if `baseUrl` is set to `node_modules`.
   * This is the default behavior.
   * */
  if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
    return null;
  }

  /**
   * Allow the user set the `baseUrl` to `appSrc`.
   * */
  if (path.relative(paths.appSrc, baseUrlResolved) === '') {
    return [paths.appSrc];
  }

  /**
   * If the path is equal to the root directory we ignore it here.
   *
   * We do NOT want to allow importing from the root directly
   * as source files do NOT transpile outside of the `src` directory.
   *
   * We do allow importing with the absolute path, however we set that up with an alias.
   * @example
   *
   * // Valid absolute path:
   * import DiscoBiscuits from 'src/component/DiscoBiscuits'
   *
   * // Valid with baseUrl set:
   * import DiscoBiscuits from 'component/DiscoBiscuits'
   *
   * */
  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return null;
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold(
      `Create React App's ${chalk.yellow.bold(`baseUrl`)} can only be set to ${chalk.yellow.bold(
        `src`,
      )} or ${chalk.yellow.bold(`node_modules`)}. 
       does not support other values at this time.`,
    ),
  );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
  const baseUrl = options.baseUrl;
  if (!baseUrl) {
    return {};
  }
  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);
  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      src: paths.appSrc,
    };
  }
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases(options = {}) {
  const baseUrl = options.baseUrl;
  if (!baseUrl) {
    return {};
  }
  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);
  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      'src/(.*)$': '<rootDir>/src/$1',
    };
  }
}

function getModules() {
  /**
   * Check if TypeScript is setup
   * */
  let config;
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  const hasJsConfig = fs.existsSync(paths.appJsConfig);
  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      `Config files for both TypeScript and JavaScript found:
        1. TypeScript: ${chalk.yellow(`tsconfig.json`)}
        2. JavaScript: ${chalk.yellow(`jsconfig.json`)} 
      Please select the one that best fits your project and remove the other`
    );
  }
  /**
   * If there's a `tsconfig.json` we assume it's a
   * TypeScript project and set up the config
   * based on `tsconfig.json`
   * */
  if (hasTsConfig) {
    const ts = require(resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }));
    config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
    /**
     * Otherwise we check for a `jsconfig.json`
     * */
  } else if (hasJsConfig) {
    config = require(paths.appJsConfig);
  }
  config = config || {};
  const options = config.compilerOptions || {};
  const additionalModulePaths = getAdditionalModulePaths(options);
  return {
    additionalModulePaths: additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

module.exports = getModules();
