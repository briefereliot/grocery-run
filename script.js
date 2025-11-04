class AnimatedChooser {
    constructor(targetElement, choicesArray, typingIntervalms = 50, choosingIntervalms = 5000) {
        this.target = targetElement;
        this.choices = choicesArray;
        this.typeSpeed = typingIntervalms;
        this.chooseSpeed = choosingIntervalms;
        this.choosingID = null;
        this.deleteID = null;
        this.typeID = null;
        this.choice = "";
    }

    startAnimation() {
        this.choosingID = setInterval(this.#animateNewChoice.bind(this), this.chooseSpeed);
        if (this.deleteID !== null) {
            clearInterval(this.deleteID);
            this.deleteID = null;
        }
        if (this.typeID !== null) {
            clearInterval(this.typeID);
            this.typeID = null;
        }
    }

    stopAnimation() {
        this.#stopChoosing();
        this.#stopDeleting();
        this.#stopTyping();
    }

    #stopChoosing() {
        if (this.choosingID !== null) {
            clearInterval(this.choosingID);
            this.choosingID = null;
        }
    }

    #stopDeleting() {
        if (this.deleteID !== null) {
            clearInterval(this.deleteID);
            this.deleteID = null;
        }
    }

    #stopTyping() {
        if (this.typeID !== null) {
            clearInterval(this.typeID);
            this.typeID = null;
        }
    }

    #animateNewChoice() {
        this.choice = this.#getRandomChoice();
        this.#stopDeleting();
        this.#stopTyping();
        this.deleteID = setInterval(this.#animateDelete.bind(this), this.typeSpeed);
    }

    #getRandomChoice() {
        return this.choices[Math.floor(Math.random() * this.choices.length)];
    }

    #animateDelete() {
        console.log("deleting");
        let text = this.target.textContent.trimEnd();
        if (text.length > 1) {
            this.target.textContent = text.slice(0, -1);
        } else {
            this.target.textContent = "|"
            this.#stopDeleting();
            this.#stopTyping();
            setTimeout(() => {
                this.typeID = setInterval(this.#animateType.bind(this), this.typeSpeed);
            }, this.typeSpeed*5);
            
        }
    }

    #animateType() {
        if (this.target.textContent === this.choice) {
            this.#stopTyping();
            this.#stopDeleting();
        }else if (this.choice.startsWith(this.target.textContent)) {
            this.target.textContent = this.target.textContent + this.choice[this.target.textContent.length];
        } else {
            this.target.textContent = this.choice[0];
        }
    }
}


function animateDelete(elem, intervalID) {
    text = elem.textContent.trimEnd();
    if (elem.textContent.length > 1) {
        elem.textContent = text.slice(0, -1);
    } else {
        elem.textContent = "|"
        clearInterval(intervalID);
    }
}

function animateType(elem, text, intervalID) {
    if (elem.textContent === text) {
        clearInterval(intervalID);
    }else if (text.startsWith(elem.textContent)) {
        elem.textContent = elem.textContent + text[elem.textContent.length];
    } else {
        elem.textContent = text[0];
    }
}

function getRandomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function animateNewChoice(elem, choices) {
    const choice = getRandomChoice(choices);
    let deleteID = [];
    deleteID[0] = setInterval(animateDelete, 50, elem, deleteID);
    setTimeout(function() {
        let typeID = [];
        typeID[0] = setInterval(animateType, 50, elem, choice, typeID);
    }, 1000);
}

const expenseExamples = document.querySelector("#expense-examples");
const groupExamples = document.querySelector("#group-examples");

const expenses = ["groceries", "travel costs", "dinner", "drinks", "expenses", "utilities", "gas", "flights", "receipts", "bills", "invoices"];
const groups = ["roomates", "family", "friends", "coworkers", "acquaintances", "siblings", "cousins", "enemys", "partners", "classmates"];


//setInterval(animateNewChoice, 5000, expenseExamples, expenses);
//setInterval(animateNewChoice, 5000, groupExamples, groups);

groupsAnimated = new AnimatedChooser(groupExamples, groups);
choicesAnimated = new AnimatedChooser(expenseExamples, expenses);

groupsAnimated.startAnimation();
choicesAnimated.startAnimation();