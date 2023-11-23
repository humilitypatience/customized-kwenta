import {
	FuturesMarket,
	FuturesMarketKey,
	FuturesMarketAsset,
	SynthSuspensionReason,
	PerpsMarketV2,
} from '@kwenta/sdk/types'
import { wei } from '@synthetixio/wei'
import axios from 'axios'

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

axios.defaults.baseURL = API_ENDPOINT

export const custome_getFuturesTrades = (url: string, options: object, args: object) => {
	return Promise.resolve([])
}

export const custome_getCandles = (url: string, options: object, args: object) => {
	return Promise.resolve([])
}

export const custome_getFuturesAggregateStats = (url: string, options: object, args: object) => {
	return Promise.resolve([])
}

export const custome_getFuturesFee = () => {
	return {}
}

export const custome_getFuturesFeeForAccount = () => {
	return {}
}

export const custome_getMarkets = async (): Promise<PerpsMarketV2[]> => {
	const marketData = await axios
		.get('/markets')
		.then((res: any) => {
			return res.data
		})
		.catch((error: Error) => {})
	return marketData
	// return marketData
	// return [{
	// 	version: 2,
	// 	marketAddress: 'custome_market_address',
	// 	marketKey: FuturesMarketKey.s1INCHPERP,
	// 	marketName: 'market_name_0',
	// 	asset: FuturesMarketAsset.AAVE,
	// 	assetHex: '79373',
	// 	currentFundingRate: wei(1000000000000000000),
	// 	currentFundingVelocity: wei(1000000000000000000),
	// 	feeRates: {
	// 		makerFee: wei(1000000000000000000),
	// 		takerFee: wei(1000000000000000000),
	// 		makerFeeDelayedOrder: wei(1000000000000000000),
	// 		takerFeeDelayedOrder: wei(1000000000000000000),
	// 		makerFeeOffchainDelayedOrder: wei(1000000000000000000),
	// 		takerFeeOffchainDelayedOrder: wei(1000000000000000000),
	// 	},
	// 	openInterest: {
	// 		shortPct: 1000,
	// 		longPct: 10000,
	// 		shortUSD: wei(1000),
	// 		longUSD: wei(1000000000),
	// 		long: wei(1000),
	// 		short: wei(1000000000),
	// 	},
	// 	marketDebt: wei(1000000000000000000),
	// 	marketSkew: wei(1000000000000000000),
	// 	marketSize: wei(1000000000000000000),
	// 	contractMaxLeverage: wei(1000000000000000000),
	// 	appMaxLeverage: wei(1000000000000000000),
	// 	minInitialMargin: wei(1000000000000000000),
	// 	keeperDeposit: wei(1000000000000000000),
	// 	isSuspended: true,
	// 	marketClosureReason: "system-upgrade",
	// 	marketLimitUsd: wei(1000000000000000000),
	// 	marketLimitNative: wei(1000000000000000000),
	// 	settings: {
	// 		maxMarketValue: wei(1000000000000000000),
	// 		skewScale: wei(1000000000000000000),
	// 		delayedOrderConfirmWindow: 1,
	// 		offchainDelayedOrderMinAge: 2,
	// 		offchainDelayedOrderMaxAge: 3,
	// 		minDelayTimeDelta: 4,
	// 		maxDelayTimeDelta: 5,
	// 	}
	// }]
}

export const custome_getMarketFundingRatesHistory = async () => {
	const fundingData = await axios
		.get('/marketFundingRatesHistory')
		.then((res) => {
			return res.data
		})
		.catch((error) => {
			return []
		})
	return fundingData
}
