const web3 = new Web3(Web3.givenProvider);

const admin = [
  "admin_addPeer",
  "admin_datadir",
  "admin_nodeInfo",
  "admin_peers",
  "admin_setSolc",
  "admin_startRPC",
  "admin_stopRPC",
  "admin_startWS",
  "admin_stopWS",
  "rpc_modules"
];

const debug = [
  "debug_backtraceAt",
  "debug_blockProfile",
  "debug_cpuProfile",
  "debug_dumpBlock",
  "debug_gcStats",
  "debug_getBlockRlp",
  "debug_goTrace",
  "debug_memStats",
  "debug_seedHash",
  "debug_setHead",
  "debug_setBlockProfileRate",
  "debug_stacks",
  "debug_startCPUProfile",
  "debug_startGoTrace",
  "debug_stopCPUProfile",
  "debug_stopGoTrace",
  "debug_traceBlock",
  "debug_traceBlockByNumber",
  "debug_traceBlockByHash",
  "debug_traceBlockFromFile",
  "debug_traceTransaction",
  "debug_verbosity",
  "debug_vmodule",
  "debug_writeBlockProfile",
  "debug_writeMemProfile"
];

const miner = [
  "miner_setExtra",
  "miner_setGasPrice",
  "miner_start",
  "miner_stop",
  "miner_setEtherBase"
];

const personal = [
  "personal_importRawKey",
  "personal_listAccounts",
  "personal_lockAccount",
  "personal_newAccount",
  "personal_unlockAccount",
  "personal_sendTransaction",
  "personal_sign",
  "personal_ecRecover"
];

const txpool = ["txpool_content", "txpool_inspect", "txpool_status"];

const eth = [
  "web3_clientVersion",
  "web3_sha3",
  "net_version",
  "net_listening",
  "net_peerCount",
  "eth_protocolVersion",
  "eth_syncing",
  "eth_coinbase",
  "eth_mining",
  "eth_hashrate",
  "eth_gasPrice",
  "eth_accounts",
  "eth_blockNumber",
  "eth_getBalance",
  "eth_getStorageAt",
  "eth_getTransactionCount",
  "eth_getBlockTransactionCountByHash",
  "eth_getBlockTransactionCountByNumber",
  "eth_getUncleCountByBlockHash",
  "eth_getUncleCountByBlockNumber",
  "eth_getCode",
  "eth_sign",
  "eth_sendTransaction",
  "eth_sendRawTransaction",
  "eth_call",
  "eth_estimateGas",
  "eth_getBlockByHash",
  "eth_getBlockByNumber",
  "eth_getTransactionByHash",
  "eth_getTransactionByBlockHashAndIndex",
  "eth_getTransactionByBlockNumberAndIndex",
  "eth_getUncleByBlockNumberAndIndex",
  "eth_newFilter",
  "eth_newBlockFilter",
  "eth_newPendingTransactionFilter",
  "eth_uninstallFilter",
  "eth_getFilterChanges",
  "eth_getFilterLogs",
  "eth_getLogs",
  "eth_getWork",
  "eth_submitWork",
  "eth_submitHashrate",
  "db_putString",
  "db_getString",
  "db_putHex",
  "db_getHex",
  "shh_version",
  "shh_post",
  "shh_newIdentity",
  "shh_hasIdentity",
  "shh_newGroup",
  "shh_addToGroup",
  "shh_newFilter",
  "shh_uninstallFilter",
  "shh_getFilterChanges",
  "shh_getMessages"
];

