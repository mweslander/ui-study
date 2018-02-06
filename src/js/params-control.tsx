import * as React from 'react'
import * as update from 'immutability-helper'

import {Param, ParamType} from './param'

import ParamRow from './param-row'
import ParamsGroup from './params-group'
import InputNumber from './input-number'
import InputPoint from './input-point'
import InputAngle from './input-angle'
import InputSlider from './input-slider'
import InputScale from './input-scale'

interface Props {
	params: Array<Param>,
	onChange: (params: Array<Param>) => void
}

export default class ParamsControl extends React.Component<Props, {}> {

	constructor(props: Props) {
		super(props)
	}

	handleChangeParam = (index, value) => {
		
		const newParams = update(this.props.params, {
			[index]: {
				value: {$set: value}
			}
		})
		this.props.onChange(newParams)
	}

	render() {

		const params = this.props.params

		const paramsJSX = params.map((param, i) => {
			if (param.type === ParamType.Float) {
				return (
					<ParamRow
						key={param.name}
						label={param.label || param.name}
					>
						<InputNumber
							value={param.value}
							onChange={this.handleChangeParam.bind(this, i)}
							unit={param.unit}
						/>
					</ParamRow>
				)
			} else if (param.type === ParamType.Point) {
				return (
					<ParamRow
						key={param.name}
						label={param.label || param.name}
					>
						<InputPoint
							value={param.value}
							onChange={this.handleChangeParam.bind(this, i)}
							unit={param.unit}
						/>
					</ParamRow>
				)
			} else if (param.type === ParamType.Angle) {
				return (
					<ParamRow
						key={param.name}
						label={param.label || param.name}
					>
						<InputAngle
							value={param.value}
							onChange={this.handleChangeParam.bind(this, i)}
						/>
					</ParamRow>
				)
			} else if (param.type === ParamType.Slider) {
				return (
					<ParamRow
						key={param.name}
						label={param.label || param.name}
					>
						<InputSlider
							value={param.value}
							unit={param.unit}
							min={0}
							max={100}
							onChange={this.handleChangeParam.bind(this, i)}
						/>
					</ParamRow>
				)
			} else if (param.type === ParamType.Scale) {
				return (
					<ParamRow
						key={param.name}
						label={param.label || param.name}
					>
						<InputScale
							value={param.value}
							onChange={this.handleChangeParam.bind(this, i)}
						/>
					</ParamRow>
				)
			} else if (param.type === ParamType.Group) {
				return (
					<ParamsGroup
						key={param.name}
						label={param.label || param.name}
					>
						<ParamsControl
							params={param.value}
							onChange={this.handleChangeParam.bind(this, i)}
						/>
					</ParamsGroup>
				)
			}
		})

		return (
			<ul className='params'>
				{paramsJSX}
			</ul>
		)
		
	}
}