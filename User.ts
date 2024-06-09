

export class User {
	name: string;
	surName: string;
	age: string;
	gender: string;
	EmailID: string | number;
	password:number| string;
	phone: number;
	balance :number = 0
	
	constructor(
		name: string,
		surName: string,
		age: string,
		gender: string ,
		EmailID: string,
		password: string|number,
		phone: number,
		balance: number,
	
	) {
		this.name = name;
		this.surName = surName;
		this.age = age; 
		this.gender = gender;
		this.EmailID = EmailID;
		this.password = password;
		this.phone = phone
		this.balance = balance;
  }

}
