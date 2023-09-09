# @shinbashi/venly

## Wallet module for connecting Venly SDK to web3-onboard

See [Venly SDK Docs](https://docs.venly.io/widget/) for complete documentation of Venly usage

### Install

`npm install @shinbashi/venly`

## Options

```typescript
type VenlyOptions = {
  clientId: string
  environment?: string
}
```

`clientId` - The Client ID used to connect with Venly. More information can be found [here](https://docs.venly.io/widget/deep-dive/authentication#client-id).
`environment` - The environment to which you want to connect, possible values are 'staging' and 'production'. Defaults to 'production'.

**NOTE**: Production environment handles main networks while Staging handles test networks. List of supported networks can be found [here](https://docs.venly.io/api/deep-dive-1/environments-and-networks#blockchain-networks).

## Usage

```typescript
import Onboard from '@shinbashi/core'
import venlyModule from '@shinbashi/venly'

// initialize the module with options
const venly = venlyModule({
  clientId: 'YOUR_CLIENT_ID'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    venly
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
