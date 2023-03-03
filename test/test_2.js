const expect = require('chai').expect;
const api = require('../apiKuncie/api.js')
const dataTest = require('../data/dataUser.js');

describe('Pengujian API Http method DELETE dengan endpoint {{base_url}}/api/bootcamp/users/{userId}', () => {
    let userId = '';

    before(async () => {
    //TODO: Lakukan Create User
        let bodyData = dataTest.dataUser();

        let response = await api.createUser(bodyData);
        expect(response.status).to.equal(200, "Response status tidak 200, gagal Create User");
        //console.log(response.body.id);
        userId = response.body.id;
    });

    it('1. Test apakah fungsi API Delete User berjalan', async () => {
        //console.log(userId);   
        response = await api.deleteUser(userId);
        expect(response.status).to.equal(200, 'bukan 200');
        });
    it('2. Test apakah fungsi API Delete User berjalan - GET dengan userId', async () => {
        //console.log(userId);   
        response = await api.getSingleUser(userId);
        expect(response.status).to.equal(404, 'Response status tidak 400, User masih dapat ditemukan');
        });
});
