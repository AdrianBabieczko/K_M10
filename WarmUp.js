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

// Ćwieczenie 3

const salaries = [2000, 3000, 1500, 6000, 3000];

let sum = 0;
let highestSalary = salaries[0];
let lowestSalary = salaries[0];

for(const salary of salaries) {
  sum += salary;
  if(salary > highestSalary) highestSalary = salary;
  if(salary < lowestSalary) lowestSalary = salary;
}

console.log(sum, highestSalary, lowestSalary);

// Ćwiczenie 4

const persons = {
  john: 2000,
  amanda: 3000,
  thomas: 1500,
  james: 6000,
  claire: 3000
};

let sum = 0;
let max = persons.john;
let min = persons.john;

for (const person in persons){
  console.log(persons[person]);
  
  sum += persons[person];
  if(persons[person] > max){
    max = persons[person];
  }
  
  if(persons[person] < min){
    min = persons[person]
  }
}

console.log(sum, max, min);

// Ćwiczenie 5

const tags = ['news', 'code', 'news', 'sport', 'hot', 'news', 'code'];

let uniqueTags = {};

for(const tag of tags){
 
  if(!uniqueTags[tag]) {
    uniqueTags[tag] = { appearances: 1 };
  }
  else{
    uniqueTags[tag].appearances++;
  } 
}

console.log(JSON.stringify(uniqueTags));
