const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chnUnitSection = ['', '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极']
const chnUnitChar = ['', '十', '百', '千']

function checkNumber(data) {
	const tmp = parseFloat(data)

	if (isNaN(tmp)) {
		// throw new Error('Inputed data is not a number!')
		// console.error('Inputed data is not a number!')

		return ''
	}

	return data
}

function floatToChinese(float) {
	var tmp = ''
	for (var i = 0; i < float.length; i++) {
		switch (float.charAt(i)) {
			case '0':
				tmp = tmp + chnNumChar[0]
				break
			case '1':
				tmp = tmp + chnNumChar[1]
				break
			case '2':
				tmp = tmp + chnNumChar[2]
				break
			case '3':
				tmp = tmp + chnNumChar[3]
				break
			case '4':
				tmp = tmp + chnNumChar[4]
				break
			case '5':
				tmp = tmp + chnNumChar[5]
				break
			case '6':
				tmp = tmp + chnNumChar[6]
				break
			case '7':
				tmp = tmp + chnNumChar[7]
				break
			case '8':
				tmp = tmp + chnNumChar[8]
				break
			case '9':
				tmp = tmp + chnNumChar[9]
				break
			default:
				break
		}
	}
	return tmp
}

function integerToChinese(integer) {
	let strIns = ''
	let chnStr = ''
	let unitPos = 0

	let zero = true

	while (integer > 0) {
		const v = integer % 10

		if (v === 0) {
			if (!zero) {
				zero = true
				chnStr = chnNumChar[v] + chnStr
			}
		} else {
			zero = false
			strIns = chnNumChar[v]
			strIns += chnUnitChar[unitPos]
			chnStr = strIns + chnStr
		}

		unitPos++
		integer = Math.floor(integer / 10)
	}
	return chnStr
}

function numberToChinese(integer, float) {
	let strIns = ''
	let chnStr = ''
	let unitPos = 0

	let needZero = false

	if (integer === 0) {
		return chnNumChar[0]
	}

	while (integer > 0) {
		const section = integer % 10000
		if (needZero) {
			chnStr = chnNumChar[0] + chnStr
		}

		strIns = integerToChinese(section)
		strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0]
		chnStr = strIns + chnStr

		needZero =
			(section < 1000 && section > 0) ||
			(section === 0 && chnStr.substring(chnStr.length - 1) !== chnUnitSection[0])

		integer = Math.floor(integer / 10000)
		unitPos++
	}

	return chnStr
}

function number2chinese(number) {
	const tmpArr = checkNumber(number)
		.toString()
		.split('.')
	let chinese = undefined

	if (tmpArr.length > 1) {
		chinese = numberToChinese(tmpArr[0]) + '点' + floatToChinese(tmpArr[1])
	} else if (tmpArr.length === 1) {
		chinese = numberToChinese(tmpArr[0])
	}

	return chinese
}

function getFullNum(num) {
	//处理非数字
	if (isNaN(num)) {
		return num
	}

	//处理不需要转换的数字
	const str = '' + num
	if (!/e/i.test(str)) {
		return num
	}

	return num.toFixed(28).replace(/\.?0+$/, '')
}

export { number2chinese, getFullNum }
