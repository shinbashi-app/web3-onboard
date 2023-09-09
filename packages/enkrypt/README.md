# @shinbashi/enkrypt

## Wallet module for connecting Enkrypt wallet through web3-onboard

### Install

**NPM**
`npm i @shinbashi/core @shinbashi/enkrypt`

**Yarn**
`yarn add @shinbashi/core @shinbashi/enkrypt`

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
