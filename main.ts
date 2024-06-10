#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { User } from "./User.js";

const sleep = (ms: any = 1000) => new Promise((r) => setTimeout(r, ms));

const animation = chalkAnimation.rainbow("Welcome To Online Ticket system..");
await sleep();
animation.stop();

class SignUp {
static async Signup() {
	const signInData: any = await inquirer.prompt([
		{
			name: "name",
			message: chalk.bold.italic.cyanBright("Enter Your name :"),
			type: "input",
			validate: (input: any) =>
				!(input.trim() === "") || chalk.bold.redBright("Name is required."),
		},
		{
			name: "surName",
			type: "input",
			message: chalk.bold.italic.cyanBright("Enter Your Surname :"),
			validate: (input: any) =>
				!(input.trim() === "") ||
			chalk.bold.redBright("Surname is required."),
		},
		{
			name: "age",
			type: "input",
			message: chalk.bold.italic.cyanBright("Enter Your Age :"),
			validate: (input: any) =>
				!(input.trim() === "") || chalk.bold.redBright("Age is required."),
		},
		{
			name: "gender",
			type: "list",
			message: chalk.bold.italic.cyanBright("Enter Your Gender :"),
			choices: ["Male", "Female", "Other"],
		},
		{
			name: "phone",
			type: "input",
			message: chalk.bold.italic.cyanBright("Enter Your Phone Number :"),
			validate: (input: any) =>
				/^\d{10}$/.test(input) ||
			chalk.bold.redBright("Invalid phone number format:"),
		},
		{
			name: "EmailID",
			message: chalk.bold.italic.cyanBright("Enter Your Email :"),
			type: "input",
			validate: (input: any) =>
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) ||
			chalk.bold.redBright("Invalid email format:"),
		},
		{
			name: "password",
			type: "password",
			message: chalk.bold.italic.cyanBright("Enter Your Password : "),
			validate: (input: any) =>
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input) ||
			chalk.bold.redBright("Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and digit"),
		},
	]);
	
	return new User(
		signInData.name,
		signInData.surName,
		signInData.age,
		signInData.gender,
		signInData.EmailID,
		signInData.password,
		signInData.phone,
		0
	);
  }
	
static async login(savedUsers: User[]) {
	const loginData = await inquirer.prompt([
		{
			name: "EmailID",
			type: "input",
			message: chalk.bold.italic.cyanBright("Enter Your Email :"),
		},
		{
			name: "password",
			message: chalk.bold.italic.cyanBright("Enter Your Password :"),
			type: "password",
		},
	]);
	
const findUser = savedUsers.find((user) =>
	user.EmailID === loginData.EmailID && 
  user.password === loginData.password
);

if (findUser) {
	console.log(chalk.bold.italic.blueBright(`\nWelcome Back: ${findUser.EmailID}! Login Successful✅\n`));
	
	return findUser;
}
 else {
	console.log(chalk.bold.redBright("\n\tLogin failed: ❌Invalid Email ID or Password."));
	return null;
}
}
}

class Admin {
	name: string;
	password: any;
	
	constructor(name: string, password: any) {
		this.name = name;
		this.password = password;
	}
	
static async login() {
	const answers = await inquirer.prompt([
		{
			name: "name",
			message: chalk.bold.italic.cyanBright("Enter Admin Name:"),
			type: "input",
		},
		{
			name: "password",
			message: chalk.bold.italic.cyanBright("Enter Admin Password:"),
			type: "password",
		},
	]);
	
if (answers.name === "Admin" && answers.password === "Admin123") {
	console.log(chalk.bold.italic.magentaBright("\nWelcome Admin ✨✨! Login successful✅."));
				return true;
			}
	 else {
		console.log(chalk.red("Login failed: Invalid Admin Name or Password."));
		return false;
	}
}

static async manageEvents(events: any[]) {
	let manageEvent: boolean = true;
	while (manageEvent) {
		const { choice } = await inquirer.prompt([
			{
				name: "choice",
				message: chalk.bold.italic.cyanBright("Choose an option:\n"),
				type: "list",
				choices: ["Create Event", "Delete Event", "Edit Event", "Exit"],
			},
		]);
		
	switch (choice) {
		case "Create Event":
			await Admin.createEvent(events);
			break;
			
			case "Edit Event":
				await Admin.editEvent(events);
				break;
				
				case "Delete Event":
					await Admin.deleteEvent(events);
					break;
					
					case "Exit":
						manageEvent = false;
						break;
      }

			console.log("\nEvent List:");
			events.forEach((events: any, index: any) => {
				console.log(`${index + 0}...Title${events.title}...Date${events.date}...Time${events.time}...City${events.city}...Tickets${events.tickets}...Amount${events.amount}...`);});
    }
  }

