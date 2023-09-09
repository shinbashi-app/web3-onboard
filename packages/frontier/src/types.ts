import { EIP1193Provider } from '@shinbashi/common'
export interface CustomWindow extends Window {
  ethereum: EIP1193Provider & {
    isFrontier?: boolean
  }
  frontier: {
    ethereum: EIP1193Provider
  }
}
