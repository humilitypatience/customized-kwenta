import { createSlice } from '@reduxjs/toolkit'

import { WalletState } from './types'

export const WALLET_INITIAL_STATE: WalletState = {
	walletAddress: undefined,
	networkId: undefined,
}

const walletSlice = createSlice({
	name: 'wallet',
	initialState: WALLET_INITIAL_STATE,
	reducers: {
		setWalletAddress: (state, action) => {
			state.walletAddress = action.payload
		},
		setNetwork: (state, action) => {
			state.networkId = action.payload
		},
		disconnect: (state) => {
			state.walletAddress = undefined
			state.networkId = undefined
		},
	},
})

export const { setWalletAddress, setNetwork } = walletSlice.actions

export default walletSlice.reducer
