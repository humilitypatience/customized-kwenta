import { SignInButton, SignOutButton, SignUpButton, useClerk } from '@clerk/nextjs'
import { FC } from 'react'
import styled from 'styled-components'

import { FlexDivCol } from 'components/layout/flex'
import { MobileHiddenView } from 'components/Media'

import Banner from '../../HomeLayout/Banner'
import Logo from '../../Logo'

import Nav from './Nav'
import WalletButtons from './WalletButtons'

const Header: FC = () => {
	const { user } = useClerk()
	return (
		<MobileHiddenView>
			<FlexDivCol>
				<Container>
					<LogoNav>
						<Logo />
						<Nav />
					</LogoNav>
					{/* <WalletButtons /> */}
					{user ? (
						<SignOutButton />
					) : (
						<div>
							<SignInButton />
							<SignUpButton />
						</div>
					)}
				</Container>
				<Banner />
			</FlexDivCol>
		</MobileHiddenView>
	)
}

const Container = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 15px;
`

const LogoNav = styled.div`
	display: flex;
	align-items: center;
`

export default Header
