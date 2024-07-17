import Student from "../models/Student.js";
import mongoose from "mongoose";
// Add a new student
export const addStudent = async (req, res) => {
  try {
      const { studentName, studentAddress, studentID, programID, parentName, parentContactDetails,bankAccountDetails,accountNumber } = req.body;

    // Create a new student instance
    const newStudent = new Student({
      studentName,
      studentAddress,
      studentID,
      programID,
      parentName,
      parentContactDetails,
      bankAccountDetails,
      accountNumber
    });

    // Save the student to the database
    console.log("controll runner");

    const savedStudent = await newStudent.save();
    console.log(savedStudent);
    res.status(201).json(savedStudent); // Respond with the saved student
  } catch (error) {
    console.error("Error adding new student:", error);
    res.status(500).json({ error: "Failed to add new student" });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Fetching all students
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single student by ID
export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id); // Deleting student by ID
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Example server-side updateStudents controller
// export const updateStudents = async (req, res) => {
//   try {
//     const studentID = req.params.id;
//     const updatedStudentData = req.body;
//     console.log(req.body);
//     // Find the student by ID in the database and update its information
//     const updatedStudent = await Student.findByIdAndUpdate(studentID, updatedStudentData, { new: true });

//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json(updatedStudent); // Send back the updated student object
//   } catch (error) {
//     console.error("Error updating student:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




// Example server-side updateStudents controller
export const updateStudents = async (req, res) => {
  try {
    const studentID = req.params.id;

    // Check if studentID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentID)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const updatedStudentData = req.body;
    console.log(req.body);

    // Find the student by ID in the database and update its information
    const updatedStudent = await Student.findByIdAndUpdate(studentID, updatedStudentData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent); // Send back the updated student object
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

