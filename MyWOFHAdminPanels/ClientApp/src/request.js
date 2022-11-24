var TestMode = true;
var serverPath = TestMode ? 'https://localhost:7282' : '/MyWofhAdminsPanel';

var useQuery = function (values,controller,method) {
    console.log('token: ', localStorage.getItem('token'))
    return fetch(serverPath + '/api/' + controller +'/'+ method, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(values)
    })
        .then(res => {console.log(res); return res.json()})
};

var POSTFileUploadRequest = (values, controller, method) => {
    return fetch(serverPath + '/'+ controller +'/'+ method, {
        method: 'POST',
        body: values
    })
        .then(res => {
            return res.json()
        });
}

module.exports = {useQuery, POSTFileUploadRequest};