// Write a function defaultArguments . It takes a function as an argument, along with an object
// containing default values for that function's arguments, and returns another function which defaults to the
// right values.

// ?You cannot assume that the function's arguments have any particular names.
// You should be able to call defaultArguments repeatedly to change the defaults.

//Initial PseudoCode
//  Check whether function definition includes "=>"
//  if Yes -> Check whether arguments list ([0]) contains brackets
//                   if Yes -> remove brackets and split on comma if it includes one
// 					 if No -> return the first split
//  if No -> remove opening bracket, take the second argument [1], split that on closing bracket and take the first argument [0]
//  then splt on the comma if there is one

// get keys of the argument hash (Object.keys)
//  compare the two and see if there's a match (sort alphabetically) the using forEach with of for loop
//  if there's a match you set the default argument for that function



// The idea of this exercise is replacing the initial arguments, with new ones to get the updated sum value

function add(a, b) {
	return a + b;
};


function defaultArguments(func, params){

	// first we get an array of key values from the params being passed
	let initialArguments = Object.keys(params)

	let functionalArguments = func.toString()
                            .replace(/[/][/].*$/mg,'') //removes single line comments
                            .replace(/\s+/g, '') //removes white space
                            .replace(/[/][*][^/*]*[*][/]/g, '') //removes multiline comments
                            .split('(')[1] // returns array of stringified function separated by "(" as 0th element, first element selected
                            .split(')')[0] // returns an array with the rest of the stringified function is separated by ")" as the 1st element, 0th element is selected as it holds the arguments
                            .split(','); // returns the array of arguments separated by a comma


	let newArguments = {} // declare an empty object


	//iterate over the array of initial arguments
	initialArguments.forEach(argument => {
		//indexOf finds the position of each argument within functionalArguments and returns an index each time
		let index = functionalArguments.indexOf(argument)
		//set those indexes as key: value pairs within newArguments
		newArguments[index] = params[argument]
	})

	return function(){
		//returns an array of arguments being passed
		let argsArray = [].slice.call(arguments)

		//returns an array of keys from the newArguments object defined before
		let previousArgs = Object.keys(newArguments)

		//iterates through previousArguments array
		previousArgs.forEach(arg => {
			// if each argument is less than the length of the length of array
			if(arg <= previousArgs.length){
				//we basically update the argsArray with all the new arguments
				argsArray[arg] = newArguments[arg]
			}
		})

	// this applies the function that was passed in the argument to the new argsArray
    return func.apply(this,argsArray);

	}

}




