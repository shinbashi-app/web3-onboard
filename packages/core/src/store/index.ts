import { BehaviorSubject, Subject, Observable } from 'rxjs'
import { distinctUntilKeyChanged, pluck, filter } from 'rxjs/operators'
import { locale } from 'svelte-i18n'
import { APP_INITIAL_STATE } from '../constants.js'
import { notNullish } from '../utils.js'
import type { Chain, WalletModule } from '@shinbashi/common'

import type {
  AppState,
  WalletState,
  Action,
  UpdateWalletAction,
  AddWalletAction,
  UpdateAccountAction,
  UpdateAccountCenterAction,
  Locale,
  UpdateNotifyAction,
  AddNotificationAction,
  RemoveNotificationAction,
  UpdateAllWalletsAction,
  UpdateConnectModalAction,
  UpdateChainsAction,
  UpdateAppMetadataAction
} from '../types.js'

import {
  ADD_CHAINS,
  ADD_WALLET,
  UPDATE_WALLET,
  REMOVE_WALLET,
  RESET_STORE,
  UPDATE_ACCOUNT,
  UPDATE_CONNECT_MODAL,
  UPDATE_ACCOUNT_CENTER,
  UPDATE_NOTIFY,
  SET_WALLET_MODULES,
  SET_LOCALE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  UPDATE_ALL_WALLETS,
  UPDATE_CHAINS,
  UPDATE_APP_METADATA
} from './constants.js'

function reducer(state: AppState, action: Action): AppState {
  const { type, payload } = action

  switch (type) {
    case ADD_CHAINS:
      return {
        ...state,
        chains: [...state.chains, ...(payload as Chain[])]
      }

    case UPDATE_CHAINS: {
      const updatedChain = payload as UpdateChainsAction['payload']
      const chains = state.chains
      const index = chains.findIndex((chain) => chain.id === updatedChain.id)
      chains[index] = updatedChain
      return {
        ...state,
        chains
      }
    }

    case ADD_WALLET: {
      const wallet = payload as AddWalletAction['payload']
      const existingWallet = state.wallets.find(
        ({ label }) => label === wallet.label
      )

      return {
        ...state,
        wallets: [
          // add to front of wallets as it is now the primary wallet
          existingWallet || (payload as WalletState),
          // filter out wallet if it already existed
          ...state.wallets.filter(({ label }) => label !== wallet.label)
        ]
      }
    }

    case UPDATE_WALLET: {
      const update = payload as UpdateWalletAction['payload']
      const { id, ...walletUpdate } = update

      const updatedWallets = state.wallets.map(wallet =>
        wallet.label === id ? { ...wallet, ...walletUpdate } : wallet
      )

      return {
        ...state,
        wallets: updatedWallets
      }
    }

    case REMOVE_WALLET: {
      const update = payload as { id: string }

      return {
        ...state,
        wallets: state.wallets.filter(({ label }) => label !== update.id)
      }
    }

    case UPDATE_ACCOUNT: {
      const update = payload as UpdateAccountAction['payload']
      const { id, address, ...accountUpdate } = update

      const updatedWallets = state.wallets.map(wallet => {
        if (wallet.label === id) {
          wallet.accounts = wallet.accounts.map(account => {
            if (account.address === address) {
              return { ...account, ...accountUpdate }
            }

            return account
          })
        }

        return wallet
      })

      return {
        ...state,
        wallets: updatedWallets
      }
    }

    case UPDATE_ALL_WALLETS: {
      const updatedWallets = payload as UpdateAllWalletsAction['payload']
      return {
        ...state,
        wallets: updatedWallets
      }
    }

    case UPDATE_CONNECT_MODAL: {
      const update = payload as UpdateConnectModalAction['payload']

      return {
        ...state,
        connect: {
          ...state.connect,
          ...update
        }
      }
    }

    case UPDATE_ACCOUNT_CENTER: {
      const update = payload as UpdateAccountCenterAction['payload']

      return {
        ...state,
        accountCenter: {
          ...state.accountCenter,
          ...update
        }
      }
    }

    case UPDATE_NOTIFY: {
      const update = payload as UpdateNotifyAction['payload']

      return {
        ...state,
        notify: {
          ...state.notify,
          ...update
        }
      }
    }

    case ADD_NOTIFICATION: {
      const update = payload as AddNotificationAction['payload']
      const notificationsUpdate = [...state.notifications]

      const notificationExistsIndex = notificationsUpdate.findIndex(
        ({ id }) => id === update.id
      )

      if (notificationExistsIndex !== -1) {
        // if notification with same id, replace it with update
        notificationsUpdate[notificationExistsIndex] = update
      } else {
        // otherwise add it to the beginning of array as new notification
        notificationsUpdate.unshift(update)
      }

      return {
        ...state,
        notifications: notificationsUpdate
      }
    }

    case REMOVE_NOTIFICATION: {
      const id = payload as RemoveNotificationAction['payload']

      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== id
        )
      }
    }

    case SET_WALLET_MODULES: {
      return {
        ...state,
        walletModules: payload as WalletModule[]
      }
    }

    case SET_LOCALE: {
      // Set the locale in the svelte-i18n internal state
      locale.set(payload as Locale)
      return {
        ...state,
        locale: payload as Locale
      }
    }

    case UPDATE_APP_METADATA: {
      const update = payload as UpdateAppMetadataAction['payload']

      return {
        ...state,
        appMetadata: {
          ...state.appMetadata,
          ...update
        }
      }
    }

    case RESET_STORE:
      return APP_INITIAL_STATE

    default:
      throw new Error(`Unknown type: ${type} in appStore reducer`)
  }
}

const _store = new BehaviorSubject<AppState>(APP_INITIAL_STATE)
const _stateUpdates = new Subject<AppState>()

_stateUpdates.subscribe(_store)

export function dispatch(action: Action): void {
  const state = _store.getValue()
  _stateUpdates.next(reducer(state, action))
}

function select(): Observable<AppState>
function select<T extends keyof AppState>(stateKey: T): Observable<AppState[T]>
function select<T extends keyof AppState>(
  stateKey?: keyof AppState
): Observable<AppState[T]> | Observable<AppState> {
  if (!stateKey) return _stateUpdates.asObservable()

  const validStateKeys = Object.keys(_store.getValue())

  if (!validStateKeys.includes(String(stateKey))) {
    throw new Error(`key: ${stateKey} does not exist on this store`)
  }

  return _stateUpdates
    .asObservable()
    .pipe(
      distinctUntilKeyChanged(stateKey),
      pluck(stateKey),
      filter(notNullish)
    ) as Observable<AppState[T]>
}

function get(): AppState {
  return _store.getValue()
}

export const state = {
  select,
  get
}
