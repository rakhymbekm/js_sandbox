/*

Есть массив файлов.
В файле хранятся данные о названии:
	id и если есть родительский элемент, то еще и родительский элемент.
Необходимо получить объект файлов с путями, 
где ключом является id, а значением путь.

*/

// Например:

/*

arr = [
	{
		id: 1000,
		name: 'Like',
		parent_id: '1003',
		parent_name: 'Root'
	},
	{
		id: 1001,
		name: 'Count',
		parent_id: 1000,
		parent_name: 'Like'
	},
	{
		id: 1002,
		name: 'Subscribe',
		parent_id: '',
		parent_name: ''
	},
	{
		id: 1003,
		name: 'Root',
		parent_id: '',
		parent_name: ''
	}
]

*/

// Результат:
// обратите внимаение на очередность, в начале родитель потом потомки

/*

ans = {
	1000: '/ > Root>Like',
	1001: '/ > Root>Like > Count',
	1002: '/ > Subscribe',
	1003: '/ > Root'
}

*/


const files = [
	{
		id: 1000,
		name: 'Like',
		parent_id: '1003',
		parent_name: 'Root'
	},
	{
		id: 1001,
		name: 'Count',
		parent_id: 1000,
		parent_name: 'Like'
	},
	{
		id: 1002,
		name: 'Subscribe',
		parent_id: '',
		parent_name: ''
	},
	{
		id: 1003,
		name: 'Root',
		parent_id: '',
		parent_name: ''
	}
];

function getPaths(files) {

	const getPath = ( files, file_id) => {
		
		let file;

		if (file_id) {
			// if file_id is given, try to find it from the files list
			file = files.find(f => f.id === Number.parseInt(file_id));
			
			if (!file) {
				// if file with the given id is not found, return empty string
				return '';
			}

		} else {
			// if file_id is not given, save the first file from the files list
			file = files[0];
		}
		
		if (!file.parent_id) {
			// if the considering file doesn't have a parent return its path
			return ' > ' + file.name;
		} else {
			// if the considering file do have a parent return its path followed by the parent's path
			return getPath(files, file.parent_id) + ' > ' + file.name;
		}
	};

	let paths = {};

	files.forEach(file => {
		paths[file.id] = '/' + getPath(files, file.id);
	})

	return paths;
}




console.log(getPaths(files));