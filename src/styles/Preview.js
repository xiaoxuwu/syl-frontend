import PreviewImage from '../assets/images/preview-bg.svg'

const PreviewStyles = theme => ({
  wrapper: {
    height: 'auto',
    width: '30%',
  },
  preview: {
    display: 'block',
    height: 'auto',
    position: 'relative',
    minHeight: '600px',
  },
  previewTitle: {
    marginTop: theme.spacing.unit * 2,
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '1px',
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    position: 'relative',
  },
  inner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  previewWrap: {
    backgroundImage: `url(${PreviewImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    padding: '100px 25px',
    width: '360px',
    height: '748px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'scale(0.59434) translateX(-50%) translateY(-50%) translate3d(0px, 0px, 0px)',
    transformOrigin: 'top left',
  },
  previewInner: {
    height: '85%',
    marginTop: '15%',
    position: 'relative',
    backgroundColor: '#fff',
    overflowY: 'auto',
  }
});

export default PreviewStyles;
