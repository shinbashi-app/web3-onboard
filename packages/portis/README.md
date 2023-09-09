# @shinbashi/portis

## Wallet module for connecting Portis wallet to web3-onboard

### Install

`npm i @shinbashi/portis`

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
