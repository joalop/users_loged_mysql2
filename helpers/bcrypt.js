const bcrypt = require('bcrypt')

const encrypt = async (textplain) => {
    const hash = await bcrypt.hash( textplain, 10)
return hash
}

const compare = async ( textplain, passworHash ) => {
    return await bcrypt.compare( textplain, passworHash )
}

module.exports = { encrypt, compare }