import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  ExpandMore,
  Facebook,
  GitHub,
  Send,
  Twitter,
  Visibility,
  VisibilityOff,
  AccountCircle,
  Email,
  VpnKey,
} from '@material-ui/icons';
import React, { FC, useEffect } from 'react';
import { Users } from '../../../../entities/Users';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
  },

  userProfileArea: {
    marginTop: '-2.4rem',
  },

  wallPaper: {
    '&:hover': {
      backgroundColor: '#00000013',
    },
  },

  userProfile: {
    flexGrow: 1,
  },

  userProfileUploadButton: {
    position: 'relative',
    top: 'top',
    left: 'left',
  },

  action: {
    flexBasis: 'auto',
    position: 'relative',
    flexgrow: '1',
    flex: '0 1 auto',
    left: '0 !important',
  },

  bold: {
    fontWeight: 600,
  },

  userImage: {
    flexGrow: 1,
  },
  data: {
    backgroundColor: '#f7f7f7',
    padding: '2rem',
  },

  avatar: {
    borderRadius: '50%',
    border: 'solid #fff 5px',
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative',
    height: '120px',
    width: '120px',
    top: '-2rem',
  },

  name: {
    color: '#000',
    fontSize: '1.6rem',
    fontWeight: 600,
  },
  role: {
    color: '#252525',
    fontSize: '1.2rem',
    fontWeight: 600,
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  input: {
    color: '#bf1650',
    fontSize: '1rem',
    fontWeight: 600,
  },
}));

type props = {
  user: Users;
  editUser: (data: FormInputs) => void;
};

type FormInputs = {
  userName: string;
  email: string;
  password: string;
};

