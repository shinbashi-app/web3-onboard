import Joi from 'joi'
import { InjectedWalletOptions } from './types.js'
import { validate, type ValidateReturn } from '@shinbashi/common'

const walletModule = Joi.object({
  label: Joi.string().required(),
  getIcon: Joi.function().arity(0).required(),
  getInterface: Joi.function().maxArity(1).required(),
  injectedNamespace: Joi.string().required(),
  checkProviderIdentity: Joi.function().arity(1).required(),
  platforms: Joi.array().items(Joi.string()),
  externalUrl: Joi.string()
})

const wallets = Joi.array().items(walletModule)

const filter = Joi.object().pattern(
  /\w+/,
  Joi.any().allow(Joi.boolean(), Joi.array().items(Joi.string()))
)

const walletOptions = Joi.object({
  custom: wallets,
  filter,
  displayUnavailable: [Joi.boolean(), Joi.array().items(Joi.string())],
  walletUnavailableMessage: Joi.function(),
  sort: Joi.function(),
  externalUrl: Joi.string()
})

export const validateWalletOptions = (
  data: InjectedWalletOptions | Partial<InjectedWalletOptions>
): ValidateReturn => validate(walletOptions, data)