function getEl(el) {
  return document.getElementById(el);
}
function createElement(el) {
  return document.createElement(el);
}
let xxx;
let a;
let nodeIPandPort = JSON.parse(localStorage.getItem("connect_remember_node"));
function http(data) {
  console.log(data);
  let con = new XMLHttpRequest();
  con.open("POST", data.url);
  con.setRequestHeader("Content-Type", "application/json");
  con.send(
    JSON.stringify({ method: data.method, params: data.params, id: 67 })
  );
  con.onload = () => {
    let res = JSON.parse(con.responseText);
    console.log(res);

    console.log(data);
    if (data.method === "miner_setEtherbase") {
      getEl("Network_coinbase").innerText = data.params[0];
    }

    if (data.method === "miner_start" && res.error) {
      if (res.error.code == "-32000") {
        let btn_add_acc_cont = document.getElementsByClassName(
          "btn_add_acc_cont"
        )[0].innerHTML;
        getEl("modal-title-text").innerHTML =
          "<h4 class='youDontHaveAcc'>You don't have a reward account!</h4>";
        getEl("modal-body-text").innerHTML =
          "<p>" +
          res.error.message +
          "<p>Please go to <span id='accMan_page_click'>accounts manager</span> page and create an account to start mining!</p>";
        document.getElementById("accMan_page_click").onclick = () => {
          document.getElementById("Accounts").click();
        };
        $("#modal_connection_window").modal({
          keyboard: true
        });
      } else {
        getEl("modal-title-text").innerText = res.error.code;
        getEl("modal-body-text").innerText = res.error.message + "different";
        $("#modal_connection_window").modal({
          keyboard: true
        });
      }
    }
    if (data.method === "miner_stop" && res.result === null) {
      if (localStorage) {
        localStorage.setItem("miningScheduled", "stop");
      }
      /* document.getElementById("stopMiningbtnDash").innerText =
        "Scheduled to stop";*/
      /*  getEl("stopMiningbtnDash").innerText = "Scheduled to stop";*/

      console.log("miner_stop");
      if (localStorage.getItem("miningScheduled") !== "true") {
        getEl("btnMINERstopICONText").innerText = "Mining will stop shortly!";
      }

      document.getElementsByClassName("btnMINERstopICON")[0].innerHTML =
        '<i class="material-icons">error_outline</i>';
    }
    if (data.method === "miner_start" && res.result === null) {
      if (localStorage.getItem("miningScheduled") !== "true") {
        localStorage.setItem("miningScheduled", "true");
        getEl("miningpopBTNOK").onclick = () => {
          document.getElementById("miningPOPUPID").style.display = "none";
        };
        getEl("miningPOPUPHeader").innerText = "Mining is Scheduled!";
        getEl("miningPOPUPHeaderUnder").innerText =
          "Blockchain not fully synced!";
        getEl("miningPOPUPHeaderP").innerText =
          "Mining will start automatically after some blockchain synchronized. Note that mining for real ether only makes sense if you are in sync with the network (since you mine on top of the consensus block). Therefore the eth blockchain downloader/synchroniser will delay mining until syncing is complete, and after that mining automatically starts unless you cancel your intention with mining stop button.";
        getEl("miningPOPUPID").style.display = "flex";
      } else {
      }

      if (
        getEl("btnMINERstartText").innerText.toLowerCase() !==
        "cancel scheduled mining"
      ) {
        document.getElementById("btnMINERstartText").innerText =
          "Mining Scheduled";
        /* document.getElementById("stopMiningbtnDash").innerText =
          "Mining Scheduled!";*/
        /* document.getElementById("stopMiningbtnDash").style.display = "block";*/
      }
      if (
        getEl("btnMINERstartText").innerText.toLowerCase() == "mining scheduled"
      ) {
        getEl("btnMINERstartICON").innerHTML =
          '<i class="material-icons">schedule</i>';
      }

      console.log("miner_start", res);
    }
  };
}
//List account in account--Lock,Unlock,SendTX
function listAccounts(data, url) {
  let list_account_cont = getEl("list_account_cont");
  list_account_cont.innerHTML = "";
  let dataCollection = [];
  data.forEach((element, index) => {
    var cat = index;
    let li = document.createElement("li");
    li.innerHTML =
      '<span class="li_adr_index">' +
      ++index +
      "</span>" +
      '</span><span class="li_addr" id="li_addr' +
      index +
      '" >' +
      element +
      "</span>" +
      "<span class='class_QR_id' data-id=" +
      element +
      "><img src='style/qr-code.svg' alt='qr' title='qr'><span class='setFontRequest'>Request</span></span>" +
      '<div class="accountManipulation"><button id="' +
      element +
      '">Lock</button><button id="unlock' +
      index +
      '" data-id=' +
      element +
      '>UnLock</button><button id="send' +
      index +
      '" data-id=' +
      element +
      ">Send</button></div>" +
      "<div class='bal_cont_acc_page'>" +
      "<span class='ETH_PRICE_TEXT'>ETH</span>" +
      '<span id="balance' +
      index +
      '" class="balanceClassAddress" data-id=' +
      element +
      "></span></div></div>";
    list_account_cont.appendChild(li);

    getEl(element).addEventListener("click", lockAcc);
    getEl("unlock" + index).addEventListener("click", unclokAcc);

    let class_QR_id = document.getElementsByClassName("class_QR_id");
    //popup

    for (let i = 0; i < class_QR_id.length; i++) {
      class_QR_id[i].addEventListener("click", qr_code);
    }

    let balElement = getEl("balance" + index);
    dataCollection.push(balElement);
  });
  let address = "";
  if (dataCollection.length <= 10) {
    dataCollection.forEach(element => {
      console.log(element);
      address += element.getAttribute("data-id") + ",";
    });

    etherScanReq(address);
  } else {
    let arrayAddres = [];
    let l = dataCollection;
    l.forEach(element => {
      arrayAddres.push(element.getAttribute("data-id"));
    });

    var i,
      j,
      chunk = 20;
    let arrayOBJ = { temparray: [] };
    for (i = 0, j = arrayAddres.length; i < j; i += chunk) {
      if (arrayOBJ["temparray"].length < 20) {
        arrayOBJ["temparray"] = arrayAddres.slice(i, i + chunk);
      } else if (arrayOBJ["temparray"].length >= 20) {
        arrayOBJ["temparray" + i] = arrayAddres.slice(i, i + chunk);
      }
    }
    Object.entries(arrayOBJ).forEach(([key, value]) => {
      let s1 = value.toString();
      etherScanReq(s1);
      console.log(s1);
    });
  }

  function etherScanReq(address) {
    console.log(address);
    let req = new XMLHttpRequest();
    let oneTimeReq = new XMLHttpRequest();
    let localStore = JSON.parse(localStorage.getItem("connect_remember_node"));

    oneTimeReq.open(
      "POST",
      localStore.protocol + "://" + localStore.ip + ":" + localStore.port
    );
    oneTimeReq.setRequestHeader("Content-Type", "application/json");
    oneTimeReq.send(
      JSON.stringify({ method: "net_version", params: [], id: 67 })
    );

    oneTimeReq.onload = () => {
      let res = JSON.parse(oneTimeReq.responseText);
      if (res.result === "3") {
        req.open(
          "GET",
          "https://api-ropsten.etherscan.io/api?module=account&action=balancemulti&address=" +
            address +
            "&tag=latest&apikey=8V94SEHP2T27NQGVS3P825YAZCHYYPDU9M"
        );
        req.send();
      }
      if (res.result === "1") {
        req.open(
          "GET",
          "https://api.etherscan.io/api?module=account&action=balancemulti&address=" +
            address +
            "&tag=latest&apikey=8V94SEHP2T27NQGVS3P825YAZCHYYPDU9M"
        );
        req.send();
      }
    };

    req.onload = () => {
      let bbb = [];
      let ers = JSON.parse(req.responseText);
      console.log(ers);
      let dataBal = document.querySelectorAll(".balanceClassAddress");
      for (let y = 0; y < dataBal.length; y++) {
        let temp = dataBal[y].getAttribute("data-id");

        for (let i = 0; i < ers.result.length; i++) {
          if (temp === ers.result[i].account) {
            dataBal[y].innerHTML = deleteAfterPeriod({
              one: web3.fromWei(ers.result[i].balance, "ether"),
              value: 8
            });

            bbb.push(Number(ers.result[i].balance));
          }
        }
      }
      let totalBalance = getById("account_tot_bal");
      let eth_accounts_total_bal = document.getElementById("account_tot_bal");
      console.log("beforeError", eth_accounts_total_bal);
      let allBal = document.getElementsByClassName("balanceClassAddress");
      let temp = 0;
      for (let i = 0; i < allBal.length; i++) {
        temp += Number(allBal[i].innerText);
      }
      console.log("beforeError", eth_accounts_total_bal);
      eth_accounts_total_bal.innerText = temp;
      totalBalance.innerText = deleteAfterPeriod({ one: temp, value: 6 });
      console.log(temp);
      var sum = bbb.reduce((a, b) => a + b, 0);
      console.log(sum);
    };
  }
  function lockAcc() {
    AjaxMenu("post", url, "personal_lockAccount", event.currentTarget.id);

    console.log(event.currentTarget.id);
  }
  function unclokAcc() {
    let el = event.currentTarget.getAttribute("data-id");

    http({
      url: url,
      params: [el, "1234", 600],
      method: "personal_unlockAccount"
    });
  }
}

