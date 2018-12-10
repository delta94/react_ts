import {ThemeCustom} from '@/components/Theme/Theme';
import * as loginType from '@/store/actions/actionTypes';
import * as animation from '@/store/actions/animationTypes';
import {ReducersList} from '@/store/reducers';
import {LoginInfoAction, LoginInfoState} from '@/store/reducers/loginInfo';
import {AnimationAction, AnimationState} from '@/store/reducers/Visual/global-animation';
import {FormikProps} from '@/types/Interface/Formik';
import {LoginRequest} from '@/types/Requests/Account/AccountRequests';
import {LoginRes} from '@/types/Requests/Account/AccountResponses';
import {axios} from '@/utils/axiosInstance';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {withStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import EmailIcon from '@material-ui/icons/Email';
import Info from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InvisibilityIcon from '@material-ui/icons/VisibilityOff';
import {withFormik, FormikBag} from 'formik';
import React, {useState, FunctionComponent} from 'react';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
import borderC from '@/styles/Styling/border.module.scss'

interface IPasswordInput {
  isShown: boolean;

  handle(status: boolean): void;
}

interface IFormikValues {
  account_email: string;
  account_password: string;
  isRemember: boolean;
  loginIncorrect?: boolean;
}

interface DispatchLocal {
  handleLoginButton(status: boolean): any
  saveDraftLoginInfo(value: any): any
}


interface IProps extends FormikProps<IFormikValues>, DispatchLocal {
  classes: any;
  cookies: Cookies;
  animation: AnimationState;
  loginInfo: LoginInfoState;
}


const styles: any = (theme: ThemeCustom) => createStyles({
  paper: {
    width: theme!.spacing!.unit! * 50,
    backgroundColor: theme!.palette!.background!.paper,
    boxShadow: theme!.shadows![5],
    padding: theme!.spacing!.unit! * 2,
  },
  modal: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8%',
    width: '40%',
    padding: 40,
  },
  spaceTop: {
    marginTop: 10,
  },
  spinner: {
    width: '25px !important',
    height: '25px !important',
  },
  errorBag: {
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
  },

});

const EmailInputAdornment: FunctionComponent<{}> = props => {
  return (
    <InputAdornment position = 'end'>
      <IconButton disabled>
        <EmailIcon />
      </IconButton>
    </InputAdornment>
  );
};

