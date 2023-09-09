# @shinbashi/mew-wallet

## Wallet module for connecting Mew wallet through web3-onboard

### Install

**NPM**
`npm i @shinbashi/core @shinbashi/mew-wallet`

**Yarn**
`yarn add @shinbashi/core @shinbashi/mew-wallet`

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
