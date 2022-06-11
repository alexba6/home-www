import { FunctionComponent, useState } from 'react'
import { Template } from '../../Template/Template'
import { Card, CardHeader } from '../../Components/Card/Card'

import { Table } from '../../Components/Table/Table'

export const AccountAuthPage: FunctionComponent = () => {
	return (
		<Template>
			<Card>
				<CardHeader>
					<h3>Authentification</h3>
					<p>Ces sessions sont actuellement connectées à votre compte.</p>
				</CardHeader>
				<Table>
					<thead>
					<tr>
						<th>Quand</th>
						<th>Ip</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{Array(10).fill('').map((n, key) => <tr key={key}>
						<td>Il y a 16 minutes</td>
						<td>75.128.32.290</td>
						<td>-</td>
					</tr>)}
					</tbody>
				</Table>
			</Card>
		</Template>
	)
}
