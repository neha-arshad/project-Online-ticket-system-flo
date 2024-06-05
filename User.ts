

export class User {
  public name: string;
	public surName: string;
  public age: string;
  public gender: string;
  public EmailID: string | number;
  public password:number| string;
  public phone: number;
	public balance :number = 0

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

  get _name(): string {
    return this.name;
  }

  get _surName(): string {
    return this.surName
  }

  get _age(): string {
    return this.age;
  }
	get _gender(): string {
		return this.gender;
	}

  get _EmailID(): string | number {
    return this.EmailID;
  }

  get _password(): string|number {
    return this.password;
  }

  get _phone(): number {
    return this.phone;
  }

	get _balance(): number {
		return this.balance;
	}
}
