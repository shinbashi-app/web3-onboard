# @shinbashi/mew

## (Deprecated) Wallet module for connecting WalletLink to web3-onboard

_Use [@shinbashi/mew-wallet](../mew-wallet/README.md)_

## Wallet module for connecting Mew wallet to web3-onboard

### Install

`npm i @shinbashi/mew`

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

_NOTE: Currently not building on M1 Macs_