//Connectin String from LocalStorage

//admin_addPeer

function admin_addPeer(method, url) {
  let el = getEl("idPeerbtn");
  let el_value = getEl("idPeerinput");

  el.onclick = () => {
    console.log(url, el_value.value);
    AjaxMenu(method, url, "admin_addPeer", el_value.value);
  };
}

function admin_datadir() {
  AjaxMenu("POST", conString, "admin_datadir", "");
}

function admin_nodeInfo() {
  AjaxMenu("POST", conString, "admin_nodeInfo", "");
}
function admin_peers() {
  AjaxMenu("POST", conString, "admin_peers", "");
}
function admin_startWS(method, url) {
  AjaxMenu(method, url, "admin_startWS", "");
}
function admin_stopWS(method, url) {
  AjaxMenu(method, url, "admin_stopWS", "");
}

function AjaxMenu(method, url, data, params) {
  let con = new XMLHttpRequest();
  con.open(method, url);
  con.setRequestHeader("Content-Type", "application/json");
  try {
    con.send(
      JSON.stringify({ jsonrpc: "2.0", method: data, params: [params], id: 67 })
    );
  } catch (error) {
    getEl("modal-title-text").innerText = "Connection Error!!!";
    getEl("modal-body-text").innerText =
      "Please check your Node running status.";
    $("#modal_connection_window").modal({
      keyboard: true
    });
  }
  con.onerror = () => {
    console.log("Connection Error");
    getEl("modal-title-text").innerText = "Connection Error!!!";
    getEl("modal-body-text").innerText =
      "Please check your Node running status.";
    $("#modal_connection_window").modal({
      keyboard: true
    });
    location.reload();
  };

  return (con.onload = () => {
    let result = JSON.parse(con.responseText);

    switch (data) {
      case "admin_datadir": {
        console.log("AjaxMenu: ", result);
        getEl("admin_datadir").innerText = result.result;
        break;
      }
      case "admin_addPeer": {
        console.log("AjaxMenu: ", result);
        if (result.result === true) {
          getEl("modal-title-text").innerText = "Success";
          getEl("modal-body-text").innerText =
            "Added a new remote node to the list of tracked static nodes." +
            "The node will try to maintain connectivity to these nodes at all times, reconnecting every once in a while if the remote connection goes down.";
          $("#modal_connection_window").modal({
            keyboard: true
          });
        }
        if (result.error) {
          getEl("modal-title-text").innerText = "Error: " + result.error.code;
          getEl("modal-body-text").innerText = result.error.message;
          $("#modal_connection_window").modal({
            keyboard: true
          });
        }

        break;
      }
      case "admin_nodeInfo": {
        let arId = [
          "admin_nodeInfo_li_enode",
          "admin_nodeInfo_li_id",
          "admin_nodeInfo_li_ip",
          "admin_nodeInfo_li_listenAddr",
          "admin_nodeInfo_li_name"
        ];
        arId.forEach(value => {
          let el = getEl(value);

          switch (el.id) {
            case "admin_nodeInfo_li_enode": {
              el.innerText = result.result.enode;
              break;
            }
            case "admin_nodeInfo_li_id": {
              el.innerText = result.result.id;
              break;
            }
            case "admin_nodeInfo_li_ip": {
              el.innerText = result.result.ip;
              break;
            }
            case "admin_nodeInfo_li_listenAddr": {
              el.innerText = result.result.listenAddr;
              break;
            }
            case "admin_nodeInfo_li_name": {
              el.innerText = result.result.name;
              break;
            }
          }
        });

        break;
      }
      case "admin_startWS": {
        console.log(result);
        break;
      }
      case "admin_stopWS": {
        console.log(result);

        break;
      }
      case "eth_syncing": {
        console.log("eth_syncing", result.result);

        try {
          let number =
            parseInt(result.result.currentBlock) -
            parseInt(result.result.highestBlock);
          getEl("remain_block_Block").innerText = number.toLocaleString();

          let blockPercent =
            (parseInt(result.result.currentBlock) /
              parseInt(result.result.highestBlock)) *
            100;

          getEl("remain_block_Block_pers").innerText =
            Math.floor(blockPercent) + "%";
          getEl("progressBarId").style.width = Math.floor(blockPercent) + "%";
console.log(Math.floor(blockPercent) + "%")
          Object.entries(result.result).forEach(([key, value]) => {
            let arId = [
              "currentBlock",
              "highestBlock",
              "startingBlock",
              "knownStates",
              "pulledStates"
            ];
            for (let x = 0; x < arId.length; x++) {
              let el = getEl(arId[x]);
              if (el.id === key) {
                el.innerText = parseInt(value).toLocaleString();
              }
            }
          });
        } catch (erore) {
          console.log(erore);
        }
        break;
      }
      case "net_peerCount": {
        getEl("Network_peer_length").innerText = parseInt(result.result);

        console.log(result);
        break;
      }
      case "net_version": {
        console.log("net_version", result.result);
        switch (result.result) {
          case "1": {
            getEl("Network_types").innerText = "Mainnet";
            break;
          }
          case "2": {
            getEl("Network_types").innerText = "Morden Testnet";
            break;
          }
          case "3": {
            getEl("Network_types").innerText = "Ropsten Testnet";
            break;
          }
          case "4": {
            getEl("Network_types").innerText = "Rinkeby Testnet";
            break;
          }
          case "8": {
            getEl("Network_types").innerText = "Ubiq";
            break;
          }
          case "42": {
            getEl("Network_types").innerText = "Kovan Testnet";
            break;
          }
          case "77": {
            getEl("Network_types").innerText = "Sokol Testnet";
            break;
          }
          case "99": {
            getEl("Network_types").innerText = "Core";
            break;
          }
          default: {
            getEl("Network_types").innerText = result.result;
          }
        }

        console.log(result);
        break;
      }
      case "net_listening": {
        switch (result.result) {
          case true: {
            getEl("Network_listening").innerText = "Yes";
            break;
          }
          case false: {
            getEl("Network_listening").innerText = "No";
            break;
          }
        }

        break;
      }
      case "eth_protocolVersion": {
        getEl("Network_clinet_version").innerText = parseInt(result.result);
        break;
      }
      case "eth_coinbase": {
        getEl("Network_coinbase").innerText = result.result;
        break;
      }
      case "eth_mining": {
        console.log("mining", result.result);

        if (result.result) {
          localStorage.setItem("bgcolor", "red");
          getEl("btnMINERstartICON").innerHTML =
            '<i class="material-icons">access_time</i>';
          getEl("eth_mining").innerText = "Mining Scheduled";
        } else {
          getEl("eth_mining").innerText = "Not Mining";
        }

        break;
      }
      case "eth_hashrate": {
        getEl("eth_hashrate").innerText = parseInt(result.result);

        if (parseInt(result.result) > 1) {
          getEl("eth_mining").style.color = "#a7ff40";
          getEl("eth_mining").innerText = "Mining Active";
        } else if (parseInt(result.result) == 0) {
          getEl("eth_mining").style.color = "red";
          getEl("eth_mining").innerText = "Not Mining";
          let miningScheduled = localStorage.getItem("miningScheduled");
          if (miningScheduled == "true") {
            if (
              getEl("btnMINERstartText").innerText.toLowerCase() !==
              "cancel scheduled mining"
            ) {
              getEl("btnMINERstartText").innerText = "Mining Scheduled";
            }
          } else if (miningScheduled !== "true") {
            getEl("btnMINERstartICON").innerHTML =
              '<i class="material-icons">power_settings_new</i>';
            getEl("btnMINERstartText").innerText = "Start Mining";
          }
        }

        let ppp = parseInt(result.result);
        console.log("eth_hashrate", ppp);

        break;
      }
      case "eth_gasPrice": {
        let weiGasPrice = parseInt(result.result);

        getEl("eth_gasPrice").innerText = web3.fromWei(
          parseInt(result.result),
          "ether"
        );
        toWeiConverter(weiGasPrice);

        break;
      }
      case "eth_accounts": {
        listAccounts(result.result, url);

        /* getEl("eth_accounts").innerText = result.result.length;*/
        break;
      }
      case "eth_blockNumber": {
        /*  getEl('eth_blockNumber').innerText = parseInt(result.result);*/
        break;
      }
      case "personal_listAccounts": {
        getEl("account_number_col1").innerText = result.result.length;
        console.log("listAccounts", result.result, url);
        listAccounts(result.result, url);

        break;
      }
      case "personal_newAccount": {
        console.log("personal_newAccount", result.result);
        if (result.result.startsWith("0x")) {
          ["encryptNewAcccount", "encryptNewAcccount2"].forEach(element => {
            getEl(element).value = "";
          });

          document.getElementsByClassName("NewaccAnimetion")[0].style.display =
            "none";

          AjaxMenu("POST", url, "personal_listAccounts", "");
        } else {
          document.getElementsByClassName("NewaccAnimetion")[0].style.display =
            "none";
        }
        break;
      }
      case "personal_lockAccount": {
        console.log("personal_lockAccount", result);
        break;
      }
      case "personal_unlockAccount": {
        console.log("personal_unlockAccount", result);
        break;
      }
      case "rpc_modules": {
        let Apis = [
          "admin",
          "db",
          "debug",
          "eth",
          "miner",
          "net",
          "personal",
          "shh",
          "txpool",
          "web3"
        ];
        let array = [];
        console.log(result.result);
        Object.entries(result.result).forEach(([key, value]) => {
          Apis.forEach(x => {
            if (key === x) {
              getEl("rpc_modules").innerHTML +=
                "<span class='runningApis'>" + key + "</span>";
              array.push(key);
            }
          });
        });
        let missingApis = [];
        Apis.forEach(function(element) {
          let yyy = array.find(function(x) {
            return x === element;
          });
          if (yyy === undefined) {
            getEl("rpc_modules_disabled").innerHTML +=
              "<span class='runningApis disabledPIS'>" + element + "</span>";
            missingApis.push(element);
          }
        });

        break;
      }
      case "miner_setEtherBase": {
        console.log("miner_setEtherBase", result);
        break;
      }

      case "admin_peers": {
        getEl("Network_peer_length").innerText = result.result.length;
        getEl("accordionExample").innerHTML = "";
        //Send Ip to Map function

        console.log("testHowmANy");

        getIp(result.result);
        console.log(result.result);
        let con_peers_lengt = getById("con_peers_lengt");
        con_peers_lengt.innerHTML = result.result.length;
        getEl("Network_peer_length").innerText = result.result.length;
        for (let i = 0; i < result.result.length; i++) {
          let div = createElement("div");
          if (result.result[i].constructor === Object) {
            if (result.result[i])
              Object.entries(result.result[i]).forEach(([x1, x2]) => {
                if (x1 === "name") {
                  let button = createElement("button");
                  div.appendChild(button);
                  button.classList.add("btn");
                  button.classList.add("btn-link");
                  button.setAttribute("data-target", "#collapseOne" + i);
                  button.setAttribute("aria-expanded", "false");
                  button.setAttribute("aria-controls", "collapseOne" + i);
                  let numberic = i;
                  numberic++;
                  button.innerHTML =
                    "<span class='numberic'>" +
                    numberic +
                    "</span>" +
                    "<span class='btn_name'>" +
                    x2 +
                    "</span>";
                  button.type = "button";
                  button.setAttribute("data-toggle", "collapse");
                } else if (x2.constructor === String) {
                }
              });
          }

          let accordionExample = getEl("accordionExample");

          let div1 = createElement("div");
          let div2 = createElement("div");

          let div3 = createElement("div");
          let span = createElement("span");
          let span1 = createElement("span");
          let span2 = createElement("span");
          let span3 = createElement("span");
          let span4 = createElement("span");
          let span5 = createElement("span");
          let span6 = createElement("span");
          let span7 = createElement("span");
          let span8 = createElement("span");
          let span9 = createElement("span");
          let span10 = createElement("span");
          let span11 = createElement("span");
          let span12 = createElement("span");

          div3.setAttribute("class", "list-group_div");
          span1.classList.add("list-group_div_span1");
          span2.classList.add("list-group_div_span1");
          span3.classList.add("list-group_div_span1");
          span4.classList.add("list-group_div_span1");
          span5.classList.add("list-group_div_span1");
          span6.classList.add("list-group_div_span1");
          span7.classList.add("list-group_div_span1");
          span8.classList.add("list-group_div_span1");
          span9.classList.add("list-group_div_span1");
          span10.classList.add("list-group_div_span1");
          span11.classList.add("list-group_div_span1");
          span12.classList.add("list-group_div_span1");

          span1.innerHTML =
            "<span class='con_node_ppers'>Enode: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].enode +
            "</span>";
          span2.innerHTML =
            "<span class='con_node_ppers'>id: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].id +
            "</span>";
          span3.innerHTML =
            "<span class='con_node_ppers'>localAddress: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].network.localAddress +
            "</span>";
          span4.innerHTML =
            "<span class='con_node_ppers'>remoteAddress: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].network.remoteAddress +
            "</span>";
          span5.innerHTML =
            "<span class='con_node_ppers'>caps: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].caps +
            "</span>";
          span6.innerHTML =
            "<span class='con_node_ppers'>inbound: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].network.inbound +
            "</span>";
          span7.innerHTML =
            "<span class='con_node_ppers'>network static: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].network.static +
            "</span>";
          span8.innerHTML =
            "<span class='con_node_ppers'>network trusted: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].network.trusted +
            "</span>";
          span9.innerHTML =
            "<span class='con_node_ppers'>inbound: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].network.inbound +
            "</span>";
          span10.innerHTML =
            "<span class='con_node_ppers'>difficulty: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].protocols.eth.difficulty +
            "</span>";
          span11.innerHTML =
            "<span class='con_node_ppers'>head: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].protocols.eth.head +
            "</span>";
          span12.innerHTML =
            "<span class='con_node_ppers'>version: </span>" +
            "<span class='con_node_ppers_value'>" +
            result.result[i].protocols.eth.version +
            "</span>";

          span.setAttribute("class", "list-group-item_span");
          div3.appendChild(span);
          div3.appendChild(span1);
          div3.appendChild(span2);
          div3.appendChild(span3);
          div3.appendChild(span4);
          div3.appendChild(span5);
          div3.appendChild(span6);
          div3.appendChild(span7);
          div3.appendChild(span8);
          div3.appendChild(span9);
          div3.appendChild(span10);
          div3.appendChild(span11);
          div3.appendChild(span12);

          div2.appendChild(div3);
          div.classList.add("card");

          div1.setAttribute("id", "collapseOne" + i);
          div1.setAttribute("class", "collapse");

          div1.setAttribute("aria-labelledby", "headingOne");
          div1.setAttribute("data-parent", "#accordionExample");
          div2.setAttribute("class", "card-body");
          accordionExample.appendChild(div);

          div.appendChild(div1);
          div1.appendChild(div2);
        }

        break;
      }
    }
  });
}

