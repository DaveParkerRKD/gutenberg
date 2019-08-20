/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { defaultColumnsNumber } from './shared';

export default function save( { attributes } ) {
	const { images, columns = defaultColumnsNumber( attributes ), imageCrop, caption, linkTo } = attributes;

	return (
		<figure>
			<ul className={ `blocks-gallery-grid columns-${ columns } ${ imageCrop ? 'is-cropped' : '' }` }>
				{ images.map( ( image ) => {
					let href;

					switch ( linkTo ) {
						case 'media':
							href = image.fullUrl || image.url;
							break;
						case 'attachment':
							href = image.link;
							break;
					}

					const img = (
						<img
							src={ image.url }
							alt={ image.alt }
							data-id={ image.id }
							data-full-url={ image.fullUrl }
							data-link={ image.link }
							className={ image.id ? `wp-image-${ image.id }` : null }
						/>
					);

					return (
						<li key={ image.id || image.url } className="blocks-gallery-item">
							<figure>
								{ href ? <a href={ href }>{ img }</a> : img }
								{ image.caption && image.caption.length > 0 && (
									<RichText.Content tagName="figcaption" value={ image.caption } />
								) }
							</figure>
						</li>
					);
				} ) }
			</ul>
			{ caption && <RichText.Content tagName="figcaption" value={ caption } /> }
		</figure>
	);
}

