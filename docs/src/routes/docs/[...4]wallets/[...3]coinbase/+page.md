---
title: Coinbase
---

# {$frontmatter.title}

Wallet module for connecting Coinbase Wallet SDK to web3-onboard. Check out the [Coinbase Wallet Developer Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs) for more information.

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/coinbase
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/coinbase
```

  </TabPanel>
</Tabs>

## Options

```typescript
type CoinbaseWalletOptions = {
  darkMode: boolean // default = false
}
```

## Usage

```typescript
import Onboard from '@shinbashi/core'
import coinbaseWalletModule from '@shinbashi/coinbase'

// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

// can also initialize with no options...
// const coinbaseWalletSdk = coinbaseWalletSdk()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    coinbaseWalletSdk
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
