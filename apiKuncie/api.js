const httpLib = require('supertest');
const apiKuncie = httpLib('https://api.kunciebootcampqa.com/api/bootcamp');

    function getUserList(){
        return apiKuncie
        .get('/users')
        .set('Content-Type', 'application/json');
    }
    function getSingleUser(userId) {
       return apiKuncie
           .get('/detail/users?id=' + userId);
    };
    function createUser(bodyData){
        return apiKuncie
            .post('/users')
            .send(bodyData);
        }
    function deleteUser(userId) {
        return apiKuncie
            .delete('/users/' + userId);
    };
    
    module.exports = {
    getUserList,
    getSingleUser,
    createUser,
    deleteUser,
    };