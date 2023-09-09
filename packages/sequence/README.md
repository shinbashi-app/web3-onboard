# @shinbashi/sequence

## Wallet module for connecting Sequence wallet to web3-onboard

### Install

`npm i @shinbashi/sequence 0xsequence ethers`  
or  
`yarn add @shinbashi/sequence 0xsequence ethers`

## Options

```typescript
type SequenceOptions {
  appName?: string
  network?: number | string
}
```

## Usage

```typescript
import Onboard from '@shinbashi/core'
import sequenceModule from '@shinbashi/sequence'

const sequence = sequenceModule({
  appName: 'My app'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    sequence
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
