import { format } from 'date-fns'
import { FC, useCallback, useMemo, useState, memo } from 'react'
import styled, { css } from 'styled-components'

import { Body } from 'components/Text'
import getLocale from 'utils/formatters/getLocale'

type TimeDisplayProps = {
	value: any
	horizontal?: boolean
	shortDate?: boolean
}

const TimeDisplay: FC<TimeDisplayProps> = memo(({ value, horizontal, shortDate = false }) => {
	const [show12hr, setShow12h] = useState(false)

	const handleOnClick = useCallback(() => {
		setShow12h((current) => !current)
	}, [])

	const locale = useMemo(() => getLocale(), [])

	const date = useMemo(
		() =>
			format(
				new Date(value),
				shortDate ? 'MM/dd' : locale.formatLong?.date({ width: 'short' }) ?? 'MM/dd/yy'
			),
		[value, shortDate, locale.formatLong]
	)

	const time12hr = useMemo(() => new Date(value).toLocaleTimeString(locale.code), [value, locale])

	const time24hr = useMemo(
		() => format(new Date(value), shortDate ? 'HH:mm' : 'HH:mm:ss', { locale }),
		[value, shortDate, locale]
	)

	return (
		<TimeDisplayContainer horizontal={horizontal} onClick={handleOnClick}>
			<Body mono>{date}</Body>
			<Body mono color="secondary">
				{show12hr ? time12hr : time24hr}
			</Body>
		</TimeDisplayContainer>
	)
})

const TimeDisplayContainer = styled.div<{ horizontal?: boolean }>`
	${(props) =>
		props.horizontal &&
		css`
			display: flex;
			column-gap: 5px;
			div:last-child {
				color: ${props.theme.colors.common.secondaryGray};
			}
		`}
`

export default TimeDisplay