const UserSettingViews: FC<props> = ({ user, editUser }) => {
  const classes = useStyles();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      userName: user.userName,
      email: user.email,
    },
  });
  const onSubmit = (data: FormInputs) => {
    editUser(data);
  };

  const [values, setValues] = React.useState({
    password: user.password,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let wallpaperUri;
  let avatarUri;
  useEffect(() => {
    document.getElementById('wallpaper').addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string)
          .replace('data:', '')
          .replace(/^.+,/, '');
        localStorage.setItem('wallpaper', base64String);
        wallpaperUri = `url(data:image/png;base64,${base64String})`;
        document
          .getElementById('mediaWallpaper')
          .setAttribute('src', `data:image/png;base64,${base64String}`);
      };
      if (!file) {
        return;
      }

      reader.readAsDataURL(file);
    });

    document.getElementById('avatar').addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string)
          .replace('data:', '')
          .replace(/^.+,/, '');
        localStorage.setItem('avatar', base64String);
        avatarUri = `url(data:image/png;base64,${base64String})`;
        document;
        document
          .getElementById('mediaAvatar')
          .setAttribute('src', `data:image/png;base64,${base64String}`);
      };
      if (!file) {
        return;
      }

      reader.readAsDataURL(file);
    });
  }, []);

  let wallpaperBase64String;
  let avatarBase64String;
  useEffect(() => {
    wallpaperBase64String = localStorage.getItem('wallpaper');

    if (wallpaperBase64String) {
      document
        .getElementById('mediaWallpaper')
        .setAttribute('src', `data:image/png;base64,${wallpaperBase64String}`);
    }

    avatarBase64String = localStorage.getItem('avatar');

    if (avatarBase64String) {
      document
        .getElementById('mediaAvatar')
        .setAttribute('src', `data:image/png;base64,${avatarBase64String}`);
    }
  }, [wallpaperBase64String, avatarBase64String]);

  const wallpaperInputRef = React.useRef<HTMLInputElement>(null);
  const handleOnWallpaperClick = () => wallpaperInputRef.current.click();
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const handleOnAvatarClick = () => avatarInputRef.current.click();

  return (
    <div className={classes.root}>
      <div className={classes.userImage}>
        <Grid container>
          <Card className={classes.userProfile}>
            <CardActionArea className={classes.wallPaper}>
              <input
                type="file"
                id="wallpaper"
                ref={wallpaperInputRef}
                style={{ display: 'none' }}
              />
              <input
                type="file"
                id="avatar"
                ref={avatarInputRef}
                style={{ display: 'none' }}
              />
              <CardMedia
                id="mediaWallpaper"
                component="img"
                alt="Contemplative Reptile"
                height="250"
                image={wallpaperUri}
                title="Contemplative Reptile"
                onClick={handleOnWallpaperClick}
              />
            </CardActionArea>
            <CardContent className={classes.userProfileArea}>
              <CardHeader
                classes={{
                  title: classes.name,
                  subheader: classes.role,
                  action: classes.action,
                }}
                avatar={
                  <CardMedia
                    id="mediaAvatar"
                    component="img"
                    alt="Contemplative Reptile"
                    image={avatarUri}
                    title="Contemplative Reptile"
                    onClick={handleOnAvatarClick}
                    className={classes.avatar}
                    aria-label="recipe"
                  />
                }
                title={user.userName}
                subheader={user.departmentName}
                action={
                  <CardActions>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                      style={{
                        height: '60px',
                        width: '60px',
                        top: '1rem',
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                    <IconButton
                      style={{
                        height: '60px',
                        width: '60px',
                        top: '1rem',
                      }}
                    >
                      <Twitter></Twitter>
                    </IconButton>
                    <IconButton
                      style={{
                        height: '60px',
                        width: '60px',
                        top: '1rem',
                      }}
                    >
                      <Facebook></Facebook>
                    </IconButton>
                    <IconButton
                      style={{
                        height: '60px',
                        width: '60px',
                        top: '1rem',
                      }}
                    >
                      <GitHub />
                    </IconButton>
                  </CardActions>
                }
              />
              <div
                style={{
                  marginLeft: '2rem',
                  fontSize: '2rem',
                }}
              >
                <Typography
                  variant="body2"
                  component="p"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  年中開発してるマン
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Qiitaアカウント :
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.data}>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  justifyContent={'center'}
                  style={{
                    verticalAlign: 'center',
                  }}
                >
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        alignItems: 'left',
                        justifyContent: 'left',
                      }}
                    >
                      <AccountCircle
                        style={{
                          marginRight: '1rem',
                        }}
                      />
                      ユーザー名
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      type="text"
                      style={{
                        marginBottom: '1rem',
                        width: '70%',
                      }}
                      {...register('userName', {
                        required: '⚠ 必須項目です',

                        maxLength: {
                          value: 20,
                          message: '⚠ 文字数オーバー',
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="userName"
                      render={({ message }) => (
                        <p className={classes.input}>{message}</p>
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>

                <Divider />
              </CardContent>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  justifyContent={'center'}
                  style={{
                    verticalAlign: 'center',
                  }}
                >
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        alignItems: 'left',
                        justifyContent: 'left',
                      }}
                    >
                      <Email
                        style={{
                          marginRight: '1rem',
                        }}
                      />
                      Mail
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...register('email', {
                        maxLength: {
                          value: 30,
                          message: '⚠ 文字数オーバー',
                        },
                        pattern: {
                          value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
                          message: '無効な形式',
                        },
                      })}
                      style={{
                        marginBottom: '1rem',
                        width: '70%',
                      }}
                    />

                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <p className={classes.input}>{message}</p>
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>

                <Divider />
              </CardContent>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  justifyContent={'center'}
                  style={{
                    verticalAlign: 'center',
                  }}
                >
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: 'flex',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        alignItems: 'left',
                        justifyContent: 'left',
                      }}
                    >
                      <VpnKey
                        style={{
                          marginRight: '1rem',
                        }}
                      />
                      New Password
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...register('password', {
                        maxLength: {
                          value: 15,
                          message: '⚠ 文字数オーバー',
                        },

                        minLength: {
                          value: 6,
                          message: '⚠ 7文字以上で入力',
                        },
                      })}
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      style={{
                        marginBottom: '1rem',
                        width: '70%',
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <p className={classes.input}>{message}</p>
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>

                <Divider />
              </CardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  endIcon={<Send />}
                  style={{
                    width: '10rem',
                    color: '#fff',
                    background: '#fe6f13',
                    border: '#fff',
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Collapse>
      </div>
    </div>
  );
};

export default UserSettingViews;
