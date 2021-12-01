import { Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FD7013',
  },
  textAria: {
    marginLeft: theme.spacing(2),
    color: '#FFF',
    textAlign: 'left',
    ' & p': {
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
}));

const graphdata = {
  datasets: [
    {
      data: [75, 20, 5],
      backgroundColor: ['#5CF2E8', '#F0CEA0', 'red'],
      borderColor: 'transparent',
    },
  ],
  labels: ['完了', '進行中', '未完了'],
};
const doughnutOptions = {
  responsive: false,
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  plugins: {
    doughnutlabel: {
      labels: [
        {
          text: 'ITEMS',
          color: '#FFF',
          font: {
            size: 30,
          },
        },
        {
          text: 'TEST',
          color: '#FFF',
        },
      ],
    },
  },
};

// type props = {
//   graphdata: {
//     datasets: {
//       data: number[];
//       backgroundColor: string[];
//     }[];
//     labels: string[];
//   };
//   doughnutOptions: {
//     legend: {
//       display: boolean;
//     };
//     plugins: {
//       doughnutlabel: {
//         labels: (
//           | {
//               text: string;
//               color: string;
//               font: {
//                 size: number;
//               };
//             }
//           | {
//               text: string;
//               color: string;
//               font?: undefined;
//             }
//         )[];
//       };
//     };
//   };
// };

type props = {
  title?: string;
  data: {
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string;
    }[];
    labels: string[];
  };
  rate: string;
  labelList: string[];
};

const DoughnutPlot: FC<props> = ({
  title,
  data = graphdata,
  rate = '',
  labelList = ['完了:75件', '進行中:20件', '拒否:5件'],
}) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <div className={classes.textAria}>
            <h1>{rate}</h1>
            {labelList.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Grid>
        <Grid item xs={6}>
          <Doughnut
            type={Doughnut}
            data={data}
            options={doughnutOptions}
            width={180}
            height={180}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DoughnutPlot;
