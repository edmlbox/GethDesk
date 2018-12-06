# GethDesk

**GethDesk** - is a web based application to simplify work with Ethereum [Geth Go](https://github.com/ethereum/go-ethereum/wiki/geth) console client.

**GethDesk** makes easier to show you data about your [Geth Go](https://github.com/ethereum/go-ethereum/wiki/geth) node current 
condition, without using inconvenient console commands.

### Dashboard page
1. Blockchain current synchronization progress.
2. Enabled and Disabled **"APIS"**.
3. To which network your node connected. (**Main** or **Testnet** and name of 
   the network.);
4. **"Open"** or **"Not"** your node to network connections.
5. Number of peers connected to your node. (Default maximum is 25, if not 
   specified else.);
6. Current Ethereum protocol version.
7. Node mining status **"Yes"** or **"Not"**, if yes than you get the hashrate speed. 
8. Current price per gas in ether. (Other units available also).
9. Mining default reward address. (You can change it).

![GitHub Logo](/readmeIMG/dashboard.jpg)


### Accounts Manager page:
1. Number of accounts your node owns.
2. Accounts addresses with current balance in ether.
3. Create new password protected accounts.
4. Import private keys and encrypt them with password.

![GitHub Logo](/readmeIMG/accounts.jpg)

## You can send a payment request to any email address or print it as pdf.
![GitHub Logo](/readmeIMG/paymentRequest.jpg)

### Mining page:
1. Start CPU mining with the required number of cores.
   
#### Keep in mind. Important!

On Main network mining won't start until your blockchain is fully synchronized! Mining will be scheduled to start automatically when blockchain fully synchronized.

On Test network mining can start without blockchain being fully synchronized, it will start and stop during blockchain synchronization.
 
1. CPU mining status.
2. Mining hashrate speed.
3. Visualized mining chart.
4. Choose a default mining reward address.

![GitHub Logo](/readmeIMG/mining.png)

### Node Info page:
1.Your running node all information **[Default Database Directory**, **Node name**, **Node 
  Id**, **Node Ip**, **Listen Addr**, **Enode**.[

2.Detailed information about each peer connected to your includind: [**Node name**, **Enode**, **Id**, 
  **LocalAddress**, **RemoteAddress**, **Caps**, **Network Static**, **Network Trusted**, 
  **Inbound**, **Difficulty**, **Head**, **Version**.]
  
![GitHub Logo](/readmeIMG/nodeInfo.jpg)

### World map of connected peers.

![GitHub Logo](/readmeIMG/mapofNodes.jpg)
