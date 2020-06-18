const calculator = (function() {
	add = (a,b) => a + b;
	subtract = (a,b) => a-b;
	multiply = (a,b) => a*b;
	divide = (a,b) => a/b;
	return{
		add,
		subtract,
		multiply,
		divide
	};
})();

const render = (function() {
	let _currentDisplay = document.querySelector('.currentScreen');
	let _historyDisplay = document.querySelector('.historyScreen');

	setDisplay = (value) => {
		if(!(value == '.' && _currentDisplay.textContent.includes("."))) {
			_currentDisplay.textContent += value;
		}
	}

	clearDisplay = (e) => {
		_currentDisplay.textContent = '';
		_historyDisplay.textContent = '';
	}

	deleteOne = (e) => _currentDisplay.textContent = _currentDisplay.textContent.substr(0, _currentDisplay.textContent.length - 1);

	operatorPressed = (operator) => {
		if(!(_historyDisplay.textContent == '' && _currentDisplay.textContent == '')){
			switch(_historyDisplay.textContent.charAt(_historyDisplay.textContent.length - 1)) {
				case "+":
					_historyDisplay.textContent = calculator.add(parseFloat(_historyDisplay.textContent), parseFloat(_currentDisplay.textContent)) + operator;
					break;

				case "-":
					_historyDisplay.textContent = calculator.subtract(parseFloat(_historyDisplay.textContent), parseFloat(_currentDisplay.textContent)) + operator;
					break;

				case "*":
					_historyDisplay.textContent = calculator.multiply(parseFloat(_historyDisplay.textContent), parseFloat(_currentDisplay.textContent)) + operator;
					break;

				case "/":
					_historyDisplay.textContent = calculator.divide(parseFloat(_historyDisplay.textContent), parseFloat(_currentDisplay.textContent)) + operator;
					break;

				case "":
					_historyDisplay.textContent = _currentDisplay.textContent + operator;
					break;
			}
		}
		_currentDisplay.textContent = '';	
	}

	equalToPressed = (e) => {
		operatorPressed('');
		_currentDisplay.textContent = _historyDisplay.textContent;
		_historyDisplay.textContent = '';
	}

	return {
		setDisplay,
		clearDisplay,
		deleteOne,
		operatorPressed,
		equalToPressed
	}
})();

const getInput = (function() {
	getValue = function(e) {
		render.setDisplay(e.target.textContent);
	}

	getOperator = function(e) {
		render.operatorPressed(e.target.textContent);
	}
	return {
		getValue,
		getOperator
	};
})();

//Event Listeners
let numberButtons = document.querySelectorAll("[data-digit]");
numberButtons.forEach(button => button.addEventListener('click', getInput.getValue));

let clearAllButton = document.querySelector('[data-clear]');
clearAllButton.addEventListener('click', render.clearDisplay);

let deleteButton = document.querySelector('[data-delete]');
deleteButton.addEventListener('click', render.deleteOne);

let operatorButtons = document.querySelectorAll('[data-operator]');
operatorButtons.forEach(button => button.addEventListener('click', getInput.getOperator));

let equalToButton = document.querySelector('[data-equalTo');
equalToButton.addEventListener('click', render.equalToPressed);