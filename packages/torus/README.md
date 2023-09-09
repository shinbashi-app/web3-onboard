# @shinbashi/torus

## Wallet module for connecting Torus wallet to web3-onboard

### Install

`npm i @shinbashi/torus`

## Options

See the [Torus Docs](https://docs.tor.us/wallet/api-reference/class) for the extensive list of options

## Usage

```typescript
import Onboard from '@shinbashi/core'
import torusModule from '@shinbashi/torus'

const torus = torusModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    torus
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
