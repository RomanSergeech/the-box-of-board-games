import c from './openId.module.scss'

interface TOpenIdProps {
	openId: string
}
const OpenId = ({ openId }: TOpenIdProps) => {
	return (
		<div className={c.open_id} >
			id: <span>{openId}</span>
		</div>
	)
}

export { OpenId }