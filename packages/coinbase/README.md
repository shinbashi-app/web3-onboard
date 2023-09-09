# @shinbashi/coinbase

## Wallet module for connecting Coinbase Wallet SDK to web3-onboard

See [Coinbase Wallet Developer Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Install

`npm i @shinbashi/coinbase`

## Options

```typescript
type CoinbaseWalletOptions = {
  darkMode: boolean // default = false
}
```

## Usage

```typescript
import Onboard from '@shinbashi/core'
import coinbaseWalletModule from '@shinbashi/coinbase'

// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

// can also initialize with no options...
// const coinbaseWalletSdk = coinbaseWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    coinbaseWalletSdk
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
