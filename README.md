


# GethDesk [![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store%3A-1.0%20beta-brightgreen.svg)](https://chrome.google.com/webstore/detail/ethereum-gethdesk/ldbikceofpgkjbmoijglmnaphdcfmklp?hl=uk) [![Plugin on redmine.org](https://img.shields.io/redmine/plugin/stars/redmine_xlsx_format_issue_exporter.svg)](https://chrome.google.com/webstore/detail/ethereum-gethdesk/ldbikceofpgkjbmoijglmnaphdcfmklp?hl=uk)





**GethDesk** — is an open source application to simplify work with Ethereum Geth Go console client and shows you data about your Geth Go node current condition, without using inconvenient console commands.
#### Install this app as [chrome extension](https://chrome.google.com/webstore/detail/ethereum-gethdesk/ldbikceofpgkjbmoijglmnaphdcfmklp?hl=uk) or go directly to <a href='http://cryptobit-env.7hiybanifg.eu-central-1.elasticbeanstalk.com/gethdesk/index.html'>GethDesk</a> url. 


## Core functionalities
### Dashboard
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


## Accounts Manager
* Number of accounts your node owns.
* Accounts addresses with current balance in ether.
* Create new password protected accounts.
* Import private keys and encrypt them with password.

![GitHub Logo](/readmeIMG/accounts.jpg)

## You can send a payment request to any email address or print it as pdf.
![GitHub Logo](/readmeIMG/paymentRequest.jpg)

## Mining
* Start CPU mining with the required number of cores.
   
#### Keep in mind. Important!

1. On Main network mining won't start until your blockchain is fully synchronized! Mining will be scheduled to start automatically when blockchain fully synchronized.

2. On Test network mining can start without blockchain being fully synchronized, it will start and stop during blockchain synchronization.

* Mining hashrate speed.
* Visualized mining chart.
* Choose a default mining reward address.

![GitHub Logo](/readmeIMG/mining.png)

## Node Info
* Your running node all information **[Default Database Directory**, **Node name**, **Node 
  Id**, **Node Ip**, **Listen Addr**, **Enode**.]

* Detailed information about each peer connected to your node including: [**Node name**, **Enode**, **Id**, 
  **LocalAddress**, **RemoteAddress**, **Caps**, **Network Static**, **Network Trusted**, 
  **Inbound**, **Difficulty**, **Head**, **Version**.]
  
![GitHub Logo](/readmeIMG/nodeInfo.jpg)

## World map of connected peers.

![GitHub Logo](/readmeIMG/mapofNodes.jpg)

## How to use <a href='http://cryptobit-env.7hiybanifg.eu-central-1.elasticbeanstalk.com/gethdesk/index.html'>GethDesk</a>
To connect to **Geth Go** through **<a href='http://cryptobit-env.7hiybanifg.eu-central-1.elasticbeanstalk.com/gethdesk/index.html'>GethDesk</a>** you need to run **Geth Go** with the following parameters:
#### `geth -rpc -rpcaddr 0.0.0.0 -rpccorsdomain '*' -rpcapi admin,personal,net,web3,miner,eth`

You can customize **Geth Go** running options as you want, **but make sure that You 
run Geth Go application with required apis enabled: -rpcapi 
admin,personal,net,web3,miner,eth** to get
**<a href='http://cryptobit-env.7hiybanifg.eu-central-1.elasticbeanstalk.com/gethdesk/index.html'>GethDesk</a>** working correctly as it depends on them to gather information. 

If you forget to put **-rpcapi admin,personal,net,web3,miner,eth** while running 
**Geth Go** it will run with default apis therefore **<a href='http://cryptobit-env.7hiybanifg.eu-central-1.elasticbeanstalk.com/gethdesk/index.html'>GethDesk</a>** wont't work 
correctly.

![GitHub Logo](/readmeIMG/connection.jpg)
