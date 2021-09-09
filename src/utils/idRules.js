import { sha256 } from 'js-sha256'
import BigNumber from 'bignumber.js'

const createAdId = str => {
	let hash = sha256.create()
	hash.update(str)

	hash.digest()
	let hashResult = hash.hex()
	let hashString = hashResult.substring(0, 16)

	const id = new BigNumber('0x' + hashString).toString(10)

	return id
}

export { createAdId }
