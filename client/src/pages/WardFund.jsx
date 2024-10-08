import { useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
//
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/global/Navbar";

function WardFund() {
  const { id } = useParams();
  const [currentBill, setCurrentBill] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [_class, setClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [feeId, setFeeId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  //   useEffect(() => {
  //     showCurrentBill();
  //   }, []);

  return (
    <>
      <Navbar />
      <section>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: 2,
            }}
          >
            <Box
              sx={{
                padding: "20px",
                margin: "20px 0px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "darkblue", fontWeight: "bolder" }}
              >
                Ward Fund
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Chip
                avatar={<Avatar alt="" src={image} />}
                label={name}
                variant="outlined"
              />
              <Chip label={`ID: ${studentId}`} variant="outlined" />
              <Chip label={`Class: ${_class}`} variant="outlined" />
            </Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 0",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEdit(false);
                  setDesc("");
                  setAmount("");
                  setOpen(true);
                }}
              >
                Add
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sn</StyledTableCell>
                    <StyledTableCell>Staff</StyledTableCell>
                    <StyledTableCell>Patient Name</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {funds.map((fund, i) => {
                    return (
                      <StyledTableRow key={i}>
                        <StyledTableCell>{i + 1}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {fund.staff}
                        </StyledTableCell>
                        <StyledTableCell>{fund.patient}</StyledTableCell>
                        <StyledTableCell>{fund.amount}</StyledTableCell>
                        <StyledTableCell>{fund.date}</StyledTableCell>
                        <StyledTableCell>{fund.status}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setEdit(true);
                                setOpen(true);
                                setAmount(fund.amount);
                                setDesc(fund.desc);
                                setEditId(fund._id);
                              }}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              disabled={loading}
                              onClick={() => handleDeletefund(fund._id)}
                              color="secondary"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </section>
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                sx={{
                  textAlign: "center",
                  borderBottom: "4px solid darkblue",
                  fontSize: 25,
                  fontWeight: "bolder",
                  color: "darkblue",
                }}
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                {edit ? "Edit Fund" : "Add Fund"}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setDesc(e.target.value)}
                id="full-name"
                label="Patient Name"
                value={desc}
                name="full-name"
                autoComplete="full-name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                label="Amount"
                name="amount"
                autoComplete="amount"
              />
              <Stack sx={{ margin: "20px 0 0 0" }}>
                <Button
                  variant="contained"
                  disabled={loading}
                //   onClick={() => {
                //     edit ? handleEditBill() : handleAddBill();
                //   }}
                >
                  {loading
                    ? "Processing..."
                    : edit
                    ? "Save Changes"
                    : "Add Fund"}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

export default WardFund;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const funds = [
  {
    id: 1,
    staff: "Isaac Appiatu",
    patient: "Seth Nkansah",
    amount: 20,
    date: "Oct 4th, 2024",
    status: "Pending",
  },
  {
    id: 1,
    staff: "Isaac Appiatu",
    patient: "Seth Nkansah",
    amount: 20,
    date: "Oct 4th, 2024",
    status: "Pending",
  },
  {
    id: 1,
    staff: "Isaac Appiatu",
    patient: "Seth Nkansah",
    amount: 20,
    date: "Oct 4th, 2024",
    status: "Pending",
  },
  {
    id: 1,
    staff: "Isaac Appiatu",
    patient: "Seth Nkansah",
    amount: 20,
    date: "Oct 4th, 2024",
    status: "Pending",
  },
  {
    id: 1,
    staff: "Isaac Appiatu",
    patient: "Seth Nkansah",
    amount: 20,
    date: "Oct 4th, 2024",
    status: "Pending",
  },
];
