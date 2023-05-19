export const addComma = (number: number):string => {
	const str = String(number);
	let result = "";
	let count = 0;

	for (let i = str.length - 1; i >= 0; i -= 1) {
		const currentNum = str[i];
		result += currentNum;
		count += 1;

		if (count % 3 === 0 && i !== 0) {
			result += ",";
		}
	}

	return result.split("").reverse().join("");
}
