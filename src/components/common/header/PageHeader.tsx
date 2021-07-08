import {
  Card,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';

type PageHeaderProps = {
  icon;
  title;
  subTitle;
};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#393E46',
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2),
    color: '#FFF',
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-h5': {
      fontWeight: 800,
    },
    '& .MuiTypography-subtitle2': {
      fontWeight: 600,
      opacity: '0.7',
    },
  },
  media: {
    height: '4rem',
    width: '4rem',
  },
}));

const PageHeader: FC<PageHeaderProps> = ({
  icon = '',
  title = '',
  subTitle = '',
}) => {
  const classes = useStyle();
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          <CardMedia
            className={classes.media}
            component="img"
            image={`${window.location.origin}/prof.jpeg`}
            title="プロフィール - ヘッダー"
          />
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>

          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