  static async createEvent(events: any[]) {
    const eventDetails = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: chalk.bold.italic.cyan("Enter event title:"),
      },
      {
        name: "date",
        type: "input",
        message: chalk.bold.italic.cyan("Enter event date (YYYY-MM-DD):"),
      },
      {
        name: "time",
        type: "input",
        message: chalk.bold.italic.cyan("Enter event time am / pm:"),
      },
      {
        name: "city",
        type: "input",
        message: chalk.bold.italic.cyan("Enter event city:"),
      },
      {
        name: "tickets",
        type: "number",
        message: chalk.bold.italic.cyan("Enter number of tickets available:"),
      },
			{
				name: "amount",
				type: "number",
				message: chalk.bold.italic.cyan("Enter amount for ticket:"),
			}
    ]);
    const currentDate = new Date();
    const eventDate = new Date(eventDetails.date);
    if (eventDate <= currentDate) {
      console.log("Error: Event date must be in the future.");
      return;
    }

    events.push({
      title: eventDetails.title,
      date: eventDetails.date,
      time: eventDetails.time,
      city: eventDetails.city,
      tickets: eventDetails.tickets,
			amount: eventDetails.amount,
    });
    console.log("\n\tEvent created successfully✅..");
  }

  static async editEvent(events: any[]) {
    const eventIndex = await inquirer.prompt([
			{
      name: "eventIndex",
      type: "list",
      message: chalk.bold.italic.yellow("Select the event you want to edit:"),
			choices: events.map((event, i) => ({
				name: `${event.title}`,
				value: i,
			}))
		}
		]);

    const eventDetails = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: chalk.bold.italic.cyan("Enter new event title:"),
      },
      {
        name: "date",
        type: "input",
        message: chalk.bold.italic.cyan("Enter new event date (YYYY-MM-DD):"),
      },
      {
        name: "time",
        type: "input",
        message: chalk.bold.italic.cyan("Enter new event time am / pm:"),
      },
      {
        name: "city",
        type: "input",
        message: chalk.bold.italic.cyan("Enter new event city:")
      },
      {
        name: "tickets",
        type: "number",
        message: chalk.bold.italic.cyan("Enter new number of tickets available:"),
				
      },
    ]);

    // Validate event date
    const currentDate = new Date();
    const eventDate = new Date(eventDetails.date);
    if (eventDate <= currentDate) {
      console.log(
        chalk.bold.redBright("Error: Event date must be in the future.")
      );
      return;
    }

    events[eventIndex.index] = eventDetails;
    console.log("\tEvent updated successfully✅..");
  }
  static async deleteEvent(events: any[]) {
    const eventIndex = await inquirer.prompt([
			{
      name: "index",
      type: "number",
      message: chalk.bold.italic.yellow("Enter the index of the event you want to delete:"),
			choices: events.map((event, i) => ({
        name: `${event.title}`,
        value: i,
      })),
    
    }]);

    events.splice(eventIndex.index, 1);

    console.log(
      chalk.bold.italic.magentaBright("\tEvent deleted successfully.")
    );
  }

  static async ticketPayment(totalAmount:number) {
    let paymentType = await inquirer.prompt([
      {
        name: "payment",
        type: "list",
        message: chalk.bold.italic.cyan("Select Payment Method\n"),
        choices: ["Bank Transfer 🏦", "Debit Card 💳", "Cash 💵"],
      },
      {
        name: "amount",
        type: "input",
        message: chalk.bold.italic.yellow("Enter the amount to transfer:"),
        validate: function (value: any) {
          const amount = parseFloat(value);
          if (!isNaN(amount) && amount === totalAmount) {
            return true;
          }
          return chalk.bold.redBright(`Please enter a correct amount of $${totalAmount}.`);
        },
      },
    ]);

    console.log(
      `\nYou selected ${paymentType.payment} and transferred ${paymentType.amount}`
    );
  }

  static async purchaseTickets(events: any[]) {
    if (events.length === 0) {
      console.log(chalk.bold.italic.redBright("\n\tNo events available."));
      return;
    }

    const { eventIndex } = await inquirer.prompt([
      {
        name: "eventIndex",
        message: chalk.bold.italic.yellow("Select an event to book:"),
        type: "list",
        choices: events.map((event, index) => ({
          name: `${event.title}  Available Tickets: ${event.tickets}`,
          value: index,
        })),
      },
    ]);

    const selectedEvent = events[eventIndex];

    const { TicketCount } = await inquirer.prompt([
      {
        name: "TicketCount",
        message:chalk.bold.blueBright(`Enter the number of Tickets you want to book for ${selectedEvent.title} Available Tickets: ${selectedEvent.tickets}...:`),
        type: "input",
        validate:  (value: any) => {
          const TicketCount = parseInt(value);
          if (
            !isNaN(TicketCount) &&
            TicketCount > 0 &&
            TicketCount <= selectedEvent.tickets
          ) {
            return true;
          }
          return `Please enter a valid number of seats (1-${selectedEvent.tickets}).`;
        },
      },
    ]);

    if (TicketCount > selectedEvent.tickets) {
      console.log(chalk.bold.italic.redBright("Not enough Tickets available."));
      return;
    }

    selectedEvent.tickets -= TicketCount;
		const totalAmount = TicketCount * selectedEvent.amount;

    const { confirmBooking } = await inquirer.prompt([
      {
        name: "confirmBooking",
        message: chalk.bold.italic.cyanBright(`\nThe total amount for ${TicketCount} tickets is $${totalAmount}. Do you want to proceed with the booking?`),
        type: "confirm",
      },
    ]);

    if (confirmBooking) {
      await Admin.ticketPayment(totalAmount);
      console.log(
        chalk.bold.italic.blueBright("\nYour Ticket booking is completed"));
      console.log(chalk.bold.italic.magentaBright("\n\tYou will receive your ticket via email OR sms"));
    }
  }
}

