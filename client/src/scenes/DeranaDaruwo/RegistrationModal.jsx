import React, { useState } from 'react';
import { Dialog, Box, DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, Button, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CustomTextField from 'components/CustomTextField';
import { useAddStudentMutation, useGetDeranaDaruwoProgramsQuery } from 'state/api'; // Adjust the import according to your file structure
import CloseIcon from "@mui/icons-material/Close";

const RegistrationModal = ({ openModal, closeModal }) => {
  const theme = useTheme();
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [programID, setProgramID] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContactDetails, setParentContactDetails] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [addStudent] = useAddStudentMutation();
  const { data: programs, isLoading, isError } = useGetDeranaDaruwoProgramsQuery();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [studentIDError, setStudentIDError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [studentAddressError, setStudentAddressError] = useState("");
  const [programIDError, setProgramIDError] = useState("");
  const [parentNameError, setParentNameError] = useState("");
  const [parentContactDetailsError, setParentContactDetailsError] = useState("");
  const [bankAccountDetailsError, setBankAccountDetailsError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");


  const validateStudentID = (id) => {
    if (!id) {
      return "Student ID is required";
    }
    return "";
  }

  const validateStudentName = (name) => {
    if (!name) {
      return "Student Name is required";
    }
    return "";
  }

  const validateStudentAddress = (Address) => {
    if (!Address) {
      return "Student Address is required";
    }
    return "";
  }

  const validateProgramID = (id) => {
    if (!id) {
      return "Program ID is required";
    }
    return "";
  };

  const validateParentName = (name) => {
    if (!name) {
      return "Parent Name is required";
    }
    return "";
  };
  
  const validateParentContactDetails = (Number) => {
    if (!Number) {
      return "Parent Contact Details are required";
    }
    return "";
  };

  const validateBankAccountDetails = (name) => {
    if (!name) {
      return "Bank Account Details are required";
    }
    return "";
  };

  const validateAccountNUmber = (Number) => {
    if (!Number) {
      return "Account Number Detail is required";
    }
    return "";
  };
  

  const handleAddStudent = () => {

    const studentIdValidationError = validateStudentID(studentID);
    const studentNameValidationError = validateStudentName(studentName);
    const studentAddressValidationError = validateStudentAddress(studentAddress);
    const programIDValidationError = validateProgramID(programID);
    const parentNameValidationError = validateParentName(parentName);
    const parentContactDetailsValidationError = validateParentContactDetails(parentContactDetails);
    const bankAccountDetailsValidationError = validateBankAccountDetails(bankAccountDetails);
    const accountNumberValidationError = validateAccountNUmber(accountNumber);

    if(studentIdValidationError||studentNameValidationError||studentAddressValidationError||programIDValidationError||parentNameValidationError||parentContactDetailsValidationError||bankAccountDetailsValidationError||accountNumberValidationError){
      setStudentIDError(studentIdValidationError);
      setStudentNameError(studentNameValidationError);
      setStudentAddressError(studentAddressValidationError);
      setProgramIDError(programIDValidationError);
      setParentNameError(parentNameValidationError);
      setParentContactDetailsError(parentContactDetailsValidationError);
      setBankAccountDetailsError(bankAccountDetailsValidationError);
      setAccountNumberError(accountNumberValidationError);
      return;
    }

    setStudentIDError("");
    setStudentNameError("");
    setStudentAddressError("");
    setProgramIDError("");
    setParentNameError("");
    setParentContactDetailsError("");
    setBankAccountDetailsError("");
    setAccountNumberError("");

    const studentData = {
      studentID,
      studentName,
      studentAddress,
      programID,
      parentName,
      parentContactDetails,
      bankAccountDetails,
      accountNumber,
    };

    addStudent(studentData)
      .then((response) => {
        console.log("Student added successfully: ", response);
        setStudentID("");
        setStudentName("");
        setStudentAddress("");
        setProgramID("");
        setParentName("");
        setParentContactDetails("");
        setBankAccountDetails("");
        setAccountNumber("");
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0", position: 'relative' }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Register Student"}
            <hr style={{ borderColor: "#d63333", }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            {/* Add your icon component here */}
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Student ID"
              variant="outlined"
              fullWidth
              value={studentID}
              onChange={(e) => {
                setStudentID(e.target.value);
                setStudentIDError(validateStudentID(e.target.value));
              }}
              error={!!studentIDError}
            helperText={studentIDError}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Student Name"
              variant="outlined"
              fullWidth
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                setStudentNameError(validateStudentName(e.target.value));
              }}
              error={!!studentNameError}
            helperText={studentNameError}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Student Address"
              variant="outlined"
              fullWidth
              value={studentAddress}
              onChange={(e) => {
                setStudentAddress(e.target.value);
                setStudentAddressError(validateStudentAddress(e.target.value));
              }}
              error={!!studentAddressError}
            helperText={studentAddressError}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Program ID</InputLabel>
              <Select
                value={programID}
                onChange={(e) => {
                  setProgramID(e.target.value);
                  setProgramIDError(validateProgramID(e.target.value));
                }}
                error={!!studentAddressError}
            helperText={studentAddressError}

                label="Select Program ID"
                disabled={isLoading || isError}
              >
                {isLoading && <MenuItem disabled>Loading...</MenuItem>}
                {isError && <MenuItem disabled>Error loading programs</MenuItem>}
                {programs && programs.map((program) => (
                  <MenuItem key={program.programId} value={program.programId}>
                     {program.programId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br /><br />
          <h4>Parent Details</h4>
          <Box sx={{ mt: 4 }}>
            <CustomTextField
              label="Parent Name"
              variant="outlined"
              fullWidth
              value={parentName}
              onChange={(e) => {
                setParentName(e.target.value);
                setParentNameError(validateParentName(e.target.value));
              }}
              error={!!parentNameError}
              helperText={parentNameError}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Parent Contact Details"
              variant="outlined"
              fullWidth
              value={parentContactDetails}
              onChange={(e) => {
                setParentContactDetails(e.target.value);
                setParentContactDetailsError(validateParentContactDetails(e.target.value));
              }}
              error={!!parentContactDetailsError}
              helperText={parentContactDetailsError}
            />
          </Box>
          <h4>Bank Account Details</h4>
          <Box sx={{ mt: 4 }}>
            <CustomTextField
              label="Bank Account Details"
              variant="outlined"
              fullWidth
              value={bankAccountDetails}
              onChange={(e) => {
                setBankAccountDetails(e.target.value);
                setBankAccountDetailsError(validateBankAccountDetails(e.target.value));
              }}
              error={!!bankAccountDetailsError}
              helperText={bankAccountDetailsError}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Account Number"
              variant="outlined"
              fullWidth
              value={accountNumber}
              onChange={(e) => { 
                setAccountNumber(e.target.value);
                setAccountNumberError(validateAccountNUmber(e.target.value));
              }}
              error={!!accountNumberError}
              helperText={accountNumberError}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleAddStudent}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Register Student"}
          </Button>
          <Button onClick={closeModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RegistrationModal;
