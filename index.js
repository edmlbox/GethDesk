const EthereumRpc = require("ethereum-rpc-promise");
var request = require('request');
let eth = new EthereumRpc("http://35.231.148.208:8545");


/*
eth.web3_clientVersion().then(x => {
  console.log(x);
});
eth.eth_protocolVersion().then(x => {
  console.log("eth_protocolVersion:", x);
});
eth.eth_syncing().then(x => {
  console.log("eth_syncing:", x);
});*/

//List of management APIs
//admin_setSolc,admin_startRPC, not-working,
const admin = [
  'admin_addPeer', 'admin_datadir', 'admin_nodeInfo',
  'admin_peers', 'admin_setSolc', 'admin_startRPC', 'admin_stopRPC', 'admin_startWS', 'admin_stopWS'];

const debug = ['debug_backtraceAt', 'debug_blockProfile', 'debug_cpuProfile', 'debug_dumpBlock', 'debug_gcStats',
  'debug_getBlockRlp', 'debug_goTrace', 'debug_memStats', 'debug_seedHash', 'debug_setHead', 'debug_setBlockProfileRate',
  'debug_stacks', 'debug_startCPUProfile', 'debug_startGoTrace', 'debug_stopCPUProfile', 'debug_stopGoTrace',
  'debug_traceBlock', 'debug_traceBlockByNumber', 'debug_traceBlockByHash', 'debug_traceBlockFromFile',
  'debug_traceTransaction', 'debug_verbosity', 'debug_vmodule', 'debug_writeBlockProfile', 'debug_writeMemProfile'];

const miner = ['miner_setExtra', 'miner_setGasPrice', 'miner_start', 'miner_stop', 'miner_setEtherBase'];

const personal = ['personal_importRawKey', 'personal_listAccounts', 'personal_lockAccount', 'personal_newAccount'
  , 'personal_unlockAccount', 'personal_sendTransaction', 'personal_sign', 'personal_ecRecover'];

const txpool = ['txpool_content', 'txpool_inspect', 'txpool_status'];

const info = []



//Sendrequest
function SendReq(method, params) {
  request.post(
    'http://35.231.148.208:8545/',
    { json: { "jsonrpc": "2.0", "method": method, "params": [], "id": 74 } },
    function (error, response, body) {
      console.log('ERROR:', error)


      console.log('--request.post--', body)

    }
  );
}



SendReq(personal[1])