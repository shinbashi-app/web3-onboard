import fortmaticModule from '@shinbashi/fortmatic'
import safeModule from '@shinbashi/gnosis'
import injectedModule from '@shinbashi/injected-wallets'
import keepkeyModule from '@shinbashi/keepkey'
import keystoneModule from '@shinbashi/keystone'
import ledgerModule from '@shinbashi/ledger'
import portisModule from '@shinbashi/portis'
import torusModule from '@shinbashi/torus'
import trezorModule from '@shinbashi/trezor'
import walletConnectModule from '@shinbashi/walletconnect'
import coinbaseModule from '@shinbashi/coinbase'
import magicModule from '@shinbashi/magic'
import dcentModule from '@shinbashi/dcent'
import mewModule from '@shinbashi/mew-wallet'
import sequenceModule from '@shinbashi/sequence'
import tahoWalletModule from '@shinbashi/taho'
import web3authModule from '@shinbashi/web3auth'
import { init } from '@shinbashi/react'

// Import the blocknative icon
import icon from './blocknative'

const INFURA_KEY = '2896ff3d0a1143689424a8341cb75c67'

const injected = injectedModule({
  custom: [
    // include custom injected wallet modules here
  ],
  filter: {
    // mapping of wallet labels to filter here
  }
})

const walletLink = coinbaseModule()

const walletConnect = walletConnectModule(
  {
    version: 2,
    // Replace with your apiKey
    projectId: '4a49c32131502e8c12d54295295e2012',
    dappUrl: 'https://onboard.blocknative.com/'
  }
)
const portis = portisModule({
  // Replace with your apiKey
  apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
})

const fortmatic = fortmaticModule({
  // Replace with your apiKey
  apiKey: 'pk_test_886ADCAB855632AA'
})

const torus = torusModule()
const ledger = ledgerModule()
const keepkey = keepkeyModule()
const keystone = keystoneModule()
const safe = safeModule()
const dcent = dcentModule()
const mew = mewModule()
const tahoWalletSdk = tahoWalletModule()
const web3auth = web3authModule({
  clientId:
    'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
})

const sequence = sequenceModule({
  appName: 'My app'
})

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}
const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  // Replace with your apiKey
  apiKey: 'pk_live_02207D744E81C2BA'
})

export default init({
  // An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet.
  wallets: [
    injected,
    safe,
    fortmatic,
    portis,
    walletLink,
    magic,
    torus,
    ledger,
    trezor,
    walletConnect,
    keepkey,
    keystone,
    dcent,
    mew,
    tahoWalletSdk,
    web3auth,
    sequence
  ],
  // An array of Chains that your app supports
  chains: [
    {
      // hex encoded string, eg '0x1' for Ethereum Mainnet
      id: '0x1',
      // string indicating chain namespace. Defaults to 'evm' but will allow other chain namespaces in the future
      namespace: 'evm',
      // the native token symbol, eg ETH, BNB, MATIC
      token: 'ETH',
      // used for display, eg Ethereum Mainnet
      label: 'Ethereum Mainnet',
      // used for network requests
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    }
  ],
  appMetadata: {
    // The name of your dApp
    name: 'Blocknative',
    // SVG icon string, with height or width (whichever is larger) set to 100% or a valid image URL
    icon,
    // Optional wide format logo (ie icon and text) to be displayed in the sidebar of connect modal. Defaults to icon if not provided
    logo: '<svg></svg>',
    // The description of your app
    description: 'Demo app for Onboard V2',
    // The url to a getting started guide for app
    gettingStartedGuide: 'http://mydapp.io/getting-started',
    // url that points to more information about app
    explore: 'http://mydapp.io/about',
    // if your app only supports injected wallets and when no injected wallets detected, recommend the user to install some
    recommendedInjectedWallets: [
      {
        // display name
        name: 'MetaMask',
        // link to download wallet
        url: 'https://metamask.io'
      },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ],
    // Optional - but allows for dapps to require users to agree to TOS and privacy policy before connecting a wallet
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.blocknative.com/terms-conditions',
      privacyUrl: 'https://www.blocknative.com/privacy-policy'
    }
  }
  // example customising copy
  // i18n: {
  //   en: {
  //     connect: {
  //       selectingWallet: {
  //         header: 'custom text header'
  //       }
  //     }
  //   }
  // }
})
