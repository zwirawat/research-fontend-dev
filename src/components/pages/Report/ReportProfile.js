import { Avatar, Button as MuiButton, Typography } from "@material-ui/core";

import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import * as ResAction from "actions/research.action";
import * as loginAction from "actions/login.action";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

const CenteredContent = styled.div`
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: 30,
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgressWithLabel);

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const ReportProfile = (props) => {
  let id = props.match.params.id;
  const classes = useStyles();
  const [selectItem, setselectItem] = useState(null);
  const [image, _setImage] = useState(null);
  const [selectData, setselectData] = useState(null);
  const inputFileRef = createRef(null);

  React.useEffect(() => {
    getAllResearchByAccountId(id);
    getAllAccountById(id);
  }, []);

  const getAllResearchByAccountId = (id) => {
    ResAction.getAllResearchByAccountId(id).then((res) => {
      setselectItem(res.data);
    });
  };

  const getAllAccountById = (id) => {
    loginAction.getAllAccountById(id).then((res) => {
      setselectData(res.data);
      console.log(res.data);
    });
  };

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  const roles = () => {
    if (selectData.roles[0].name == "ROLE_USER") {
      return selectData ? (
        <Typography variant="h5" gutterBottom>
          ??????????????????????????????
        </Typography>
      ) : null;
    } else {
      return selectData ? (
        <Typography variant="h5" gutterBottom>
          ?????????????????????????????????
        </Typography>
      ) : null;
    }
  };

  return selectData ? (
    <CenteredContent>
      <label htmlFor="avatar-image-upload">
        <IconButton
          onClick={handleClick}
          variant="contained"
          color="primary"
          component="span"
          mb={2}
        >
          <Avatar
            src="/images/example.jpg"
            style={{
              margin: "10px",
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
      </label>
      <Typography variant="h5" gutterBottom>
        {selectData.firstname} {selectData.lastname}
      </Typography>
      <br></br>
      <Typography variant="h5" gutterBottom>
        {roles()}
      </Typography>
      <br></br>

      <Typography variant="h6" display="block" gutterBottom>
        ????????? {selectData.faculty} ???????????? {selectData.branch}
      </Typography>
      <Typography variant="h6" display="block" gutterBottom>
        ????????????????????? {selectData.address}
      </Typography>
      <Typography variant="h6" display="block" gutterBottom>
        ??????????????? {selectData.email}
      </Typography>
      <br></br>
      {selectItem ? (
        <Grid container spacing={4}>
          {selectItem.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottomvariant="h5">
                    ???????????? {card.research}
                  </Typography>
                  <Typography gutterBottomvariant="h5">
                    ????????????????????????????????????????????? {card.weight}
                  </Typography>
                  
                  <Typography variant="h6" display="block">
                    ????????????????????????????????? {card.create_date}
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={card.point}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      props.history.push("/admin/view/" + card.id);
                    }}
                  >
                    ??????????????????????????????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </CenteredContent>
  ) : null;
};

export default ReportProfile;
