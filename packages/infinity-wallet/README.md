# @shinbashi/infinity-wallet

## Wallet module for connecting Infinity Wallet through web3-onboard

Infinity Wallet SDK wallet module for connecting to Web3-Onboard. Web3-Onboard makes it simple to connect Ethereum hardware and software wallets to your dapp. Features standardized spec compliant web3 providers for all supported wallets, framework agnostic modern javascript UI with code splitting, CSS customization, multi-chain and multi-account support, reactive wallet state subscriptions and real-time transaction state change notifications.

Checkout the official [Infinity Wallet page](https://infinitywallet.io/) for details.

### Install

**NPM**
`npm i @shinbashi/core @shinbashi/infinity-wallet`

**Yarn**
`yarn add @shinbashi/core @shinbashi/infinity-wallet`

## Usage

```typescript
import Onboard from '@shinbashi/core'
import infinityWalletModule from '@shinbashi/infinity-wallet'

const infinityWallet = infinityWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    infinityWallet
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
