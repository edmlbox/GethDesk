
# GethDesk
**GethDesk** - is a web based application to simplify work with Ethereum [Geth Go](https://github.com/ethereum/go-ethereum/wiki/geth) console client.

**GethDesk** - makes easier to show you data about your [Geth Go](https://github.com/ethereum/go-ethereum/wiki/geth) node current 
condition, without using inconvenient console commands.

### Dashboard page
* Blockchain current synchronization progress.
* Enabled and Disabled **"APIS"**.
* To which network your node connected. (**Main** or **Testnet** and name of 
   the network.);
* **"Open"** or **"Not"** your node to network connections.
* Number of peers connected to your node. (Default maximum is 25, if not 
   specified else.);
* Current Ethereum protocol version.
* Node mining status **"Yes"** or **"Not"**, if yes than you get the hashrate speed. 
* Current price per gas in ether. (Other units available also).
* Mining default reward address. (You can change it).

![GitHub Logo](/readmeIMG/dashboard.jpg)


### Accounts Manager page:
* Number of accounts your node owns.
* Accounts addresses with current balance in ether.
* Create new password protected accounts.
* Import private keys and encrypt them with password.

![GitHub Logo](/readmeIMG/accounts.jpg)

## You can send a payment request to any email address or print it as pdf.
![GitHub Logo](/readmeIMG/paymentRequest.jpg)

### Mining page:
* Start CPU mining with the required number of cores.
   
#### Keep in mind. Important!

1. On Main network mining won't start until your blockchain is fully synchronized! Mining will be scheduled to start automatically when blockchain fully synchronized.

2. On Test network mining can start without blockchain being fully synchronized, it will start and stop during blockchain synchronization.

* Mining hashrate speed.
* Visualized mining chart.
* Choose a default mining reward address.

![GitHub Logo](/readmeIMG/mining.png)

### Node Info page:
* Your running node all information **[Default Database Directory**, **Node name**, **Node 
  Id**, **Node Ip**, **Listen Addr**, **Enode**.]

* Detailed information about each peer connected to your node including: [**Node name**, **Enode**, **Id**, 
  **LocalAddress**, **RemoteAddress**, **Caps**, **Network Static**, **Network Trusted**, 
  **Inbound**, **Difficulty**, **Head**, **Version**.]
  
![GitHub Logo](/readmeIMG/nodeInfo.jpg)

### World map of connected peers.

![GitHub Logo](/readmeIMG/mapofNodes.jpg)

### Connection
To connect to Geth Go through GethDesk you need to run Geth Go with the following parameters:
geth -rpc -rpcaddr 
0.0.0.0 -rpccorsdomain '*' -rpcapi admin,personal,net,web3,miner,eth

![GitHub Logo](/readmeIMG/connection.jpg)
