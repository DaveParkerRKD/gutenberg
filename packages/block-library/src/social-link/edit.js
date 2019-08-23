/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { URLInput } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	Button,
	Popover,
} from '@wordpress/components';

/**
 * Internal dependencies
 */

const SocialLinkEdit = ( { attributes, setAttributes, isSelected } ) => {
	const { url, icon } = attributes;
	const [ showURLPopover, setPopover ] = useState( true );
	const classes = classNames( 'wp-social-link', `wp-social-link-${ icon }`, { 'wp-social-link__is-incomplete': ( url ) ? false : true } );
	return (
		<Button
			className={ classes }
			onClick={ () => setPopover( true ) }
		>
			{ isSelected && showURLPopover && (
				<Popover
					onFocusOutside={ () => setPopover( false ) }
					position="bottom center"
				>
					<URLInput
						value={ url }
						onChange={ ( value ) => setAttributes( { url: value } ) }
						disableSuggestions={ true }
					/>
				</Popover>
			) }
		</Button>
	);
};

export default SocialLinkEdit;
