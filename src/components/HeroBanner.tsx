import { CSSProperties, JSX } from 'react';
import {
  EditMode,
  Field,
  ImageField,
  NextImage as JssImage,
  Link as JssLink,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField & { metadata?: { [key: string]: unknown } };
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props?.params?.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const id = props.fields?.TargetUrl?.value?.anchor;
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;
  const isMetadataMode = sitecoreContext?.editMode === EditMode.Metadata;

  // Add safety check for fields and Image
  if (!props.fields || !props.fields.Image) {
    return <ImageDefault {...props} />;
  }

  const classHeroBannerEmpty =
    isPageEditing && props.fields?.Image?.value?.class === 'scEmptyImage'
      ? 'hero-banner-empty'
      : '';
  const backgroundStyle = (props?.fields?.Image?.value?.src && {
    backgroundImage: `url('${props.fields.Image.value.src}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '500px',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }) as CSSProperties;

  const modifyImageProps = !isMetadataMode
    ? {
        ...props.fields.Image,
        editable: props?.fields?.Image?.editable
          ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="100%"')
          .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="100%"'),
      }
    : {
        ...props.fields.Image,
        value: {
          ...props.fields.Image.value,
          style: { width: '100%', height: '100%' },
        },
      };

  return (
    <div
      className={`component hero-banner ${props?.params?.styles} ${classHeroBannerEmpty}`}
      id={id ? id : undefined}
    >
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {sitecoreContext.pageEditing ? <JssImage field={modifyImageProps} /> : ''}

        {/* Content overlay with caption and CTA button */}
        <div
          className="hero-banner-content-overlay"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 2,
            maxWidth: '600px',
            width: '90%',
          }}
        >
          {/* Caption overlay */}
          {props.fields.ImageCaption?.value && (
            <div
              className="hero-banner-caption-wrapper"
              style={{
                marginBottom: '30px',
              }}
            >
              <Text
                tag="h1"
                className="hero-banner-caption"
                field={props.fields.ImageCaption}
                style={{
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  margin: '0',
                  lineHeight: '1.2',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  marginBottom: '0',
                }}
              />
            </div>
          )}

          {/* CTA Button below caption */}
          {props.fields.TargetUrl?.value?.href && (
            <div className="hero-banner-cta-wrapper">
              <JssLink
                field={props.fields.TargetUrl}
                className="hero-banner-cta-button"
                style={{
                  display: 'inline-block',
                  padding: '18px 36px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid #007bff',
                  boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
                }}
              >
                {props.fields.TargetUrl.value.text || 'Learn More'}
              </JssLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields && props.fields.Image) {
    const Image = () => <JssImage field={props.fields.Image} />;
    const id = props.fields.TargetUrl?.value?.anchor;

    return (
      <div className={`component image ${props?.params?.styles}`} id={id ? id : undefined}>
        <div
          className="component-content"
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
          }}
        >
          {sitecoreContext.pageState === 'edit' || !props.fields.TargetUrl?.value?.href ? (
            <div style={{ position: 'relative' }}>
              <Image />
              {/* Caption and CTA overlay */}
              <div
                className="image-content-overlay"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  zIndex: 2,
                  maxWidth: '80%',
                  width: '100%',
                }}
              >
                {/* Caption overlay */}
                {props.fields.ImageCaption?.value && (
                  <div
                    className="image-caption-wrapper"
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                    <Text
                      tag="h2"
                      className="image-caption field-imagecaption"
                      field={props.fields.ImageCaption}
                      style={{
                        color: 'white',
                        fontSize: '2.2rem',
                        fontWeight: 'bold',
                        margin: '0',
                        lineHeight: '1.2',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      }}
                    />
                  </div>
                )}

                {/* CTA Button just below caption */}
                {props.fields.TargetUrl?.value?.href && (
                  <div className="image-cta-wrapper">
                    <JssLink
                      field={props.fields.TargetUrl}
                      className="image-cta-button"
                      style={{
                        display: 'inline-block',
                        padding: '15px 30px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        border: '2px solid #007bff',
                        boxShadow: '0 3px 10px rgba(0,123,255,0.3)',
                      }}
                    >
                      {props.fields.TargetUrl.value.text || 'Learn More'}
                    </JssLink>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <JssLink field={props.fields.TargetUrl}>
                <Image />
              </JssLink>
              {/* Caption and CTA overlay for linked image */}
              <div
                className="image-content-overlay"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  zIndex: 2,
                  maxWidth: '80%',
                  width: '100%',
                }}
              >
                {props.fields.ImageCaption?.value && (
                  <div
                    className="image-caption-wrapper"
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                    <Text
                      tag="h2"
                      className="image-caption field-imagecaption"
                      field={props.fields.ImageCaption}
                      style={{
                        color: 'white',
                        fontSize: '2.2rem',
                        fontWeight: 'bold',
                        margin: '0',
                        lineHeight: '1.2',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      }}
                    />
                  </div>
                )}

                {/* CTA Button below caption */}
                {props.fields.TargetUrl?.value?.href && (
                  <div className="image-cta-wrapper">
                    <JssLink
                      field={props.fields.TargetUrl}
                      className="image-cta-button"
                      style={{
                        display: 'inline-block',
                        padding: '15px 30px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        border: '2px solid #007bff',
                        boxShadow: '0 3px 10px rgba(0,123,255,0.3)',
                        pointerEvents: 'auto',
                      }}
                    >
                      {props.fields.TargetUrl.value.text || 'Learn More'}
                    </JssLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
