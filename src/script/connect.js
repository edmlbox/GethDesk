window.onload = () => {
  let autoLogin = JSON.parse(localStorage.getItem("connect_remember_node"));
  if (autoLogin) {
    console.log(autoLogin);
    getEl("connect_to_node_input_ip").value = autoLogin.ip;
    getEl("connect_to_node_input_port").value = autoLogin.port;

    let connectionString =
      autoLogin.protocol + "://" + autoLogin.ip + ":" + autoLogin.port;
    ajax("post", connectionString, "admin_nodeInfo");
  } else {
    getEl("connect_window").classList.remove("connect_window_hide");
  }
};

function createElement(el) {
  return document.createElement(el);
}
function getEl(el) {
  return document.getElementById(el);
}
function getElByName(el) {
  return document.getElementsByName(el);
}
function HanldeResponse(error) {
  console.log(error.error);
  let modal_connection_window = getEl("modal_connection_window");
  getEl("modal-title-text").innerText = "Error:" + error.error.code;
  getEl("modal-body-text").innerText = error.error.message;
  $("#modal_connection_window").modal({
    keyboard: true
  });
}

function showPopup(data) {
  getEl("modal-title-text").innerText = data.title;
  getEl("modal-body-text").innerText = data.body;
  $("#modal_connection_window").modal({
    keyboard: true
  });
}
function HandleResponse(el, url, connect_remember_node) {
  if (el.error) {
    HanldeResponse(el.error);
    getEl("connect_window").classList.remove("connect_window_hide");
  } else {
    //Fill menu after connect

    getEl("Accounts").onclick = () => {
      AjaxMenu("POST", url, "personal_listAccounts", "");
    };
    //add new account

    let addAccountBTN = getEl("addAccountBTN");

    addAccountBTN.onclick = () => {
      let f1 = getEl("encryptNewAcccount").value.trim();
      let f2 = getEl("encryptNewAcccount2").value.trim();

      if (f1 === f2 && f1.length > 5) {
        console.log("personal_newAccount", f1, f2);
        AjaxMenu("POST", url, "personal_newAccount", f1);

        document.getElementsByClassName("NewaccAnimetion")[0].style.display =
          "flex";
        /*  listAccounts(data, url)*/
      }
      if (f1 !== f2) {
        console.log("not");

        $("#encryptNewAcccount2").popover({
          container: "body",
          trigger: "manual"
        });
        $("#encryptNewAcccount2").popover("show");
      }
      if (f1.length < 6) {
        $("#encryptNewAcccount").popover({
          container: "body",
          trigger: "manual"
        });
        $("#encryptNewAcccount").popover("show");
        $("#encryptNewAcccount2").popover("hide");
      }

      getEl("encryptNewAcccount").onfocus = () => {
        $("#encryptNewAcccount").popover("hide");
        $("#encryptNewAcccount2").popover("hide");
      };
      getEl("encryptNewAcccount2").onfocus = () => {
        $("#encryptNewAcccount2").popover("hide");
        $("#encryptNewAcccount").popover("hide");
      };
    };

    let apiNames = [
      "rpc_modules",
      "admin_nodeInfo",
      "eth_coinbase",

      "admin_datadir",
      "net_version",
      "net_listening",
      "net_peerCount",
      "eth_protocolVersion",
      "eth_mining",
      "eth_gasPrice",
      "eth_accounts",
      "eth_blockNumber",
      "eth_hashrate",
      "admin_peers"
    ];
    apiNames.forEach(element => {
      AjaxMenu("POST", url, element, "");
    });

    admin_addPeer("POST", url);

    (function() {
      AjaxMenu("POST", url, "eth_syncing", "");
      setInterval(() => {
        AjaxMenu("POST", url, "eth_syncing", "");
      }, 6000);
    })();

    setInterval(function() {
      AjaxMenu("POST", url, "eth_hashrate", "");
    }, 3000);

    setInterval(function() {
      AjaxMenu("POST", url, "admin_peers", "");
    }, 25000)[("Node_Info", "Mining", "Accounts", "Dashboard")];

    /* admin_startWS('POST', url)*/

    getEl("Node_info").innerHTML =
      "<span class='jsClassConnected'>Connected to:</span> " +
      "<span class='jsClassConnectedRes'>" +
      el.result.name +
      "</span>";
    getEl("cirlce_status").classList.remove("cirlce_status");
    getEl("connect_window").classList.add("connect_window_hide");
    if (connect_remember_node !== undefined) {
      if (connect_remember_node.connect_remember_node !== false) {
        localStorage.setItem(
          "connect_remember_node",
          JSON.stringify(connect_remember_node)
        );
      }
    }
  }
}

function ajax(method, url, data, connect_remember_node) {
  var con = new XMLHttpRequest();
  try {
    con.onerror = () => {
      try {
        getEl("connect_window").classList.remove("connect_window_hide");
        console.log("onerror", e.target.status);
        showPopup({
          title: "Connection Error",
          body:
            "Please make sure that ip address and port number is correct, and your Node is running with -rpc enabled."
        });
      } catch (error) {
        console.log(error, "onerror");
      }
    };
    con.onabort = () => {
      console.log("onabort");
    };
    con.onload = () => {
      let res = JSON.parse(con.responseText);
      console.log(res);
      HandleResponse(res, url, connect_remember_node);
    };
    con.open(method, url);
    con.setRequestHeader("Content-Type", "application/json");
    try {
      con.send(
        JSON.stringify({ jsonrpc: "2.0", method: data, params: [], id: 74 })
      );
    } catch (error) {
      console.log(error, "at ajax");
    }
  } catch (error) {
    console.log(error);
    showPopup({
      title: "Connection Error",
      body: "Please make sure that ip address and port number is correct."
    });
  }
}

function node_connect() {
  let connect_to_node_btn = getEl("connect_to_node_btn");
  connect_to_node_btn.onclick = () => {
    let connect_to_node_input_ip = getEl(
      "connect_to_node_input_ip"
    ).value.replace(/ /g, "");
    let connect_to_node_input_port = getEl("connect_to_node_input_port").value;
    let connect_protocol_radio = getElByName("connect_protocol_radio");
    let connect_remember_node = getEl("connect_remember_node").checked;

    connect_protocol_radio.forEach(x => {
      if (x.checked === true) {
        let connectionString =
          x.value +
          "://" +
          connect_to_node_input_ip +
          ":" +
          connect_to_node_input_port;
        console.log(connectionString);
        ajax("post", connectionString, "admin_nodeInfo", {
          connect_remember_node: connect_remember_node,
          ip: connect_to_node_input_ip,
          port: connect_to_node_input_port,
          protocol: x.value
        });
      }
    });
  };
}

node_connect();

discconect();
function discconect() {
  let Dissconnect_btn = getEl("Dissconnect_btn");
  Dissconnect_btn.onclick = () => {
    if (localStorage.getItem("connect_remember_node")) {
      localStorage.removeItem("connect_remember_node");
      console.log("diccsonect remove");
      location.reload();
    } else {
      location.reload();
    }
  };
}
