/*Каждый сотрудник получает зарплату на проделанную сделку.
У каждой сделки есть определенная дата.
Необходимо написать функионал на JS способный сгруппировать сотрудников по определенным датам.
*/


// Пример ответа:
/*
obj = {
	'2020-12-01': {
		111: {
			"salary": 11000
		},
		888: {
			"salary": 1000000
		}
		// ... остальные люди
	}
	// ... остальные дни
}
*/

const employees = [
	{
		id: 111,
		name: 'Azat',
		salary: 11000,
		date: '2020-12-01'
	},
	{
		id: 222,
		name: 'Boris',
		salary: 120000,
		date: '2020-11-01'
	},
	{
		id: 333,
		name: 'Valihan',
		salary: 130000,
		date: '2020-10-01'
	},
	{
		id: 444,
		name: 'Grigoriy',
		salary: 140000,
		date: '2020-09-02'
	},
	{
		id: 555,
		name: 'Diana',
		salary: 150000,
		date: '2020-09-01'
	},
	{
		id: 666,
		name: 'Egor',
		salary: 160000,
		date: '2020-10-01'
	},
	{
		id: 777,
		name: 'Jandos',
		salary: 170000,
		date: '2020-11-01'
	},
	{
		id: 888,
		name: 'Zinaida',
		salary: 1000000,
		date: '2020-12-02'
	}
];

function groupByDate(employees) {
	// helper function
	let defineEmployeeProp = (fillingEmployee, initEmployee) => {
		// this function changes the initial object (the fillingEmployee object)
		fillingEmployee[initEmployee.id] = {
			"salary": initEmployee.salary,
			"name"  : initEmployee.name
		};
	};

	// collection var
	let grouped = {};

	employees.forEach((employee) => {		

		// if there is no field as given date
		if (!grouped[employee.date]) {

			// then create it and fill in with corresponding data
			grouped[employee.date] = {};

			defineEmployeeProp(grouped[employee.date], employee);
			
		} else {
			// else go through all fields of the collection
			Object.keys(grouped).forEach((key) => {

				// and find corresponding field to the given data
				// by checking fields one by one
				let d1 = new Date(key).getTime();
				let d2 = new Date(employee.date).getTime();
				
				if (d1 === d2) {
					// when the corresponding field is found
					// fill it in with the given data
					defineEmployeeProp(grouped[key], employee);
				}
			});
		}
	});

	// finally return the grouped collection
	return grouped;
}

console.log(groupByDate(employees));
