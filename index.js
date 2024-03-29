const prompt = require('prompt-sync')();

var type = prompt('Type (B: Beam; G: Girder): ', 'B');
var dead = parseFloat(prompt('Dead Load(lbs): ', 60));
var live = parseFloat(prompt('Live Load(lbs): ', 100));

var length = parseFloat(prompt('Beam Length(ft): ', 20));
var weight = 0
var liveTot = 0
if (type.toUpperCase() == 'B') {
	var spacing = parseFloat(prompt('Beam Spacing(in): '));
	liveTot = live * spacing;
	weight = (dead * spacing) + liveTot;
}else{
	
}


const Ra = (weight * length)/2;
//console.log('Ra/Rb = ' + Ra +'lbs')
const Mmax = (weight * (length**2))/8
const Mn = 1.67*Mmax
console.log(Mn)
const Zx = (Mn * 12)/50000
console.log('Zx = ' + Zx + " in^3")
console.log('Please choose a beam')

var depth = parseFloat(prompt('Beam Depth(in): '))
var thickness = parseFloat(prompt('Web Thickness(in): '))
var Ix = parseFloat(prompt('Ix(in^4): '))
const Vn = 0.6 * 50000 * depth * thickness

if (Vn > (1.5 * Ra)) {
	console.log("Passed shear strength")
}else{
	console.log("Does not pass shear strength test, please pick a new beam")
	exit();
}

//Deflection
const bothLim = (length * 12)/240
const liveLim = (length * 12)/360
console.log(liveLim)

const maxWeight = (5 * weight * (length**4)*12**3)/(384 * 29000000 * Ix)
if (maxWeight < bothLim) {
	console.log("Passed Dead + Live limit")
}else{
	console.log('Doesn\'t pass the limits, try another beam')
	exit();
}

const liveMaxWeight = (5 * liveTot * (length**4)*12**3)/(384 * 29000000 * Ix)
if (liveMaxWeight < liveLim) {
	console.log("Passed Live limit")
}else{
	console.log(`Doesn\'t pass the live limits, try another beam ${liveMaxWeight}`)
	exit();
}
console.log('Beam Passed all checks, printing values')
console.log(`\nAll Values below: \n
Total weight = ${weight} plf
Ra = ${Ra} lb
Mmax = ${Mmax} ftlb
Mn = ${Mn} ftlb
Zx = ${Zx} in^3
Vn = ${Vn} lb\n
Deflection Limits:
Dead+Live = ${bothLim} in
Live = ${liveLim} in \n
Actual:
Dead+Live Max = ${maxWeight} in
Live Max = ${liveMaxWeight} in`)