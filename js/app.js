// Base Class
class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

// PartTime Class
class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.type = "Part-Time";
        this.calculatePay();
    }

    calculatePay() {
        // Annual pay based on 52 weeks
        this.annualSalary = this.payRate * this.hours * 52;
    }
}


// Manager Class
class Manager extends Employee {
    constructor(name, age, payRate) {
        super(name, age);
        this.payRate = payRate;
        this.hours = 40; // Managers work 40+ hours
        this.type = "Full-Time";
        this.calculatePay();
    }

    calculatePay() {
        // Annual pay based on 52 weeks minus $1000 medical deduction
        this.annualSalary = (this.payRate * 40 * 52) - 1000;
    }
}

// Main Class containing application logic
class Main {
    constructor() {
        this.employees = [];
        this.init();
    }

    init() {
        // Hardcode initial 3 employees
        this.employees.push(new Manager("Bob Smith", 45, 10)); // Ex: $10/hr -> $19,800
        this.employees.push(new PartTime("Jane Doe", 22, 12, 20));
        // Ex: $12/hr, 20 hrs -> $12,480
        this.employees.push(new PartTime("John Adams", 30, 8, 12)); // Ex: $8/hr, 12 hrs -> $4,992

        this.menu();
    }

    displayEmployees() {
        console.clear();
        console.log("Bob's Burger Joint");
        console.log("ID\tName\t\tAge\tSalary\thrs\tpay\tFT/PT");
        console.log("---------------------");

        this.employees.forEach((emp, index) => {
            console.log(
                `${index + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary}\t${emp.hours}\t$${emp.payRate}\t${emp.type}`
            );
        });
        console.log("\n");
    }

    addEmployee() {
        const input = prompt("Enter employee info separated by commas:\nformat: Name, Age, Payrate, Hours Per Week");
        if (!input) return;

        // Split input string into an array
        const data = input.split(",");
        if (data.length < 4) {
            alert("Invalid input format. Please enter Name, Age, PayRate, Hours.");
            return;
        }

        const name = data[0].trim();
        const age = parseInt(data[1].trim());
        const payRate = parseFloat(data[2].trim());
        const hours = parseFloat(data[3].trim());

        // Instantiate depending on hours worked
        if (hours >= 40) {
            this.employees.push(new Manager(name, age, payRate));
        } else {
            this.employees.push(new PartTime(name, age, payRate, hours));
        }

        this.displayEmployees();
    }

    removeEmployee() {
        const input = prompt("Enter the Employee Number OR the Name of the employee to remove:");
        if(!input) return;

        const trimmedInput = input.trim();
         // Check if input is a number or string
        if (!isNaN(trimmedInput)) {
            // Numeric selection (1-indexed)
            const empNum = parseInt(trimmedInput) - 1;
            if (empNum >= 0 && empNum < this.employees.length) {
                this.employees.splice(empNum, 1);
            } else {
                alert("Invalid employee number.");
            }
        } else {
            // String selection using filter()
            const nameToFind = trimmedInput.toLowerCase();
            this.employees = this.employees.filter(
                (emp) => emp.name.toLowerCase() !== nameToFind
            );
        }

        this.displayEmployees();
    }

    editEmployee() {
        const numInput = prompt("Enter the Employee Number of the employee you want to edit:");
        if (!numInput) return;

        const empNum = parseInt(numInput.trim()) - 1;

        if (!isNaN(empNum) && empNum >= 0 && empNum <
    this.employees.length) {
        const newPay = prompt(`Enter new pay rate for ${this.employees[empNum].name}:`);
        if (newPay && !isNaN(newPay)) {
            const emp = this.employees[empNum];
            emp.payRate = parseFloat(newPay.trim());
            emp.calculatePay(); // Recalculate salary with new pay rate
        } else {
            alert("Invalid pay rate entered.");

    }
    } else {
        alert("Invalid employee number.");
    }

    this.displayEmployees();
}

menu() {
    let running = true;
    this.displayEmployees();

    while (running) {
        const choice = prompt(
        "Main Menu:\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees\n5. Exit\n\nEnter choice (1-5):"    
        );

        switch (choice) {
            case "1":
                this.addEmployee();
                break;
            case "2":
                this.removeEmployee();
                break;
            case "3":
                this.editEmployee();
                break;
            case "4":
                this.displayEmployees();
                break;
            case "5":
                running = false;
                console.log("Existing program.");
                break;
                default:
                    alert("Invalid option selected.");
        }
    }
  }
}

// IIFE to instantiate Main without global scope pollution
(function () {
    new Main();
})();