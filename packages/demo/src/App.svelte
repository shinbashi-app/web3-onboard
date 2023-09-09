<script>
  import Onboard from '@shinbashi/core'
  import fortmaticModule from '@shinbashi/fortmatic'
  import frameModule from '@shinbashi/frame'
  import safeModule from '@shinbashi/gnosis'
  import infinityWalletModule from '@shinbashi/infinity-wallet'
  import injectedModule, { ProviderLabel } from '@shinbashi/injected-wallets'
  import keepkeyModule from '@shinbashi/keepkey'
  import keystoneModule from '@shinbashi/keystone'
  import ledgerModule from '@shinbashi/ledger'
  import portisModule from '@shinbashi/portis'
  import torusModule from '@shinbashi/torus'
  import trezorModule from '@shinbashi/trezor'
  import walletConnectModule from '@shinbashi/walletconnect'
  import coinbaseModule from '@shinbashi/coinbase'
  import magicModule from '@shinbashi/magic'
  import web3authModule from '@shinbashi/web3auth'
  import gas from '@shinbashi/gas'
  import dcentModule from '@shinbashi/dcent'
  import sequenceModule from '@shinbashi/sequence'
  import tallyHoModule from '@shinbashi/tallyho'
  import xdefiWalletModule from '@shinbashi/xdefi'
  import zealModule from '@shinbashi/zeal'
  import transactionPreviewModule from '@shinbashi/transaction-preview'
  import enkryptModule from '@shinbashi/enkrypt'
  import mewWalletModule from '@shinbashi/mew-wallet'
  import uauthModule from '@shinbashi/uauth'
  import phantomModule from '@shinbashi/phantom'
  import trustModule from '@shinbashi/trust'
  import frontierModule from '@shinbashi/frontier'
  import bloctoModule from '@shinbashi/blocto'
  import cedeStoreModule from '@shinbashi/cede-store'
  import arcanaAuthModule from '@shinbashi/arcana-auth'
  import venlyModule from '@shinbashi/venly'
  import {
    recoverAddress,
    arrayify,
    hashMessage,
    verifyTypedData
  } from 'ethers/lib/utils'
  import { ethers } from 'ethers'
  import { share } from 'rxjs/operators'
  import VConsole from 'vconsole'
  import blocknativeIcon from './blocknative-icon.js'
  import DappAuth from '@blocto/dappauth'

  if (window.innerWidth < 700) {
    new VConsole()
  }

  const apiKey = '7ed5f4aa-fb90-4124-8ef9-f69e3e8e666d'
  const infura_key = '80633e48116943128cbab25e402764ab'

  let defaultTransactionObject = JSON.stringify(
    {
      from: '0xD87927847330FC926afd2B66C478A42a004aB4e7',
      to: '0xd0d6d6c5fe4a677d343cc433536bb717bae167dd',
      value: '0xf4240',
      data: '0xa',
      chainId: 1,
      nonce: '0x0',
      maxFeePerGas: '0x14',
      maxPriorityFeePerGas: '0x0',
      gasLimit: '0x14'
    },
    undefined,
    4
  )

  let transactionObject = defaultTransactionObject
  let signMsg = 'Any string message'

  const injected = injectedModule({
    custom: [
      // include custom (not natively supported) injected wallet modules here
    ],
    // display all unavailable injected wallets
    // displayUnavailable: true,
    // ||
    // display specific unavailable wallets
    displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust]
    // but only show Binance and Bitski wallet if they are available
    // filter: {
    //   [ProviderLabel.Binance]: 'unavailable',
    //   [ProviderLabel.Bitski]: 'unavailable'
    // }
    // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
    // sort: wallets => {
    //   const metaMask = wallets.find(
    //     ({ label }) => label === ProviderLabel.MetaMask
    //   )
    //   const coinbase = wallets.find(
    //     ({ label }) => label === ProviderLabel.Coinbase
    //   )

    //   return (
    //     [
    //       metaMask,
    //       coinbase,
    //       ...wallets.filter(
    //         ({ label }) =>
    //           label !== ProviderLabel.MetaMask &&
    //           label !== ProviderLabel.Coinbase
    //       )
    //     ]
    //       // remove undefined values
    //       .filter(wallet => wallet)
    //   )
    // }
    // walletUnavailableMessage: wallet =>
    //   wallet.externalUrl
    //     ? `Oops ${wallet.label} is unavailable! Please <a href="${wallet.externalUrl}" target="_blank">install</a>`
    //     : `Oops ${wallet.label} is unavailable!`
  })

  const coinbaseWallet = coinbaseModule()

  const walletConnect = walletConnectModule({
    handleUri: uri => console.log(uri),
    projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
    dappUrl: 'https://www.onboard.blocknative.com'
  })
  const portis = portisModule({
    apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
  })

  const fortmatic = fortmaticModule({
    apiKey: 'pk_test_886ADCAB855632AA'
  })

  const web3auth = web3authModule({
    clientId:
      'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
  })

  const arcanaAuth = arcanaAuthModule({
    clientID: 'xar_test_c9c3bc702eb13255c58dab0e74cfa859711c13cb'
  })

  const torus = torusModule()
  const infinityWallet = infinityWalletModule()
  const ledger = ledgerModule({ projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5' })
  const keepkey = keepkeyModule()
  const keystone = keystoneModule()
  const safe = safeModule()
  const tallyho = tallyHoModule()
  const xdefi = xdefiWalletModule()
  const zeal = zealModule()
  const phantom = phantomModule()
  const trust = trustModule()
  const frontier = frontierModule()
  const cedeStore = cedeStoreModule()
  const blocto = bloctoModule()

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com',
    consecutiveEmptyAccountThreshold: 10
    // containerElement: '#sample-container-el'
  }
  const trezor = trezorModule(trezorOptions)

  const uauthOptions = {
    clientID: 'a25c3a65-a1f2-46cc-a515-a46fe7acb78c',
    walletConnectProjectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
    redirectUri: 'http://localhost:8080/',
    scope:
      'openid wallet email:optional humanity_check:optional profile:optional social:optional'
  }
  const uauth = uauthModule(uauthOptions)

  const magic = magicModule({
    apiKey: 'pk_live_02207D744E81C2BA'
    // userEmail: 'test@test.com'
    // userEmail is optional - if user has already logged in and/or session is still active a login modal will not appear
    // for more info see the @shinbashi/magic docs
  })

  const dcent = dcentModule()
  const frameWallet = frameModule()
  const sequence = sequenceModule()
  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()
  const transactionPreview = transactionPreviewModule({
    requireTransactionApproval: true
  })
  const venly = venlyModule({
    clientId: 'blocknative',
    environment: 'staging'
  })

  const onboard = Onboard({
    wallets: [
      injected,
      ledger,
      trezor,
      walletConnect,
      coinbaseWallet,
      phantom,
      safe,
      trust,
      tallyho,
      enkrypt,
      infinityWallet,
      mewWallet,
      keepkey,
      keystone,
      magic,
      fortmatic,
      portis,
      torus,
      dcent,
      sequence,
      uauth,
      web3auth,
      zeal,
      frontier,
      xdefi,
      frameWallet,
      cedeStore,
      arcanaAuth,
      blocto,
      venly
    ],
    transactionPreview,
    gas,
    connect: {
      // disableClose: true,
      // removeWhereIsMyWalletWarning: true,
      autoConnectAllPreviousWallet: true
    },
    appMetadata: {
      name: 'Blocknative',
      icon: blocknativeIcon,
      // logo: blocknativeLogo,
      description: 'Demo app for Onboard V2',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ],
      agreement: {
        version: '1.0.0',
        termsUrl: 'https://www.blocknative.com/terms-conditions',
        privacyUrl: 'https://www.blocknative.com/privacy-policy'
      },
      gettingStartedGuide: 'https://blocknative.com',
      explore: 'https://blocknative.com'
    },
    // // example customizing account center
    accountCenter: {
      desktop: {
        enabled: true
      }
    },
    // example customizing copy
    i18n: {
      en: {
        connect: {
          connectingWallet: {
            paragraph:
              '{wallet, select, MetaMask {{wallet} can only present one account, so connect just the one account you want.} other {Please connect to all of your accounts in {wallet}.}}'
          }
        }
      }
    },
    notify: {
      desktop: {
        enabled: true,
        transactionHandler: transaction => {
          console.log({ transaction })
          if (transaction.eventCode === 'txConfirmed') {
            return {
              autoDismiss: 0
            }
          }
          // if (transaction.eventCode === 'txPool') {
          //   return {
          //     type: 'hint',
          //     message: 'Your in the pool, hope you brought a towel!',
          //     autoDismiss: 0,
          //     link: `https://goerli.etherscan.io/tx/${transaction.hash}`
          //   }
          // }
        },
        position: 'topRight'
      }
    },
    // containerElements: {
    // // El must be present at time of JS script execution
    // // See ../public/index.html for element example
    //   connectModal: '#sample-container-el',
    //   accountCenter: '#sample-container-el2'
    // },
    // Sign up for your free api key at www.Blocknative.com
    apiKey,
    theme: 'default'
  })

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets').pipe(share())
  wallets$.subscribe(wallet => {
    console.log(wallet)
    const unstoppableUser = wallet.find(
      provider => provider.label === 'Unstoppable'
    )
    if (unstoppableUser) console.log(unstoppableUser.instance.user)
    const wc = wallet.find(provider => provider.label === 'WalletConnect')
    if (wc) console.log(wc)
  })

  const signTransactionMessage = async provider => {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()

    const signature = await signer.signTransaction({
      to: '',
      value: 100000000000000
    })

    console.log(signature)
  }

  let toAddress
  const sendTransaction = async provider => {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()

    const popTransaction = await signer.populateTransaction({
      to: toAddress,
      value: 10000000000000
    })

    const txn = await signer.sendTransaction(popTransaction)

    const receipt = await txn.wait()
    console.log(receipt)
  }

  const sendTransactionWithPreFlight = async (provider, balance) => {
    await onboard.setChain({ chainId: '0x5' })

    const balanceValue = Object.values(balance)[0]
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()
    const txDetails = {
      to: toAddress,
      value: 100000000000000
    }

    const sendTransaction = () => {
      return signer.sendTransaction(txDetails).then(tx => tx.hash)
    }

    const gasPrice = () =>
      ethersProvider.getGasPrice().then(res => res.toString())

    const estimateGas = () => {
      return ethersProvider.estimateGas(txDetails).then(res => res.toString())
    }

    const transactionHash = await onboard.state.actions.preflightNotifications({
      sendTransaction,
      gasPrice,
      estimateGas,
      balance: balanceValue,
      txDetails: txDetails
    })

    console.log(transactionHash)
  }

  const signMessage = async (provider, address) => {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')
    const signer = ethersProvider?.getSigner()
    const addr = await signer?.getAddress()
    const signature = await signer?.signMessage(signMsg)
    let verifySign = false
    let recoveredAddress = null

    try {
      recoveredAddress = recoverAddress(
        arrayify(hashMessage(signMsg)),
        signature
      )
      verifySign = recoveredAddress === addr
    } catch (error) {
      console.error('Error recovering address', error)
    }

    // contract wallets verify EIP-1654
    const verifySignBy1654 = new DappAuth(provider)
    const isAuthorizedSigner = await verifySignBy1654.isAuthorizedSigner(
      signMsg,
      signature,
      address
    )
    if (!verifySign && !isAuthorizedSigner) {
      console.error(
        "Signature failed. Recovered address doesn' match signing address."
      )
      verifySign = recoveredAddress === addr
    }

    console.log({ signMsg, signature, recoveredAddress, addr })
  }

  let typedMsg = JSON.stringify(
    {
      domain: {
        chainId: '0x5',
        name: 'Web3-Onboard Test App',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1'
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'
          ]
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000'
            ]
          }
        ]
      },
      primaryType: 'Message',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' }
        ],
        Message: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' }
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' }
        ]
      }
    },
    undefined,
    2
  )
  const signTypedMessage = async (provider, address) => {
    const signature = await provider.request({
      method: 'eth_signTypedData_v4',
      params: [address, typedMsg]
    })
    const { domain, types, message } = JSON.parse(typedMsg)

    delete types.EIP712Domain
    console.log(verifyTypedData(domain, types, message, signature))
  }

  const themes = ['system', 'default', 'light', 'dark']
  let selectedTheme = 'system'
  const updateTheme = () => {
    onboard.state.actions.updateTheme(selectedTheme)
  }
