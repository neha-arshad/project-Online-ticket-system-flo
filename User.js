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
}