function qr_code() {
  let div_receive_pop = document.getElementsByClassName("div_receive_pop")[0];
  console.log("eventxxxxxxxxxxxxxx");

  getEl("qr_code_ammount_receive_usd").value = "";
  getEl("qr_code_ammount_receive_eth").value = "";
  let cont_main_id = getById("cont_main_id");
  let qr_data_id = event.currentTarget.getAttribute("data-id");
  let eth_addr_qr_pop = getEl("eth_addr_qr_pop");
  eth_addr_qr_pop.innerText = qr_data_id;
  let qr_code_popup = getEl("qr_code_popup");
  qr_code_popup.innerHTML = "";
  let img = document.createElement("img");

  qr_code_popup.appendChild(img);

  img.setAttribute(
    "src",
    "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=ethereum:" +
      qr_data_id
  );
  img.id = "linkToqrcode";
  div_receive_pop.style.display = "block";

  let close_qr_pop = getEl("close_qr_pop");

  close_qr_pop.onclick = function() {
    getEl("getEmailIn").value = "";
    div_receive_pop.style.display = "none";
    console.log("dsdsa");
    getEl("mailSentWindow").style.display = "none";
  };
  getEl("print_qr").onclick = () => {
    let getEmailIn = getEl("getEmailIn");

    let ifEmail = checkIfEmailInString(getEmailIn.value);
    function checkIfEmailInString(text) {
      var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      return re.test(text);
    }
    if (ifEmail) {
      let OBJToSEND = {};
      let value1 = getEl("qr_code_ammount_receive_usd").value;
      let value2 = getEl("qr_code_ammount_receive_eth").value;
      let img = getEl("linkToqrcode").src;
      let ethAddr = getEl("eth_addr_qr_pop").innerText;

      let sendGrid = new XMLHttpRequest();

      sendGrid.open(
        "POST",
        "http://cryptobit-env.7hiybanifg.eu-central-1.elasticbeanstalk.com/sendMail"
      );

      sendGrid.send(
        JSON.stringify({
          value1: value1,
          value2: value2,
          img: img,
          eth: ethAddr,
          email: getEmailIn.value
        })
      );

      sendGrid.onload = () => {
        console.log("sendGrid.onload", sendGrid.responseText);
      };

      getEl("mailSentWindow").style.display = "block";
      getEl("cls_success_whoop").onclick = () => {
        getEl("mailSentWindow").style.display = "none";
      };
    }
  };

  let con = new XMLHttpRequest();
  con.open("GET", "https://api.coingecko.com/api/v3/exchange_rates");
  con.send();
  con.onload = () => {
    let res = JSON.parse(con.responseText);
    let inputONE = getEl("qr_code_ammount_receive_usd");
    let inputTWO = getEl("qr_code_ammount_receive_eth");
    let eth_price = Number(res.rates.usd.value / res.rates.eth.value);

    inputONE.onkeyup = () => {
      if (event.currentTarget.value !== "") {
        console.log(event.currentTarget.value);
        let vUSD = Number(event.currentTarget.value);
        let toETH = vUSD / eth_price;
        getEl("qr_code_ammount_receive_eth").value = deleteAfterPeriod({
          one: toETH,
          value: 6
        });
      }
      if (event.currentTarget.value == "") {
        getEl("qr_code_ammount_receive_eth").value = "";
      }
    };
    inputTWO.onkeyup = () => {
      if (event.currentTarget.value !== "") {
        console.log(event.currentTarget.value);
        let vETH = Number(event.currentTarget.value);
        let toUSD = vETH * eth_price;

        getEl("qr_code_ammount_receive_usd").value = deleteAfterPeriod({
          one: toUSD,
          value: 3
        });
        console.log(vETH);
      }
      if (event.currentTarget.value == "") {
        getEl("qr_code_ammount_receive_usd").value = "";
      }
    };
    getEl("sendByEmail").onclick = () => {
      window.print();
    };

    console.log(eth_price);
  };
}
function deleteAfterPeriod(data) {
  let index = data.one.toString().indexOf(".");
  let slice = data.one.toString().slice(0, index + data.value);
  return slice;
}
ImportRawKey();
function ImportRawKey() {
  let personal_importRawKey_btn = getEl("personal_importRawKey_btn");

  personal_importRawKey_btn.onclick = () => {
    let personal_importRawKey_input = getEl("personal_importRawKey_input");
    let personal_importRawKey_input_encrypt = getEl(
      "personal_importRawKey_input_encrypt"
    );
    let personal_importRawKey_input_encrypt2 = getEl(
      "personal_importRawKey_input_encrypt2"
    );

    let i1 = personal_importRawKey_input.value.trim();
    let i2 = personal_importRawKey_input_encrypt.value.trim();
    let i3 = personal_importRawKey_input_encrypt2.value.trim();

    console.log(" personal_importRawKey_input", i1.length);
    if (i1.length < 1) {
      $("#personal_importRawKey_input").popover({
        container: "body",
        trigger: "manual"
      });
      console.log("personal_importRawKey_input", i1.length);
      $("#personal_importRawKey_input").popover({
        container: "body",
        trigger: "manual"
      });
      $("#personal_importRawKey_input").popover("show");
    }
    if (i2.length >= 6) {
      if (i2 !== i3) {
        $("#personal_importRawKey_input_encrypt2").popover({
          container: "body",
          trigger: "manual"
        });
        $("#personal_importRawKey_input_encrypt2").popover("show");
      }
    }
    if (i1.length > 1) {
      if (i2.length < 6) {
        $("#personal_importRawKey_input_encrypt").popover({
          container: "body",
          trigger: "manual"
        });
        $("#personal_importRawKey_input_encrypt").popover("show");
      }
    }

    [
      "personal_importRawKey_input",
      "personal_importRawKey_input_encrypt",
      "personal_importRawKey_input_encrypt2"
    ].forEach(element => {
      getEl(element).onfocus = () => {
        hidePOPOVER();
      };
    });

    function hidePOPOVER() {
      $("#personal_importRawKey_input").popover("hide");
      $("#personal_importRawKey_input_encrypt").popover("hide");
      $("#personal_importRawKey_input_encrypt2").popover("hide");
    }

    let test = i1.startsWith("0x");

    if (i1.length > 1 && i2 === i3 && i2.length > 5) {
      addAll(i1, test);
    }

    function addAll(element, test) {
      document.getElementsByClassName("importKeyANimation")[0].style.display =
        "flex";
      let localStore = JSON.parse(
        localStorage.getItem("connect_remember_node")
      );
      if (test) {
        let it_removeStart = element.replace("0x", "");
        RunCon(it_removeStart);
      } else {
        RunCon(element);
      }

      function RunCon(data) {
        console.log(element, i2);
        let con = new XMLHttpRequest();
        let localStore = JSON.parse(
          localStorage.getItem("connect_remember_node")
        );

        con.open(
          "POST",
          localStore.protocol + "://" + localStore.ip + ":" + localStore.port
        );
        con.setRequestHeader("Content-Type", "application/json");
        con.send(
          JSON.stringify({
            method: "personal_importRawKey",
            params: [data, i2],
            id: 67
          })
        );

        con.onload = () => {
          let res = JSON.parse(con.responseText);
          if (res.error) {
            console.log("Already Exist", res);
            let modal_connection_window = getEl("modal_connection_window");
            getEl("modal-title-text").innerText = "Error:" + res.error.code;
            getEl("modal-body-text").innerText = res.error.message;
            $("#modal_connection_window").modal({
              keyboard: true
            });
          }

          document.getElementsByClassName(
            "importKeyANimation"
          )[0].style.display = "none";

          SendAjax({ method: "personal_listAccounts", params: "" });
        };
      }
    }
  };
}
function addAccount() {}

