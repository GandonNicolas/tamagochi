let position = 0
function generateSpace() {
    return new Array(between(0, 70)).fill(' ').join('')
} 

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports = { generateSpace, between }