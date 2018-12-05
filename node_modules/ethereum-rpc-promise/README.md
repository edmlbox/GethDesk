## ethereum-rpc-promise

[![npm package](https://nodei.co/npm/ethereum-rpc-promise.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ethereum-rpc-promise/)

[![NPM version][npm-image]][npm-url]
[![Dependency Status](https://img.shields.io/david/vialikb/ethereum-rpc-promise.svg?style=flat-square)](https://david-dm.org/vialikb/ethereum-rpc-promise)
[![Known Vulnerabilities](https://snyk.io/test/npm/ethereum-rpc-promise/badge.svg?style=flat-square)](https://snyk.io/test/npm/ethereum-rpc-promise)
[![Downloads][downloads-image]][downloads-url]

[downloads-image]: https://img.shields.io/npm/dm/ethereum-rpc-promise.svg?style=flat-square
[downloads-url]: https://www.npmjs.com/package/ethereum-rpc-promise
[npm-image]: https://img.shields.io/npm/v/ethereum-rpc-promise.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ethereum-rpc-promise

A modern promise based node.js library for communicating with Ethereum daemon.

## Install

```
npm install --save ethereum-rpc-promise
```

## Usage

Start ethereum daemon with rpc support:

```bash
./geth --rpc
```

Connect to daemon endpoint and send rpc commands:

```js
const EthereumRpc = require('ethereum-rpc-promise');

let eth = new EthereumRpc('http://localhost:8545');

// call named wrappers
eth.web3_sha3('0x12345678').then(result) => {
  console.log(result);
});

// or call raw commands
eth.call('web3_sha3', '0x12345678').then(result) => {
  console.log(result);
});

```

## Documentation

[Ethereum Wiki](https://github.com/ethereum/wiki/wiki/JSON-RPC)
