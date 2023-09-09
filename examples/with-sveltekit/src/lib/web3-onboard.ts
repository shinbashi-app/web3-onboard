import Onboard from '@shinbashi/core'
import type { OnboardAPI } from '@shinbashi/core'
import injectedWalletsModule from '@shinbashi/injected-wallets'
import walletConnectModule from '@shinbashi/walletconnect'

const injected = injectedWalletsModule()
const walletConnect = walletConnectModule({
  connectFirstChainId: true,
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
})

const wallets = [injected, walletConnect]

const INFURA_ID = ''

const chains = [
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
  },
  {
    id: 137,
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
]

const appMetadata = {
  name: 'Web3-Onboard Svelte Demo',
  icon: '<svg />',
  logo: '<svg />',
  description: 'Demo using Onboard',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' }
  ]
}
let onboard

if (!onboard) {
  onboard = Onboard({
    wallets,
    chains,
    appMetadata
  })
}

export default onboard as OnboardAPI
