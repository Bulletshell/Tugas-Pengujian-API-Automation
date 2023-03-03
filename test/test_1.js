const expect = require('chai').expect;
const api = require('../apiKuncie/api.js')
const dataTest = require('../data/dataUser.js');

describe('Pengujian API Http method POST dengan endpoint {{base_url}}/api/bootcamp/users', () => {
    describe('Positive Case', () => {
    
        it('1. Test apakah fungsi API Create User berjalan dengan baik', async ()=> {
        //TODO: Buat User baru    
            let bodyData = dataTest.dataUser();
            bodyData.name = 'Random Test';
            //console.log(bodyData);

            let response = await api.createUser(bodyData);
            expect(response.status).to.equal(200, "Response status tidak 200, gagal Create User");

            const idUser = response.body.id;
            //console.log(idUser);
        //TODO: Panggil Get User List
            response = await api.getUserList();
            expect(response.status).to.equal(200, "Response status tidak 200, User tidak ditemukan");
        //TODO: Cek data dari create user muncul di Get User List
            const resultFilter = response.body.data.filter((element) => {
                return element.id === idUser;
            })
            expect(response.body.data).to.deep.include(resultFilter[0]);
            //console.log(resultFilter[0]);
        });
        it("2. Test apakah fungsi API Create User berjalan - Input name", async () => {
            let bodyData = dataTest.dataUser();
            bodyData.name = 'Random Test';
            //console.log(bodyData);

            const response = await api.createUser(bodyData);
            expect(response.status).to.equal(200, "Response status tidak 200, gagal Create User");
            //console.log(response.body);
        });
        it("3. Test apakah fungsi API Create User berjalan - Input phone_number", async () => {
            let bodyData = dataTest.dataUser();
            bodyData.phone_number = '0812345678';
            //console.log(bodyData);

            const response = await api.createUser(bodyData);
            expect(response.status).to.equal(200, "Response status tidak 200, gagal Create User");
        });
        it("4. Test apakah fungsi API Create User berjalan - Input dengan 1 vehicles", async () => {
            let bodyData = dataTest.dataUser();
            bodyData.vehicles = [
                {
                    "name": "GR Yaris",
                    "type": "Toyota"
                }
            ];
            //console.log(bodyData);

            const response = await api.createUser(bodyData);
            expect(response.status).to.equal(200, "Response status tidak 200, gagal Create User");
        });
    });
    describe('Negative Case', () => {
        it("1. Test apakah fungsi API Create User gagal - Semua field kosong", async () => {
            let bodyData = dataTest.dataUser();
            bodyData = '';

            const response = await api.createUser(bodyData);
            //console.log(response.body);
            expect(response.status).to.equal(400, "Response status tidak 400, User berhasil dibuat");
        });
        it("2. Test apakah fungsi API Create User gagal - Input phone_number menggunakan invalid character", async () => {
            let bodyData = dataTest.dataUser();
            bodyData.phone_number = '\u200b !@#$%^&*() abc';

            const response = await api.createUser(bodyData);
            //console.log(response.body);
            expect(response.status).to.equal(400, "Response status tidak 400, phone_number menerima invalid character");
        });
        it("3. Test apakah fungsi API Create User gagal - Input name kosong", async () => {
            let bodyData = dataTest.dataUser();
            bodyData.name = '';

            const response = await api.createUser(bodyData);
            //console.log(response.body);
            expect(response.status).to.equal(400, "Response status tidak 400, name menerima invalid character");
        });
        it("4. Test apakah fungsi API Create User gagal - Input name dengan invalid character", async () => {
            let bodyData = dataTest.dataUser();
            bodyData.name = '漢字 � 🗝️🫡';

            const response = await api.createUser(bodyData);
            //console.log(response.body);
            expect(response.status).to.equal(400, "Response status tidak 400, name menerima invalid character");
        });
    });
});