</script>

<style>
  main {
    height: 100%;
  }
  button {
    width: 14rem;
    margin: 8px;
  }
  .connected-wallet {
    padding: 1rem;
    border-radius: 4px;
    margin: 0.5rem;
    border: 1px solid gray;
  }

  .flex-centered {
    display: flex;
    align-items: center;
  }

  .account-info div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .text-input {
    width: 18rem;
  }

  .sign-transaction {
    display: flex;
    align-items: end;
  }

  .sign-transaction-textarea {
    width: 24rem;
    height: 12rem;
    margin: 0;
  }
  .notify-chain-container {
    display: flex;
    flex-wrap: wrap;
  }
  .switch-chain-container,
  .notify-action-container {
    display: flex;
    flex-direction: column;
    width: 15rem;
  }
  .position-buttons {
    display: flex;
    flex-direction: column;
  }
</style>

<main>
  <div class="cta">
    <button on:click={() => onboard.connectWallet()} id="connectBtn"
      >Connect Wallet</button
    >
    <select bind:value={selectedTheme} on:change={() => updateTheme()}>
      {#each themes as theme}
        <option value={theme}>
          {theme}
        </option>
      {/each}
    </select>
    {#if $wallets$}
      <button
        class="updateBalanceBtn"
        on:click={() => {
          // Only necessary if a Blocknative API key is not provided and notify is disabled
          onboard.state.actions.updateBalances()
        }}>Update Wallet Balance</button
      >
      <div class="notify-chain-container">
        <div class="notify-action-container">
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                type: 'hint',
                message: 'This is a custom DApp hint',
                autoDismiss: 0
              })}>Send Hint Notification</button
          >
          <button
            on:click={() => {
              const { update, dismiss } =
                onboard.state.actions.customNotification({
                  type: 'pending',
                  message:
                    'This is a custom DApp pending notification to use however you want',
                  autoDismiss: 0
                })
              setTimeout(
                () =>
                  update({
                    eventCode: 'dbUpdateSuccess',
                    message: 'Updated status for custom notification',
                    type: 'success',
                    autoDismiss: 0
                  }),
                4000
              )
            }}>Send Success Notification</button
          >
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                message:
                  'This is a custom DApp success notification to use however you want',
                autoDismiss: 0,
                type: 'pending'
              })}>Send Pending Notification</button
          >
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                type: 'error',
                message:
                  'This is a custom DApp Error notification to use however you want',
                autoDismiss: 0
              })}>Send Error Notification</button
          >
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                message:
                  'This is a custom non-descript DApp notification to use however you want',
                autoDismiss: 0
              })}>Send DApp Notification</button
          >
        </div>
        <div class="switch-chain-container">
          <button on:click={() => onboard.setChain({ chainId: '0x1' })}
            >Set Chain to Mainnet</button
          >
          <button on:click={() => onboard.setChain({ chainId: '0x5' })}
            >Set Chain to Goerli</button
          >
          <button on:click={() => onboard.setChain({ chainId: '0x89' })}
            >Set Chain to Matic</button
          >
          <button on:click={() => onboard.setChain({ chainId: 10 })}
            >Set Chain to Optimism</button
          >
        </div>
        <div class="position-buttons">
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'bottomLeft'
              })}>AC Bottom Left</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'topRight'
              })}>AC Top Right</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'bottomRight'
              })}>AC Bottom Right</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'topLeft'
              })}>AC Top Left</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                minimal: false
              })}>Large Trigger</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                minimal: true
              })}>Small Trigger</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAppMetadata({
                // Checkmark
                icon: `<svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="currentColor"/></svg>`,
                // Hourglass
                logo: `<svg width="100%" height="100%" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L0.0100002 6L4 10L0.0100002 14.01L0 20H12V14L8 10L12 6.01V0H0ZM10 14.5V18H2V14.5L6 10.5L10 14.5Z" fill="#929BED"/>
                  </svg>`,
                description: 'Updated Description!',
                agreement: {
                  version: '2.0.0',
                  termsUrl: 'https://onboard.blocknative.com/',
                  privacyUrl: 'https://onboard.blocknative.com/'
                },
                gettingStartedGuide: 'https://onboard.blocknative.com/',
                explore: 'https://onboard.blocknative.com/'
              })}>Update appMetadata</button
          >
        </div>
      </div>
    {/if}
  </div>
  {#if $wallets$}
    {#each $wallets$ as { icon, label, accounts, chains, provider, instance }}
      <div class="connected-wallet" data-testid="connected-wallet">
        <div class="flex-centered" style="width: 10rem;">
          <div style="width: 2rem; height: 2rem">{@html icon}</div>
          <span data-testid={label}>{label}</span>
        </div>

        <div data-testid="chains">
          Chains: {JSON.stringify(chains, null, 2)}
        </div>

        {#each accounts as { address, ens, uns, balance }}
          <div
            class="account-info"
            style="margin-top: 0.25rem; margin-bottom: 0.25rem; padding: 0.25rem; border: 1px solid gray;"
          >
            <div>Address: {address}</div>
            {#if balance}
              <div>Balances:</div>
              {#each Object.entries(balance) as [token, amount]}
                <div style="margin-left: 1rem;">{token}: {amount}</div>
              {/each}
            {/if}

            {#if ens}
              <div>ENS Name: {(ens && ens.name) || ''}</div>
            {/if}

            {#if uns}
              <div>UNS Name: {(uns && uns.name) || ''}</div>
            {/if}

            {#if label === 'Unstoppable'}
              <div>Unstoppable Email: {instance.user.email || ''}</div>
              <div>
                Unstoppable Humanity: {instance.user.humanity_check_id || ''}
              </div>
              <div>Unstoppable Profile: {instance.user.profile || ''}</div>
            {/if}
          </div>
          <div>
            <input
              type="text"
              class="text-input"
              placeholder="0x..."
              bind:value={toAddress}
              data-testid="sendTransaction"
            />
            <button on:click={sendTransaction(provider)}>
              Send Transaction
            </button>
          </div>
          <div>
            <input
              type="text"
              class="text-input"
              placeholder="0x..."
              bind:value={toAddress}
              data-testid="sendWithPreflight"
            />
            <button on:click={sendTransactionWithPreFlight(provider, balance)}>
              Send with Preflight Notifications
            </button>
          </div>
          <div>
            <input
              id="sign-msg-input"
              type="text"
              class="text-input"
              placeholder="Message..."
              bind:value={signMsg}
            />
            <button on:click={signMessage(provider, address)}>
              Sign Message
            </button>
          </div>
          <div>
            <textarea
              bind:value={typedMsg}
              type="text"
              class="sign-transaction-textarea"
            />
            <button on:click={signTypedMessage(provider, address)}>
              Sign Typed Message
            </button>
          </div>
          <div class="sign-transaction">
            <textarea
              bind:value={transactionObject}
              id="sign-transaction-input"
              type="text"
              class="sign-transaction-textarea"
            />
            <button
              on:click={signTransactionMessage(provider)}
              style="margin: 0 0 0 .5rem"
            >
              Sign Transaction
            </button>
          </div>
        {/each}
        <button
          style="margin-top: 0.5rem;"
          on:click={() => onboard.disconnectWallet({ label })}
        >
          Disconnect Wallet
        </button>
      </div>
    {/each}
  {/if}
</main>
