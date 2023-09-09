---
title: Fortmatic
---

# {$frontmatter.title}

Wallet module for connecting Fortmatic wallets to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/fortmatic
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/fortmatic
```

  </TabPanel>
</Tabs>

## Options

```typescript
type FortmaticOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@shinbashi/core'
import fortmaticModule from '@shinbashi/fortmatic'

const fortmatic = fortmaticModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    fortmatic
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