function SendAjax(obj) {
  console.log(obj);
  let localStore = JSON.parse(localStorage.getItem("connect_remember_node"));
  let con = new XMLHttpRequest();
  con.open(
    "POST",
    localStore.protocol + "://" + localStore.ip + ":" + localStore.port
  );
  con.setRequestHeader("content-type", "application/json");
  con.send(
    JSON.stringify({ method: obj.method, params: [obj.params], id: 67 })
  );
  con.onload = () => {
    let res = JSON.parse(con.responseText);
    listAccounts(res.result);
    console.log("response", res);
  };
}

startWS();
function startWS() {
  let localStore = JSON.parse(localStorage.getItem("connect_remember_node"));
  let ws_input_host = getEl("ws_input_host");
  let ws_input_port = getEl("ws_input_port");
  let ws_input_cors = getEl("ws_input_cors");
  let ws_btn_start_stop = getEl("ws_btn_start_stop");
  ws_btn_start_stop.onclick = () => {
    let ws = new XMLHttpRequest();
    ws.open(
      "POST",
      localStore.protocol + "://" + localStore.ip + ":" + localStore.port
    );
    ws.setRequestHeader("Content-Type", "application/json");
    ws.send(
      JSON.stringify({
        method: "admin_startWS",
        params: [
          ws_input_host.value,
          Number(ws_input_port.value),
          ws_input_cors.value,
          "personal"
        ],
        id: 67
      })
    );
    ws.onload = () => {
      console.log("ws", ws.responseText);
    };
  };
}

