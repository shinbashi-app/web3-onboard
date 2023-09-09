---
title: Mew Wallet
---

# {$frontmatter.title}

Wallet module for connecting Mew wallet through web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/mew-wallet
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/mew-wallet
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@shinbashi/core'
import mewWallet from '@shinbashi/mew-wallet'

const mewWalletModule = mewWallet()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    mewWalletModule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
