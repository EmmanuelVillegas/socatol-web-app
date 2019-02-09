import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Tabs, Tab, withStyles } from '@material-ui/core';

// Components
import styles from './styles';

class HeaderTabs extends PureComponent {
	render() {
		const { value, onChange, options } = this.props;
		return (
			<Tabs value={value} onChange={onChange}>
				{options.map(item => (
					<Tab key={item.name} label={item.name} disableRipple />
				))}
			</Tabs>
		);
	}
}

HeaderTabs.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(HeaderTabs);