dataToChart();
function dataToChart() {
  console.log("ChartMain");
  var bar_ctx = document.getElementById("lineChartPinkOrange").getContext("2d");

  var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
  purple_orange_gradient.addColorStop(0, "#00f260");
  purple_orange_gradient.addColorStop(0.3, "#00f260");
  purple_orange_gradient.addColorStop(0.7, "#0575e6");
  purple_orange_gradient.addColorStop(1, "#0575e6");

  var bar_chart = new Chart(bar_ctx, {
    type: "line",

    data: {
      labels: ["0", "1", "2", "3", "4", "5"],

      datasets: [
        {
          label: "# Hash Rate",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: purple_orange_gradient,
          hoverBackgroundColor: purple_orange_gradient,
          hoverBorderWidth: 2,
          hoverBorderColor: "purple"
        }
      ]
    },
    options: {
      responsive: false,
      legend: {
        display: true,
        position: "top",
        labels: {
          // This more specific font property overrides the global property
          fontColor: "White",
          fontSize: 12
        }
      },
      scales: {
        yAxes: [
          {
            display: true,
            position: "left",
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 22
            }
          }
        ]
      }
    }
  });

  document.getElementById("mSTART").onclick = () => {
    console.log(event.currentTarget);

    let CPUNumber = getEl("numOfCoresID").value;
    console.log(CPUNumber);
    let objMod = getURLOBJ();
    objMod.params = [Number(CPUNumber)];

    let decideHTTPmethod =
      getEl("btnMINERstartText").innerText.toLowerCase() ===
      "cancel scheduled mining";
    if (decideHTTPmethod) {
      objMod.method = "miner_stop";
      let miningPOPUPID = getEl("miningPOPUPID");
      miningPOPUPID.style.display = "flex";
      getEl("miningPOPUPHeader").innerText = "Mining Canceled!";
      getEl("miningPOPUPHeaderUnder").innerText = "";
      getEl("miningPOPUPHeaderP").innerText = "Mining won't start.";
    } else {
      objMod.method = "miner_start";
    }

    objMod.chart = bar_chart;
    console.log(objMod);
    http(objMod);

    let remain_block_Block_pers = getEl("remain_block_Block_pers").innerText;

    let str = remain_block_Block_pers.slice(0, -1);

    getEl("miningpopBTNOK").onclick = () => {
      console.log("sad");
      if (getEl("miningPOPUPID").style.display != "none") {
        getEl("miningPOPUPID").style.display = "none";
      }
    };
  };

  //ADD REMOVE INTERVAL

  setInterval(() => {
    let eth_hashrate = document.getElementById("eth_hashrate").innerText;
    let minHashRateTExtID = document.getElementById("minHashRateTExtID");
    let hashNumber = Number(eth_hashrate);
    if (hashNumber > 1) {
      minHashRateTExtID.innerText = "ON";
      minHashRateTExtID.style.backgroundColor = "green";
      document.getElementById("min_hash_rate1").innerText = hashNumber;
      addData(hashNumber, hashNumber, bar_chart);

      document.getElementById("mSTART").style.display = "none";
      document.getElementById("mSTOP").style.display = "flex";
    } else if (hashNumber == 0) {
      minHashRateTExtID.innerText = "OFF";
      minHashRateTExtID.style.backgroundColor = "red";
      document.getElementById("min_hash_rate1").innerText = hashNumber;
      document.getElementById("mSTART").style.display = "flex";
      document.getElementById("mSTOP").style.display = "none";
    }

    /*  function RND() {
              let rnd = Math.random();
  
              let rnf = Math.round((rnd * 999 + 1));
              return rnf;
          }*/

    if (bar_chart.data.labels.length > 30) {
      removeData(bar_chart);
    }
  }, 1000);
}
//ADD REMOVE DATA
function addData(label, data, bar_chart) {
  bar_chart.data.labels.push(label);
  bar_chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });
  bar_chart.update();
}

