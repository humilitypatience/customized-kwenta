import Image from 'next/image'
import { useCallback, useReducer } from 'react'
import styled from 'styled-components'

import { StyledCaretDownIcon } from 'components/Select'
import { HOURS_TOGGLE_HEIGHT, zIndex } from 'constants/ui'

type SmallToggleProps<T extends string> = {
	value: T
	options: T[]
	getLabelByValue?: (value: T) => string
	iconMap?: Record<T, string>
	onOptionClick: (value: T) => void
}

const SmallToggle = <T extends string>({
	value,
	options,
	getLabelByValue,
	iconMap,
	onOptionClick,
}: SmallToggleProps<T>) => {
	const [open, toggleOpen] = useReducer((o) => !o, false)

	const handleOptionClick = useCallback(
		(option: T) => () => {
			onOptionClick(option)
			toggleOpen()
		},
		[onOptionClick, toggleOpen]
	)

	return (
		<ToggleContainer open={open}>
			<ToggleTable $open={open}>
				<ToggleTableHeader onClick={toggleOpen}>
					{iconMap?.[value] && <Image alt={value} src={iconMap[value]} width={11} height={11} />}
					{getLabelByValue?.(value) ?? value}
					<StyledCaretDownIcon width={12} $flip={open} style={{ marginLeft: 2 }} />
				</ToggleTableHeader>
				{open && (
					<ToggleTableRows>
						{options
							.filter((o) => o !== value)
							.map((option) => (
								<ToggleTableRow key={option} onClick={handleOptionClick(option)}>
									{iconMap?.[option] && (
										<Image alt={value} src={iconMap[option]} width={11} height={11} />
									)}
									{option}
								</ToggleTableRow>
							))}
					</ToggleTableRows>
				)}
			</ToggleTable>
		</ToggleContainer>
	)
}

const ToggleTableRow = styled.div`
	display: flex;
	align-items: center;
	margin: auto;
	padding: 1.5px 6px;
	height: ${HOURS_TOGGLE_HEIGHT};
	background: ${(props) => props.theme.colors.selectedTheme.newTheme.pill.gray.background};

	:last-child {
		border-radius: 0px 0px 9px 9px;
	}

	img {
		margin-right: 3px;
	}

	:hover {
		color: ${(props) => props.theme.colors.selectedTheme.newTheme.text.primary};
		background: ${(props) =>
			props.theme.colors.selectedTheme.newTheme.pill['gray'].hover.background};
		:last-child {
			border-radius: 0px 0px 9px 9px;
		}
	}
`

const ToggleTableRows = styled.div`
	width: 100%;
	position: absolute;
	top: 20px;
	color: ${(props) => props.theme.colors.selectedTheme.newTheme.text.secondary};
	z-index: ${zIndex.HEADER};
`

const ToggleTableHeader = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 3px 5px;
	font-size: 12px;

	img {
		margin-right: 3px;
	}
`

const ToggleTable = styled.div<{ $open?: boolean }>`
	display: flex;
	flex-direction: column;
	background: ${(props) => props.theme.colors.selectedTheme.newTheme.pill['gray'].background};
	color: ${(props) => props.theme.colors.selectedTheme.newTheme.text.primary};
	border-radius: 9px;
	font-size: 12px;
	font-family: ${(props) => props.theme.fonts.bold};
	${(props) => props.$open && `border-radius: 9px 9px 0px 0px;`}
`

const ToggleContainer = styled.div<{ open: boolean }>`
	margin-left: 8px;
	cursor: pointer;
	position: relative;
`

export default SmallToggle
