---
title: Portis
---

# {$frontmatter.title}

Wallet module for connecting Portis wallet to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/portis
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/portis
```

  </TabPanel>
</Tabs>

## Options

```typescript
type PortisOptions {
  apiKey: string // required
}
```

## Usage

```typescript
import Onboard from '@shinbashi/core'
import portisModule from '@shinbashi/portis'

const portis = portisModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    portis
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
