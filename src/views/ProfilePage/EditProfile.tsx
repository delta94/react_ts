import VN_vi from '@/assets/vietnam84.png';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {createStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/LockOutlined';
import React, {ComponentType, useContext, useMemo} from 'react';
import {compose} from 'recompose';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import {ThemeCustom} from '@/components/Theme/Theme';
import {ProfileContext, IProfileContext} from '@/store/context/Profile/ProfileContext';
import {Formik, FormikActions} from 'formik';
import {FormikProps} from '@/types/Interface/Formik';
import * as Yup from 'yup';
import moment from 'moment';
import {ProfileInfoReq} from '@/types/Requests/Profile/ProfileReq';
import {axios} from "@/utils/axiosInstance";
import GridContainer from "@/layouts/Grid/Container";


const styles: any = (theme: ThemeCustom) => createStyles({
  boxEditProfile: {
    position: 'relative',
    justifyContent: 'center',
  },
  formControl: {
    minWidth: 120,
    [theme!.breakpoints!.down!('xs')]: {
      minWidth: 0,
    },
    width: '100%',
    textAlign: 'center',
  },
  editRequired: {
    paddingTop: 20,
    margin: '0 auto',
  },
  rowInputs: {
    margin: '5px 0 5px',
    [theme!.breakpoints!.down!('sm')]: {
      width: '100%',
    },
  },
  typoTitle: {
    paddingTop: 20,
    [theme!.breakpoints!.down!('xs')]: {
      display: 'none',
    },
  },
  typoTitleOptional: {
    paddingTop: 20,
  },
  typoBigTitle: {
    padding: '10px 0',
    textTransform: 'uppercase',
    color: '#2196F3',
    [theme!.breakpoints!.down!('sm')]: {
      padding: 2,
    },
    [theme!.breakpoints!.down!('xs')]: {
      fontSize: 20,
    },
  },
  rowButton: {
    padding: '40px 0',
    textAlign: 'right',
  },
  avatarNational: {
    width: 20,
    height: 20,
    verticalAlign: 'sub',
  },
  lightTooltip: {
    background: theme.palette!.common!.white,
    color: theme.palette!.text!.primary,
    boxShadow: theme.shadows![1],
    fontSize: 11,
  },
  boxPadding: {
    padding: 16,
    [theme!.breakpoints!.down!('md')]: {
      padding: 8,
    },
  },
  lockIcon: {
    padding: '25px 0 0 10px',
    [theme!.breakpoints!.down!('md')]: {
      padding: '25px 0 0 0',
    },
  }
});

interface FormikProfileValues {
  gender: number
  phone: string
  name: string
  email: string
  day: string | null
  month: string | null
  year: string | null
  address: string | null
  description: string | null
}

interface IEditProfile {
  classes?: any;
}

const EditProfile: ComponentType<IEditProfile> = (props: IEditProfile) => {
  const {classes} = props;
  const {state} = useContext<IProfileContext>(ProfileContext);
  const {profile} = state;

  let birthday: any = null;
  if (profile == null) {
    birthday = '';
  } else {
    birthday = profile!.birthday;
  }

  const arrMenuItem = (x: number, y: number) => {
    let i = x;
    let arr = [];
    while (i <= y) {
      if (i < 10) {
        arr.push(<MenuItem key = {i} value = {`0${i}`}>{`0${i}`}</MenuItem>);
      } else {
        arr.push(<MenuItem key = {i} value = {`${i}`}>{`${i}`}</MenuItem>);
      }
      i++;
    }
    return arr;
  };

  const formikInit = useMemo<FormikProfileValues>(() => {
    return {
      name: profile ? profile!.name : '',
      gender: profile ? profile!.gender : 0,
      phone: profile ? profile!.phone : '',
      email: profile ? profile!.email : '',
      day: moment(birthday).format('DD'),
      month: moment(birthday).format('MM'),
      year: moment(birthday).format('YYYY'),
      address: profile ? profile!.address : '',
      description: '',
    };
  }, [profile]);

  const validationForm = Yup.object().shape({ // Validate form field
    gender: Yup.number()
      .required('gioi tinh cua ban'),
    name: Yup.string()
      .required('Name is required')
      .min(3, 'ten phai co it nhat 3 ki tu')
      .max(50, 'ten khong qua 225 ki tu'),
    email: Yup.string()
      .required('Email is required')
      .email('Vui lòng nhập đúng định dạng email'),
    phone: Yup.string()
      .required('Phone is required')
      .test('checkNaN', 'Khong duoc nhap chu', value => !isNaN(value))
      .min(10, 'so dien thoai phai co it nhat 10 so')
      .max(11, 'so dien thoai phai khong qua 11 so'),
  });

  return (
    <div className = {classes.boxEditProfile}>
      <Formik
        initialValues = {formikInit}
        validationSchema = {() => validationForm}
        validateOnChange = {false}
        enableReinitialize = {true}
        onSubmit = {(values: FormikProfileValues, actions: FormikActions<FormikProfileValues>) => {
          let day = values.day ? values.day : '';
          let month = values.month ? values.month : '';
          let year = values.year ? values.year : '';

          const data: ProfileInfoReq = {
            uuid: profile!.uuid,
            name: values.name,
            email: values.email,
            gender: values.gender,
            birthday: moment(`${year}` + `${month}` + `${day}`).format('YYYY-MM-DD'),
            address: values.address,
            phone: values.phone,
          };

          axios.put('profile', data)
            .then(res => {
              actions.setSubmitting(false);
            })
            .catch(error => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            handleReset,
          }: FormikProps<FormikProfileValues>) => {
          return (
            <form onSubmit = {handleSubmit}>
              <Paper square className = {classes.boxPadding}>
                <GridContainer xs = {12} sm = {12} md = {11} lg = {11} className = {classes.editRequired}>
                  <Typography variant = 'h5' className = {classes.typoBigTitle}>Required</Typography>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>I
                                                                                                    am </Typography>
                    </Grid>
                    <Grid item xs = {4} sm = {3} md = {2} lg = {2}>
                      <FormControl className = {classes.formControl}>
                        <InputLabel htmlFor = 'Gender'>Gender</InputLabel>
                        <Select
                          value = {values.gender}
                          onChange = {handleChange}
                          name = 'gender'
                          inputProps = {{
                            name: 'gender',
                            id: 'gender-simple',
                          }}
                        >
                          <MenuItem value = {0}>
                            <em>Unknown</em>
                          </MenuItem>
                          <MenuItem value = {1}>Mr</MenuItem>
                          <MenuItem value = {2}>Ms</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs = {8} sm = {5} md = {6} lg = {5}>
                      <FormControl
                        className = {classes.formControl}
                        fullWidth
                        required
                        error = {!!errors.name}
                      >
                        <InputLabel htmlFor = 'name'>Name</InputLabel>
                        <Input
                          value = {values.name}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          name = 'name'
                          inputProps = {{
                            'aria-label': 'Full Name',
                          }}
                        />
                        {touched.name && <FormHelperText>{errors.name}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>
                        Phone Number
                      </Typography>
                    </Grid>
                    <Grid item xs = {4} sm = {3} md = {2} lg = {2}>
                      <FormControl required className = {classes.formControl}>
                        <InputLabel htmlFor = 'arenaCode'>arena code</InputLabel>
                        <Select
                          value = {0}
                          onChange = {handleChange}
                          inputProps = {{
                            name: 'arenaCode',
                            id: 'arena-Code',
                          }}
                        >
                          <MenuItem value = {0}>
                              <span><img alt = 'national' src = {VN_vi}
                                         className = {classes.avatarNational} />&nbsp;</span>
                            <span>+84</span>
                          </MenuItem>
                          <MenuItem value = {1}>+888</MenuItem>
                          <MenuItem value = {2}>+52</MenuItem>
                          <MenuItem value = {3}>+1</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs = {8} sm = {5} md = {6} lg = {5}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <FormControl
                          className = {classes.formControl}
                          aria-describedby = 'phone-helper-text'
                          fullWidth
                          required
                          error = {!!errors.phone}
                        >
                          <InputLabel htmlFor = 'Phone'>Phone</InputLabel>
                          <Input
                            value = {values.phone}
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            name = 'phone'
                            endAdornment = {
                              <InputAdornment position = 'end'>
                                <Lock color = 'error' />
                              </InputAdornment>
                            }
                            inputProps = {{
                              'aria-label': 'Phone',
                            }}
                          />
                          {!!errors.phone ? touched.phone && <FormHelperText>{errors.phone}</FormHelperText> :
                            <FormHelperText id = 'phone-helper-text'>
                              The number for guest contacts, booking requests, reminders, and other notifications.
                            </FormHelperText>
                          }
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>
                        Email Address
                      </Typography>
                    </Grid>
                    <Grid item xs = {12} sm = {8} md = {8} lg = {7}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <FormControl
                          className = {classes.formControl}
                          aria-describedby = 'email-helper-text'
                          fullWidth
                          required
                          error = {!!errors.email}
                        >
                          <InputLabel htmlFor = 'Email'>Email</InputLabel>
                          <Input
                            name = 'email'
                            value = {values.email}
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            endAdornment = {<InputAdornment position = 'end'><Lock
                              color = 'error' /></InputAdornment>}
                            inputProps = {{
                              'aria-label': 'Email',
                            }}
                          />
                          {!!errors.email ? touched.email && <FormHelperText>{errors.email}</FormHelperText> :
                            <FormHelperText id = 'email-helper-text'>We won’t share your private email address with
                                                                     anyone else</FormHelperText>
                          }
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>
                        Date of birth
                      </Typography>
                    </Grid>
                    <Grid item xs = {3} sm = {2} md = {2} lg = {2}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <TextField
                          id = 'standard-select-Day'
                          select
                          label = 'Day'
                          className = {classes.formControl}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          name = 'day'
                          value = {values.day ? values.day : '1'}
                          SelectProps = {{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                        >
                          {arrMenuItem(1, 31)}
                        </TextField>
                      </Tooltip>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3} lg = {2}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <TextField
                          id = 'standard-select-month'
                          select
                          label = 'Month'
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          name = 'month'
                          className = {classes.formControl}
                          value = {values.month ? values.month : '1'}
                          // onChange = {handleChange}
                          SelectProps = {{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                        >
                          {arrMenuItem(1, 12)}
                        </TextField>
                      </Tooltip>
                    </Grid>
                    <Grid item xs = {6} sm = {3} md = {3} lg = {3}>
                      <Grid container direction = 'row' spacing = {8} justify = 'space-between'>
                        <Grid item xs = {10} sm = {10}>
                          <Tooltip title = 'Private' placement = 'right-start'
                                   classes = {{tooltip: classes.lightTooltip}}>
                            <TextField
                              id = 'standard-select-year'
                              select
                              label = 'Year'
                              className = {classes.formControl}
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              name = 'year'
                              value = {values.year ? values.year : '1900'}
                              // onChange = {handleChange}
                              SelectProps = {{
                                MenuProps: {
                                  className: classes.menu,
                                },
                              }}
                            >
                              {arrMenuItem(1900, parseInt(moment().format('YYYY')))}
                            </TextField>
                          </Tooltip>
                        </Grid>
                        <Grid item xs = {2} sm = {2}>
                          <Lock color = 'error' className = {classes.lockIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left'
                                  className = {classes.typoTitle}>Address </Typography>
                    </Grid>
                    <Grid item xs = {12} sm = {8} md = {8} lg = {7}>
                      <FormControl
                        className = {classes.formControl}
                        aria-describedby = 'address-helper-text'
                        fullWidth
                      >
                        <InputLabel htmlFor = 'Address'>Address</InputLabel>
                        <Input
                          name = 'address'
                          value = {values.address ? values.address : ''}
                          onChange = {handleChange}
                          inputProps = {{
                            'aria-label': 'Address',
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>Describe
                                                                                                    Yourself </Typography>
                    </Grid>
                    <Grid item xs = {12} sm = {8} md = {8} lg = {7}>
                      <TextField
                        id = 'desYourSelf'
                        label = 'Help people to get to know you.'
                        fullWidth
                        multiline
                        rowsMax = '4'
                        onChange = {handleChange}
                        margin = 'normal'
                        helperText = 'Please Tell them what it like to have you as a guest or a host, your style of travelling or               hosting...'
                      />
                    </Grid>
                  </Grid>
                </GridContainer>
                <GridContainer xs = {12} sm = {12} md = {11} lg = {11} className = {classes.editRequired}>
                  <Typography variant = 'h5' className = {classes.typoBigTitle}>Optional</Typography>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left'
                                  className = {classes.typoTitleOptional}>School </Typography>
                    </Grid>
                    <Grid item xs = {12} sm = {8} md = {8} lg = {7}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <FormControl
                          className = {classes.formControl}
                          aria-describedby = 'email-helper-text'
                          fullWidth
                        >
                          <Input
                            endAdornment = {<InputAdornment position = 'end'><Lock
                              color = 'error' /></InputAdornment>}
                            inputProps = {{
                              'aria-label': 'Email',
                            }}
                          />
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left'
                                  className = {classes.typoTitleOptional}>Work </Typography>
                    </Grid>
                    <Grid item xs = {12} sm = {8} md = {8} lg = {7}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <FormControl
                          className = {classes.formControl}
                          aria-describedby = 'Work-helper-text'
                          fullWidth
                        >
                          <Input
                            endAdornment = {<InputAdornment position = 'end'><Lock
                              color = 'error' /></InputAdornment>}
                            inputProps = {{
                              'aria-label': 'Work',
                            }}
                          />
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing = {16} direction = 'row' justify = 'center'
                        className = {classes.rowInputs}>
                    <Grid item xs = {12} sm = {3} md = {3} lg = {3}>
                      <Typography variant = 'button' align = 'left' className = {classes.typoTitleOptional}>Emergency
                                                                                                    Contact </Typography>
                    </Grid>
                    <Grid item xs = {12} sm = {8} md = {8} lg = {7}>
                      <Tooltip title = 'Private' placement = 'right-start'
                               classes = {{tooltip: classes.lightTooltip}}>
                        <FormControl
                          className = {classes.formControl}
                          aria-describedby = 'emergencyContact-helper-text'
                          fullWidth
                        >
                          <Input
                            endAdornment = {<InputAdornment position = 'end'><Lock
                              color = 'error' /></InputAdornment>}
                            inputProps = {{
                              'aria-label': 'Emergency Contact',
                            }}
                          />
                          <FormHelperText id = 'emergencyContact-helper-text'>
                            Give our Customer Experience team a trusted
                            contact we can alert in an urgent
                            situation.
                          </FormHelperText>
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </GridContainer>
                <GridContainer xs = {12} sm = {11} md = {10} lg = {9} className = {classes.editRequired}>
                  <Grid container spacing = {0} direction = 'row' justify = 'flex-end' alignItems = 'flex-end'
                        className = {classes.rowButton}>
                    <Grid item xs = {4} sm = {2}>
                      <Button variant = 'contained' size = 'large' onClick = {handleReset}>
                        Reset
                      </Button>
                    </Grid>
                    <Grid item xs = {4} sm = {2}>
                      <Button variant = 'contained' color = 'primary' size = 'large' type = 'submit'
                              disabled = {isSubmitting}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </GridContainer>
              </Paper>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default compose<IEditProfile, any>(
  withStyles(styles),
)(EditProfile);
