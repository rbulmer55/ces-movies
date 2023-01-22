const employee = {
  firstname: "rob",
  surname: "bulmer",
  company: "cef",
};

const { firstname, ...otherEmployeeDetails } = employee;
console.log("employee", employee);
console.log("firstname", firstname);
console.log("other", otherEmployeeDetails);

const newObejct = { ...employee, payrollNumber: "1234" };
console.log("newObejct", newObejct);

const myArray = [1, 2, 3, 4];
const [first, , third] = myArray;
console.log("myArray", myArray);
console.log("third", third);
