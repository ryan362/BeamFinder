const prompt = require('prompt-sync')();

var dead = parseFloat(prompt('Dead Load: ', 60))
var live = parseFloat(prompt('Live Load: ', 100))
var length = parseFloat(prompt('Beam Length: ', 20))
var spacing = parseFloat(prompt('Beam Spacing: ', 8))

const liveTot = live * spacing
const weight = (dead * spacing) + liveTot
const Ra = (weight * length)/2
//console.log('Ra/Rb = ' + Ra +'lbs')
const Mmax = (weight * (length**2))/spacing
const Mn = 1.67*Mmax
const Zx = (Mn * 12)/50000
console.log('Zx = ' + Zx + " in^3")
console.log('Please choose a beam')

var depth = parseFloat(prompt('Beam Depth: ', 13.74))
var thickness = parseFloat(prompt('Web Thickness: ', 0.23))
var Ix = parseFloat(prompt('Ix: ', 199))
const Vn = 0.6 * 50000 * depth * thickness

if (Vn > (1.5 * Ra)) {
	console.log("Passed shear strength")
}else{
	console.log("Does not pass shear strength test, please refresh and pick a new beam")
	exit();
}

//Deflection
const bothLim = (length * 12)/240
const liveLim = (length * 12)/360

const maxWeight = (5 * weight * (length**4)*12)/(384 * 29000000 * Ix)
if (maxWeight < bothLim) {
	console.log("Passed Dead + Live limit")
}else{
	console.log('Doesn\'t pass the limits, try another beam')
	exit();
}

const liveMaxWeight = (5 * liveTot * (length**4))/(384 * 29000000 * Ix)
if (maxWeight < liveLim) {
	console.log("Passed Live limit")
}else{
	console.log('Doesn\'t pass the live limits, try another beam')
	exit();
}
console.log('Beam Passed all checks, dispensing values')
console.log(`All Values below: \n
Total weight = ${weight} plf\n
Ra = ${Ra} lb\n
Mmax = ${Mmax} ftlb\n
Mn = ${Mn} ftlb\n
Zx = ${Zx} in^3\n
Vn = ${Vn} lb\n
Deflection Limits:
Dead+Live = ${bothLim} in
Live = ${liveLim} in \n
Actual:
Dead+Live Max = ${maxWeight} in
Live Max = ${liveMaxWeight} in`)