async function main(){
  let users: User[] = [];
  let events: any[] = [];

  let logOut: boolean = false;

  while (!logOut) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        message: chalk.bold.italic.cyanBright(
          "Would you like to Signup, Login, or Exit?\n"
        ),
        type: "list",
        choices: ["Signup", "User Login", "Admin Login", "LogOut"],
      },
    ]);

    switch (action) {
      case "Signup":
        const newUser = await SignUp.Signup();
        users.push(newUser);
        console.log(chalk.bold.italic.magentaBright("\nSignup successful!✅"));
        break;

      case "User Login":
        if (users.length > 0) {
          console.log(chalk.bold.italic.magentaBright("\n\t✨✨ WELCOME USER ✨✨\n"));
          const user = await SignUp.login(users);

          if (user) {
            await Admin.purchaseTickets(events);
          }
        } else {
          console.log(
            chalk.bold.italic.redBright(
              "\nNo users available. Please signup first."
            )
          );
        }
        break;

      case "Admin Login":
        console.log(chalk.bold.italic.magentaBright("\n\t✨✨ WELCOME ADMIN ✨✨\n"));

        const adminLoggedIn = await Admin.login();
        if (adminLoggedIn) {
          await Admin.manageEvents(events);
        }
        break;

      case "LogOut":
        logOut = true;
        break;
    }
  }
}
main();
