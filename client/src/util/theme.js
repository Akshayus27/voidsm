export default {
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#dcd0ff'
      },
      secondary: {
        light: '#73b8ff',
        main: '#2b89f4',
        dark: '#005dc1',
        contrastText: '#000000'
      },
    },
    spreadIt: {
      typography: {
        useNextVariants: true,
      },
      form: {
        textAlign: 'center'
      },
      icon: {
        height: 100,
        marginBottom: '15px'
      },
      title: {
        margin: '20px auto 20px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 30,
        marginBottom: 30,
        position: 'relative'
      },
      progress: {
        position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    }
  }