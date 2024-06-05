export class User {
    name;
    surName;
    age;
    gender;
    EmailID;
    password;
    phone;
    balance = 0;
    constructor(name, surName, age, gender, EmailID, password, phone, balance) {
        this.name = name;
        this.surName = surName;
        this.age = age;
        this.gender = gender;
        this.EmailID = EmailID;
        this.password = password;
        this.phone = phone;
        this.balance = balance;
    }
    get _name() {
        return this.name;
    }
    get _surName() {
        return this.surName;
    }
    get _age() {
        return this.age;
    }
    get _gender() {
        return this.gender;
    }
    get _EmailID() {
        return this.EmailID;
    }
    get _password() {
        return this.password;
    }
    get _phone() {
        return this.phone;
    }
    get _balance() {
        return this.balance;
    }
}
