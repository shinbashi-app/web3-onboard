---
title: Taho (previously Tally Ho)
---

# {$frontmatter.title}

## Wallet module for connecting Taho (wallet previously named Tally Ho)

See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/core @shinbashi/taho
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/core @shinbashi/taho
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@shinbashi/core'
import tahoWalletModule from '@shinbashi/taho'

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    tahoWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
