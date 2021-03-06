import React from "react";
import * as ResAction from "actions/research.action";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Typography } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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

export default function ReportResearch(props) {
  let id = props.match.params.id;

  const [selectData, setSelectData] = React.useState(null);
  React.useEffect(() => {
    getAllResearch(id);
  }, []);

  const getAllResearch = (id) => {
    ResAction.getAllResearchByAccountId(id).then((res) => {
      setSelectData(res.data);
      console.log(res.data.account);
    });
  };

  const columns = [
    {
      title: "????????????????????????????????????",
      cellStyle: { minWidth: 20 },
      render: (item) => (
        <Typography variant="body1">{item.research}</Typography>
      ),
    },
    {
      title: "??????????????????????????????",
      cellStyle: { minWidth: 100 },
      render: (item) => <Typography variant="body1">{item.eng}</Typography>,
    },
    {
      title: "??????????????????????????????",

      render: (item) => <Typography variant="body1">{item.detail}</Typography>,
    },
    {
      title: "???????????????",
      cellStyle: { minWidth: 100 },
      render: (item) => (
        <BorderLinearProgress variant="determinate" value={item.point} />
      ),
    },
    {
      title: "?????????????????????????????????",
      render: (item) => <Typography>{item.create_date}</Typography>,
    },
  ];

  const actions = [
    {
      icon: () => <VisibilityIcon style={{ color: "#91979c" }} />,
      tooltip: "????????????",
      onClick: (event, rowData) => {
        props.history.push("/admin/view/" + rowData.id);
      },
    },
  ];

  return selectData ? (
    <div>
      <MaterialTable
        columns={columns}
        icons={tableIcons}
        actions={actions}
        data={selectData ? selectData : null}
        options={{ actionsColumnIndex: -1, search: false, showTitle: false }}
        localization={{
          header: {
            actions: "??????????????????????????????",
          },
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}

        
      />
    </div>
  ) : null;
}