const PasswordInputAdornment: FunctionComponent<IPasswordInput> = props => {
  return (
    <InputAdornment position = 'end'>
      <IconButton onClick = {() => props.handle(!props.isShown)}>
        {!props.isShown ? <VisibilityIcon /> : <InvisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );
};

const LoginForm: FunctionComponent<IProps> = props => {
  const {
          classes,
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        } = props;

  const [showPassWord, setShowPassWord] = useState<boolean>(false);

  const handleModalClose = () => {
    props.handleLoginButton(false);
    // Save data if modal close for some reason
    let object: LoginInfoState = {
      email: values.account_email,
      isRemember: values.isRemember,
    };
    props.saveDraftLoginInfo(object);
  };

  return (
    <div>
      <Modal
        open = {props.animation.isLoginFormOpen}
        onClose = {handleModalClose}
        disableAutoFocus
      >
        <Zoom in = {props.animation.isLoginFormOpen}>
          <Paper className = {classes.modal} elevation = {10} square>
            <Typography variant = 'h5'>
              Log in to continue
            </Typography>
            {/*Error if information incorrect*/}
            {errors.loginIncorrect &&
             <Paper className = {classes.errorBag} elevation = {1} square>
               <Grid container spacing = {16} alignContent = 'center' alignItems = 'center'>
                 <Grid item xs = {2}>
                   <Info color = 'error' />
                 </Grid>
                 <Grid item xs = {10}>
                   {errors.loginIncorrect}
                 </Grid>
               </Grid>
             </Paper>
            }
            <form onSubmit = {handleSubmit}>
              <FormControl fullWidth className = {classes.spaceTop}
                           error = {!!(errors.account_email && touched.account_email)}>
                <InputLabel htmlFor = 'email'>Email</InputLabel>
                <Input
                  id = 'email'
                  name = 'account_email'
                  value = {values.account_email}
                  onChange = {handleChange}
                  onBlur = {handleBlur}
                  endAdornment = {<EmailInputAdornment />}
                />
                <FormHelperText>{touched.account_email ? errors.account_email : ''}</FormHelperText>
              </FormControl>
              <FormControl fullWidth className = {classes.spaceTop}
                           error = {!!(errors.account_password && touched.account_password)}>
                <InputLabel htmlFor = 'password'>Password</InputLabel>
                <Input
                  type = {showPassWord ? 'text' : 'password'}
                  name = 'account_password'
                  id = 'password'
                  value = {values.account_password}
                  onChange = {handleChange}
                  onBlur = {handleBlur}
                  endAdornment = {<PasswordInputAdornment isShown = {showPassWord} handle = {setShowPassWord} />}
                />
                <FormHelperText>{touched.account_password ? errors.account_password : ''}</FormHelperText>
              </FormControl>
              <FormControl className = {classes.spaceTop}>
                <FormControlLabel
                  control = {
                    <Checkbox
                      id = 'rememberMe'
                      name = 'isRemember'
                      color = 'primary'
                      checked = {values.isRemember}
                      onChange = {handleChange}
                    />
                  }
                  label = 'Remember me' />
              </FormControl>
              <div>
                <Button
                  variant = 'contained'
                  color = 'primary'
                  type = 'submit'
                  disabled = {isSubmitting}
                  fullWidth>{isSubmitting ? <CircularProgress className = {classes.spinner} /> : 'Log in'}</Button>
              </div>
            </form>
            <h5 className = {borderC['text-line-center']}>or login with</h5>
          </Paper>
        </Zoom>
      </Modal>
    </div>
  );
};

const FormValidationSchema = Yup.object().shape({
  account_email: Yup.string()
    .required('Please fill your email')
    .email('Email address not valid'),
  account_password: Yup.string()
    .required('Please enter your password')
    .min(5, 'Password must more than 5 characters'),
});

const FormMilk = withFormik({
  mapPropsToValues: (props): IFormikValues => {
    return {
      account_email: props.loginInfo.email,
      account_password: '',
      isRemember: props.loginInfo.isRemember,
    };
  },

  handleSubmit: (values: IFormikValues, bags: FormikBag<IProps, IFormikValues>) => {
    const {cookies} = bags.props;

    const data: LoginRequest = {
      username: values.account_email,
      password: values.account_password,
    };

    axios.post('login', data).then(res => {
      const data: LoginRes = res.data;
      let cookieTime       = 1800;
      if (values.isRemember) {
        cookieTime = data.expires_in;
        cookies.set('token_expires', true, {
          path: '/',
          maxAge: cookieTime,
        });
      }

      cookies.set('_token', data.access_token, {
        path: '/',
        maxAge: cookieTime,
      });
      bags.setSubmitting(false);
      bags.props.handleLoginButton(false);
    }).catch(e => {
      let res    = e.response.data;
      let errors = res.data.errors;
      bags.setFieldError('loginIncorrect', errors[0]);
      bags.setSubmitting(false);
    });
  },

  validationSchema: () => FormValidationSchema,
  validateOnChange: false,
});

const mapStateToProps = (state: ReducersList) => {
  return {
    animation: state.v_animate,
    loginInfo: state.loginInfo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<LoginInfoAction | AnimationAction>) => {
  return {
    handleLoginButton: (status: boolean) => dispatch({
      type: animation.LOGIN_BUTTON_CLICK,
      status: status,
    }),
    saveDraftLoginInfo: (obj: any) => dispatch({
      type: loginType.SAVE_DRAFTED_INFO,
      value: obj,
    }),
  } as DispatchLocal;
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withCookies,
  FormMilk,
  withStyles(styles),
)(LoginForm);


