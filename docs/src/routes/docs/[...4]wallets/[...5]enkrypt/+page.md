---
title: Enkrypt
---

# {$frontmatter.title}

Wallet module for connecting Enkrypt wallet through web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/enkrypt
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/enkrypt
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@shinbashi/core'
import enrkypt from '@shinbashi/enkrypt'

const enrkyptModule = enrkypt()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    enrkyptModule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
