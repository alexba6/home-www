import { forwardRef, FunctionComponent, MutableRefObject, Ref, useEffect, useMemo, useRef, useState } from 'react'

import styles from './Input.module.sass'

type InputProps = {
	placeholder: string
	value: string
	onValue: (value: string) => void
	type?: string
	error?: string
}

export const Input: FunctionComponent<InputProps> = (props) => {
	const [focus, setFocus] = useState(false)
	const localRef = useRef<HTMLInputElement>(null)

	const error = useMemo(() => (props.error ? 'error' : ''), [props.error])

	const top = useMemo(() => focus || props.value.length > 0, [focus, localRef, props])

	const handleFocus = (focused: boolean) => () => setFocus(focused)

	const handleClickLabel = () => {
		if (localRef.current) {
			localRef.current.focus()
		}
	}

	return (
		<div className={styles.formInputContainer}>
			<div className={styles.formInputFrame} focus={focus ? 'focus' : ''} error={error}>
				<input
					onFocus={handleFocus(true)}
					onBlur={handleFocus(false)}
					type={props.type}
					value={props.value}
					onChange={(e) => props.onValue(e.target.value)}
					ref={localRef}
				/>
				<label
					className={styles.formInputLabel}
					focus={focus ? 'focus' : ''}
					label_position={top ? 'top' : ''}
					error={error}
					onClick={handleClickLabel}
				>
					{props.placeholder}
				</label>
			</div>
		</div>
	)
}
