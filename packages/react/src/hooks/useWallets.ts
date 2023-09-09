import type { WalletState } from '@shinbashi/core'

import { useAppState } from './useAppState.js'

export const useWallets = (): WalletState[] => useAppState('wallets')
