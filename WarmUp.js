// Ćwiczenie 1

const names = ['Kasia', 'Tomek', 'Amanda', 'Maja'];

var femalesNames = [];

for (const name in names) {
 
  if(names[name].charAt(names[name].length-1) === 'a'){
    femalesNames.push(names[name]);
  }
}

console.log(femalesNames);


// Ćwiczenie 2
const employees = {
    john: {
      name: 'John Doe',
      salary: 3000
    },
    amanda: {
      name: 'Amanda Doe',
      salary: 4000
    },
  }

var employeesNames = [];
var employeesSalaries = [];

  for (const emp in employees) {
      var n = employees[emp].name.split(' ');
      employeesNames.push(n[0]);
    
    employeesSalaries.push(employees[emp].salary);
    
  }

console.log(employeesNames);
console.log(employeesSalaries);