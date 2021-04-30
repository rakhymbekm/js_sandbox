// I didn't use promises, used setTimeout to imitate waiting process

function getReq(url) {
	let xhr = new XMLHttpRequest(url);
	let data = {};
  
	xhr.addEventListener('readystatechange', (url) => {
    
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('success');
        data = JSON.parse(xhr.responseText);
			} else {
				console.log('fail: ', xhr.responseText);
			}
		}

	}, false);
  
	xhr.open('GET', url);
	xhr.send();
  
	return { 
		getData() {
			return data;
		}
	};
}

let res = getReq('https://jsonplaceholder.typicode.com/posts/1');

setTimeout(() => console.log('some times later', res.getData()), 5000);


function postReq1(url, params) {
	let xhr = new XMLHttpRequest();
	let data = {};
  
	if (typeof params !== "string") {
		params = JSON.stringify(params);
	}
  
	xhr.addEventListener('readystatechange', (url) => {
    
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				console.log('success');
        data = JSON.parse(xhr.responseText);
			} else {
				console.log('fail: ', xhr.responseText);
			}
		}

	}, false);
  
	xhr.open('POST', url);
  	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(params);
  
	return { 
		getData() {
			return data;
		}
	};
}

let res = postReq1('https://jsonplaceholder.typicode.com/posts', {
	title: 'test',
	body: 'bar',
	userId: 1,
});

setTimeout(() => console.log('some times later', res.getData()), 5000);


function postReq2(url, params) {
	let xhr = new XMLHttpRequest(url);
	let data = {};
  
	xhr.addEventListener('readystatechange', (url) => {
    
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				console.log('success');
        data = JSON.parse(xhr.responseText);
			} else {
				console.log('fail: ', xhr.responseText);
			}
		}

	}, false);
  
	xhr.open('POST', url, true);
  	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(params);
  
	return { 
		getData() {
			return data;
		}
	};
}

let res = postReq2('https://jsonplaceholder.typicode.com/posts', 'title=foo&body=bar&userId=1');
setTimeout(() => console.log('some times later', res.getData()), 5000);

function postReq3(url, sendingData) {
	const xhr = new XMLHttpRequest(url);
  	const fdata = new FormData();

	let data = {};
  
	xhr.addEventListener('readystatechange', (url) => {
    
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				console.log('success');
        data = JSON.parse(xhr.responseText);
			} else {
				console.log('fail: ', xhr.responseText);
			}
		}

	}, false);
  
	for (name in sendingData) {
		fdata.append(name, sendingData[name]);
	}
  
	xhr.open('POST', url, true);
  	xhr.setRequestHeader('Content-type', 'multipart/form-data');
	xhr.send(fdata);
  
	return { 
		getData() {
			return data;
		}
	};
}

let res = postReq3('https://jsonplaceholder.typicode.com/posts', {
	title: 'test',
	body: 'bar',
	userId: 1,
});

setTimeout(() => console.log('some times later', res.getData()), 5000);

function workWithData(res, callback){
  
  let data = {};

  const intervalId = setInterval(()=>{
  	data = res.getData();
  	
  	if (Object.keys(data).length>0) {
  		stopInterval();
  		callback(data);
  	}

  }, 10);

  const stopInterval = () => {
  	clearInterval(intervalId);
  };  
}

workWithData(res, (data) => {
	console.log(data);
});