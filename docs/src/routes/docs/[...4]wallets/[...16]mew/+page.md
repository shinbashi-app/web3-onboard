---
title: Mew
---

# {$frontmatter.title}

:::admonition type=warning
_Wallet module for connecting Mew to web3-onboard is now deprecated. Please use [@shinbashi/mew-wallet](../../wallets/mewwallet.md)_
:::

Wallet module for connecting Mew wallet to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/mew
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/mew
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@shinbashi/core'
import mewModule from '@shinbashi/mew'

const mew = mewModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    mew
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

:::admonition type=warning
Currently not building on M1 Macs
:::