function removeData(bar_chart) {
  bar_chart.data.labels.shift();
  bar_chart.data.datasets.forEach(dataset => {
    dataset.data.shift();
  });
  bar_chart.update();
}

getEl("Mining").onclick = () => {
  coinbaseAccList();
};

function getNumberCores() {
  let CPUNumber = navigator.hardwareConcurrency;

  let selectCPU = document.getElementsByClassName("selectCores")[0];
  selectCPU.innerHTML = "";

  for (let i = 0; i < CPUNumber; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("value", "CPU" + i);
    opt.innerText = "CPU " + (1 + i);
    opt.setAttribute("name", "cpuCore");

    selectCPU.appendChild(opt);
  }
}

function coinbaseAccList() {
  let setINT = setInterval(() => {
    let li_addr = document.getElementsByClassName("li_addr");

    if (li_addr.length >= 1) {
      clearInterval(setINT);
      populateRewarACCount(li_addr);
    }
  }, 500);

  function populateRewarACCount(li_addr) {
    let coinbaseCurrentAcc = document.getElementById("Network_coinbase");

    let selectrewardAcc = document.getElementsByClassName("selectrewardAcc")[0];

    selectrewardAcc.innerHTML = "";
    if (coinbaseCurrentAcc.innerText != "undefined") {
      appendMiningReward(coinbaseCurrentAcc);
    }

    for (let y = 0; y < li_addr.length; y++) {
      if (li_addr[y].innerText !== coinbaseCurrentAcc.innerText) {
        appendMiningReward(li_addr[y]);
      }
    }
    function appendMiningReward(dat) {
      let opt = document.createElement("option");
      opt.setAttribute("value", dat.innerText);
      opt.innerText = dat.innerText;
      opt.setAttribute("name", "RewardAddress");

      selectrewardAcc.appendChild(opt);
    }

    document.getElementById("RewardAddressID").onchange = () => {
      console.log("RewardAddressID", event.target.value);

      let nodeIPandPort = JSON.parse(
        localStorage.getItem("connect_remember_node")
      );

      let url =
        nodeIPandPort.protocol +
        "://" +
        nodeIPandPort.ip +
        ":" +
        nodeIPandPort.port;
      console.log(url);
      http({
        url: url,
        port: nodeIPandPort.port,
        nodeIPandPort: nodeIPandPort.protocol,
        method: "miner_setEtherbase",
        params: [event.target.value]
      });
    };
  }
}

