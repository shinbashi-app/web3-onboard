---
title: Tally Ho
---

# {$frontmatter.title}

:::admonition type=warning
_Wallet module for connecting TallyHo to web3-onboard is now deprecated. Please use [@shinbashi/taho](../../wallets/taho.md)_
:::

## Wallet module for connecting TallyHo

See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/core @shinbashi/tallyho
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/core @shinbashi/tallyho
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@shinbashi/core'
import tallyWalletModule from '@shinbashi/tallyho'

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    tallyWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
