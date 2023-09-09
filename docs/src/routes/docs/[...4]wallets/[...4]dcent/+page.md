---
title: Dcent
---

# {$frontmatter.title}

## Wallet module for connecting D'CENT hardware wallets to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/dcent
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/dcent
```

  </TabPanel>
</Tabs>

### Usage

```typescript
import Onboard from '@shinbashi/core'
import dcentModule from '@shinbashi/dcent'

const dcent = dcentModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    dcent
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
