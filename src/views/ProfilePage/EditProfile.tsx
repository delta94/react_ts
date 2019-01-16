import VN_vi from '@/assets/vietnam84.png';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import {createStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/LockOutlined';
import React, {ComponentType, useContext, useMemo} from 'react';
import {compose} from 'recompose';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import {ThemeCustom} from '@/components/Theme/Theme';
import {ProfileContext, IProfileContext} from '@/store/context/Profile/ProfileContext';
import {Formik, FormikActions} from 'formik';
import {FormikProps} from '@/types/Interface/Formik';

interface FormikProfileValues {
  gender: number
  phone: string
  name: string
}

const styles: any = (theme: ThemeCustom) => createStyles({
  boxEditProfile: {
    position: 'relative',
    justified: 'center',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    textAlign: 'center',
  },
  editRequired: {
    paddingTop: 20,
    width: '90%',
    margin: '0 auto',
  },
  rowInputs: {
    margin: '5px 0 5px',
  },
  typoTitle: {
    paddingTop: 20,
  },
  typoBigTitle: {
    padding: '10px 0',
    textTransform: 'uppercase',
    color: '#2196F3',
  },
  rowButton: {
    padding: '40px 0',
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
});

interface IEditProfile {
  classes?: any;
}

const EditProfile: ComponentType<IEditProfile> = (props: IEditProfile) => {
  const {classes} = props;

  const {state} = useContext<IProfileContext>(ProfileContext);

  const {profile} = state;

  const formikInit = useMemo<FormikProfileValues>(() => {
    return {
      name: profile ? profile!.name : '',
      gender: profile ? profile!.gender : 0,
      phone: profile ? profile!.phone : '',
    };
  }, [profile]);

  return (
    <div className = {classes.boxEditProfile}>
      {profile ? (
        <Formik
          initialValues = {formikInit}
          validateOnChange = {false}
          onSubmit = {(values: FormikProfileValues, actions: FormikActions<FormikProfileValues>) => {

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
            }: FormikProps<FormikProfileValues>) => (
            <Paper square>
              <div className = {classes.editRequired}>
                <Typography variant = 'h5' className = {classes.typoBigTitle}>Required</Typography>

                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>I am </Typography>
                  </Grid>
                  <Grid item xs = {2}>
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
                        <MenuItem value = ''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value = {0}>Mr</MenuItem>
                        <MenuItem value = {1}>Ms</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs = {5}>
                    <TextField
                      required
                      onChange = {handleChange}
                      onBlur = {handleBlur}
                      value = {values.name}
                      id = 'standard-required'
                      label = 'Full Name'
                      name = 'name'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>
                      Phone Number
                    </Typography>
                  </Grid>
                  <Grid item xs = {2}>
                    <FormControl required className = {classes.formControl}>
                      <InputLabel htmlFor = 'Gender'>arena code</InputLabel>
                      <Select
                        value = {1}
                        // onChange = {handleChange}
                        inputProps = {{
                          name: 'gender',
                          id: 'gender-simple',
                        }}
                      >
                        <MenuItem value = {0}>
                          <span><img alt = 'national' src = {VN_vi} className = {classes.avatarNational} /></span>
                          <span>&nbsp;+84</span>
                        </MenuItem>
                        <MenuItem value = {1}>+888</MenuItem>
                        <MenuItem value = {2}>+52</MenuItem>
                        <MenuItem value = {3}>+1</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs = {5}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <FormControl
                        className = {classes.formControl}
                        aria-describedby = 'phone-helper-text'
                        fullWidth
                        required
                      >
                        <InputLabel htmlFor = 'Phone'>Phone</InputLabel>
                        <Input
                          value = {values.phone}
                          onChange = {handleChange}
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
                        <FormHelperText id = 'phone-helper-text'>
                          The number for guest contacts, booking requests, reminders, and other notifications.
                        </FormHelperText>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>
                      Email Address
                    </Typography>
                  </Grid>
                  <Grid item xs = {7}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <FormControl
                        className = {classes.formControl}
                        aria-describedby = 'email-helper-text'
                        fullWidth
                        required
                      >
                        <InputLabel htmlFor = 'Email'>Email</InputLabel>
                        <Input
                          endAdornment = {<InputAdornment position = 'end'><Lock color = 'error' /></InputAdornment>}
                          inputProps = {{
                            'aria-label': 'Email',
                          }}
                        />
                        <FormHelperText id = 'email-helper-text'>We won’t share your private email address with anyone
                                                                 else</FormHelperText>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>
                      Date of birth
                    </Typography>
                  </Grid>
                  <Grid item xs = {2}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <TextField
                        id = 'standard-select-currency'
                        select
                        label = 'Day'
                        className = {classes.formControl}
                        value = {0}
                        SelectProps = {{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                      >
                        <MenuItem value = {0}>1</MenuItem>
                        <MenuItem value = {1}>2</MenuItem>
                        <MenuItem value = {2}>3</MenuItem>
                        <MenuItem value = {3}>4</MenuItem>
                      </TextField>
                    </Tooltip>
                  </Grid>
                  <Grid item xs = {2}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <TextField
                        id = 'standard-select-currency'
                        select
                        label = 'Month'
                        className = {classes.formControl}
                        value = {0}
                        // onChange = {handleChange}
                        SelectProps = {{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                      >
                        <MenuItem value = {0}>January</MenuItem>
                        <MenuItem value = {1}>February</MenuItem>
                        <MenuItem value = {2}>March</MenuItem>
                        <MenuItem value = {3}>April</MenuItem>
                      </TextField>
                    </Tooltip>
                  </Grid>
                  <Grid item xs = {3}>
                    <Grid container direction = 'row' spacing = {8} justify = 'space-between'>
                      <Grid item xs = {10}>
                        <Tooltip title = 'Private' placement = 'right-start'
                                 classes = {{tooltip: classes.lightTooltip}}>
                          <TextField
                            id = 'standard-select-currency'
                            select
                            label = 'Year'
                            className = {classes.formControl}
                            value = {0}
                            // onChange = {handleChange}
                            SelectProps = {{
                              MenuProps: {
                                className: classes.menu,
                              },
                            }}
                          >
                            <MenuItem value = {0}>1999</MenuItem>
                            <MenuItem value = {1}>1998</MenuItem>
                            <MenuItem value = {2}>1997</MenuItem>
                            <MenuItem value = {3}>1996</MenuItem>
                          </TextField>
                        </Tooltip>
                      </Grid>
                      <Grid item xs = {2}>
                        <Lock color = 'error' style = {{padding: '25px 0 0 10px'}} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>Address </Typography>
                  </Grid>
                  <Grid item xs = {7}>
                    <FormControl
                      className = {classes.formControl}
                      aria-describedby = 'address-helper-text'
                      fullWidth
                    >
                      <InputLabel htmlFor = 'Address'>Address</InputLabel>
                      <Input
                        inputProps = {{
                          'aria-label': 'Address',
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>Describe
                                                                                                  Yourself </Typography>
                  </Grid>
                  <Grid item xs = {7}>
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
              </div>

              <div className = {classes.editRequired}>
                <Typography variant = 'h5' className = {classes.typoBigTitle}>Optional</Typography>

                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>School </Typography>
                  </Grid>
                  <Grid item xs = {7}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <FormControl
                        className = {classes.formControl}
                        aria-describedby = 'email-helper-text'
                        fullWidth
                      >
                        <Input
                          endAdornment = {<InputAdornment position = 'end'><Lock color = 'error' /></InputAdornment>}
                          inputProps = {{
                            'aria-label': 'Email',
                          }}
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>Work </Typography>
                  </Grid>
                  <Grid item xs = {7}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <FormControl
                        className = {classes.formControl}
                        aria-describedby = 'Work-helper-text'
                        fullWidth
                      >
                        <Input
                          endAdornment = {<InputAdornment position = 'end'><Lock color = 'error' /></InputAdornment>}
                          inputProps = {{
                            'aria-label': 'Work',
                          }}
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing = {32} direction = 'row' justify = 'center' className = {classes.rowInputs}>
                  <Grid item xs = {3}>
                    <Typography variant = 'button' align = 'left' className = {classes.typoTitle}>Emergency
                                                                                                  Contact </Typography>
                  </Grid>
                  <Grid item xs = {7}>
                    <Tooltip title = 'Private' placement = 'right-start' classes = {{tooltip: classes.lightTooltip}}>
                      <FormControl
                        className = {classes.formControl}
                        aria-describedby = 'emergencyContact-helper-text'
                        fullWidth
                      >
                        <Input
                          endAdornment = {<InputAdornment position = 'end'><Lock color = 'error' /></InputAdornment>}
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
                <Grid container spacing = {0} direction = 'row' justify = 'flex-end' alignItems = 'center'
                      className = {classes.rowButton}>
                  <Grid item xs = {2}>
                    <Button variant = 'contained' size = 'large'>
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs = {2}>
                    <Button variant = 'contained' color = 'primary' size = 'large' type = 'submit'>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          )}
        </Formik>
      ) : ''}
    </div>
  );
};

export default compose<IEditProfile, any>(
  withStyles(styles),
)(EditProfile);