document.getElementById("mSTOP").onclick = () => {
  let objMod = getURLOBJ();
  objMod.params = [""];
  objMod.method = "miner_stop";
  console.log(objMod);
  http(objMod);
};

function getURLOBJ() {
  let nodeIPandPort = JSON.parse(localStorage.getItem("connect_remember_node"));

  let url =
    nodeIPandPort.protocol +
    "://" +
    nodeIPandPort.ip +
    ":" +
    nodeIPandPort.port;

  let obj = {
    url: url,
    port: nodeIPandPort.port,
    nodeIPandPort: nodeIPandPort.protocol,
    method: "",
    params: []
  };
  return obj;
}

function toWeiConverter(wei) {
  const converter = [
    "To_wei_conv",
    "To_ether_conv",
    "To_gwei_conv",
    "To_micro_conv"
  ];
  //Converter
  converter.forEach(el => {
    let element = getEl(el);
    element.addEventListener("click", () => {
      let ct = event.currentTarget.id;

      switch (ct) {
        case "To_wei_conv": {
          getEl("eth_gasPrice").innerText = (() => {
            return web3.fromWei(wei, "wei");
          })();
          break;
        }
        case "To_ether_conv": {
          getEl("eth_gasPrice").innerText = (() => {
            return web3.fromWei(wei, "ether");
          })();
          break;
        }
        case "To_gwei_conv": {
          getEl("eth_gasPrice").innerText = (() => {
            return web3.fromWei(wei, "gwei");
          })();
          break;
        }
        case "To_micro_conv": {
          getEl("eth_gasPrice").innerText = (() => {
            return web3.fromWei(wei, "micro");
          })();
          break;
        }
      }
    });
  });
}
/*
(function() {
  let obersever = new MutationObserver(mutation => {
    if (mutation[0].target.data.toLowerCase() === "mining active") {
      document.getElementById("stopMiningbtnDash").style.display = "block";
      if (localStorage.getItem("miningScheduled") == "stop") {
        document.getElementById("stopMiningbtnDash").innerText =
          "Scheduled to stop";
      } else {
        document.getElementById("stopMiningbtnDash").innerText = "Stop Mining";
      }
    } else if (mutation[0].target.data.toLowerCase() === "mining scheduled!") {
      document.getElementById("stopMiningbtnDash").style.display = "block";
      document.getElementById("stopMiningbtnDash").innerText =
        "Remove schedule";
    } else if (localStorage.getItem("miningScheduled") === "true") {
      document.getElementById("stopMiningbtnDash").style.display = "block";
    }
  });

  document.getElementById("stopMiningbtnDash").onclick = () => {

    localStorage.getItem('miningScheduled') == 'stop'
    console.log("stopmining");
    let objMod = getURLOBJ();
    objMod.params = [""];
    objMod.method = "miner_stop";
    console.log(objMod);
    http(objMod);
  }; 
  obersever.observe(document.getElementById("eth_mining"), {
    characterData: true,
    subtree: true
  });
})();
*/
(function() {
  let btnMINERstartText = document
    .getElementById("btnMINERstartText")
    .innerText.toLowerCase();

  if (localStorage.getItem("miningScheduled") == "stop") {
    document.getElementsByClassName("btnMINERstopICON")[0].innerHTML =
      '<i class="material-icons">error_outline</i>';
    document.getElementById("btnMINERstopICONText").innerText =
      "Mining will stop shortly!";
  }

  getEl("mSTART").onmouseenter = x => {
    let btnMINERstartText = document.getElementById("btnMINERstartText");
    if (btnMINERstartText.innerText.toLowerCase() === "mining scheduled") {
      btnMINERstartText.innerText = "Cancel Scheduled Mining";
      getEl("btnMINERstartICON").innerHTML =
        '<i class="material-icons">cancel</i>';
    }
  };
  getEl("mSTART").onmouseleave = () => {
    let btnMINERstartText = document.getElementById("btnMINERstartText");

    if (btnMINERstartText.innerText.toLowerCase() !== "start mining") {
      getEl("btnMINERstartICON").innerHTML =
        '<i class="material-icons">schedule</i>';
      getEl("btnMINERstartText").innerText = "Mining Scheduled";
    }
  };
})();

(() => {
  let miningScheduled = localStorage.getItem("miningScheduled");

  if (miningScheduled === "true") {
    let objMod = getURLOBJ();
    let CPUNumber = getEl("numOfCoresID").value;
    objMod.params = [Number(CPUNumber)];
    objMod.method = "miner_start";
    console.log(objMod);
    http(objMod);

    setTimeout(() => {
      console.log("mining again");
      http(objMod);
    }, 15000);
  }
})();

/* (function() {
  let stopMiningbtnDashHover = document.getElementById("stopMiningbtnDash");
  stopMiningbtnDashHover.onmouseenter = () => {
    if (stopMiningbtnDashHover.innerText.toLowerCase() === "mining scheduled!")
      stopMiningbtnDashHover.innerText = "Cancel Schedule";
  };
  stopMiningbtnDashHover.onmouseleave = () => {
    if (stopMiningbtnDashHover.innerText.toLowerCase() === "cancel schedule")
      stopMiningbtnDashHover.innerText = "Mining Scheduled!";
  };
})();
 */
document.getElementById("tsetBTNN").onclick = () => {
  let objMod = getURLOBJ();
  let CPUNumber = getEl("numOfCoresID").value;

  objMod.method = "eth_mining";

  http(objMod);
};
document.getElementById("tsetBTNN2").onclick = () => {
  let objMod = getURLOBJ();
  let CPUNumber = getEl("numOfCoresID").value;

  objMod.method = "miner_start";

  http(objMod);
};

(() => {
  let btnMINERstopICONText = document.getElementById("btnMINERstopICONText");
  btnMINERstopICONText.onmouseenter = () => {
    if (
      btnMINERstopICONText.innerText.toLowerCase() ==
      "Mining will stop shortly!"
    ) {
      console.log("Mining will stop shortly!");
    }
  };
})();
