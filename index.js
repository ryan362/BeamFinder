const prompt = require('prompt-sync')();

var dead = parseFloat(prompt('Dead Load: ', 60))
var live = parseFloat(prompt('Live Load: ', 100))
var length = parseFloat(prompt('Beam Length: ', 20))
var spacing = parseFloat(prompt('Beam Spacing: ', 8))

const weight = (dead * spacing) + (live * spacing)
const Ra = (weight * length)/2
//console.log('Ra/Rb = ' + Ra +'lbs')
const Mmax = (weight * (length**2))/spacing
const Mn = 1.67*Mmax
const Zx = (Mn * 12)/50000
console.log('Zx = ' + Zx + " in^3")
console.log('Please choose a beam')

var depth = parseFloat(prompt('Beam Depth: '))
var thickness = parseFloat(prompt('Web Thickness: '))
var Ix = parseFloat(prompt('Ix: '))
const Vn = 0.6 * 50000 * depth * thickness

if (Vn > (1.5 * Ra)) {
	console.log("Passed shear strength")
}else{
	console.log("Does not pass shear strength test, please refresh and pick a new beam")
}

//Deflection
const bothLim = (length * 12)/240
const deadLim = (length * 12)/360

const maxWeight = (5 * weight * (20**4)*12)/(384 * 29000000 * Ix)
if (maxWeight < bothLim) {
	console.log("Passed Dead + Live limit")
}