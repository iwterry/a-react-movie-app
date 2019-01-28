
// Assumes obj is an Object and path is a string.
// In "path", properties are separated by "." (a dot).
// Example: obj = {a: 1, b: { c: 2 }} and path for obj.a is "a" and obj.b.c. is "b.c".
// Returns the value at the given path in the obj.
export function findValueInObjWithGivenPath(obj, path) {
	const pathNames = path.split('.');

	let i = 0;
	let possibleObj = obj;
	
	do {
		possibleObj = possibleObj[pathNames[i]];
		i += 1;
	} while(typeof(possibleObj) === 'object' && possibleObj != null);
	return possibleObj;
}

// assumes arr is an array and currPage, numElementsPerPage are positive integers
export function calculateNumberElementsShown(arr, currPage, numElementsPerPage) {
	if(arr.length === 0) return 0;
	
	const canDisplayAllPerPage = currPage * numElementsPerPage <= arr.length;
	
	if(canDisplayAllPerPage) return numElementsPerPage;
	else return arr.length - (currPage  - 1) * numElementsPerPage;
}

export function sortObjects(items, path, sortAscending=true, compareStrings=compareStringsCaseInsensitive) {
	items = [...items];
	items.sort(function(obj1, obj2) {
		const value1 = findValueInObjWithGivenPath(obj1, path);
		const value2 = findValueInObjWithGivenPath(obj2, path);
		const areValuesOfSameType = typeof(value1) === typeof(value2);
		const isValueANumber = typeof(value1) === 'number';
		const isValueAString = typeof(value1) === 'string';
		
		if(areValuesOfSameType && (isValueANumber || isValueAString)) {
			let result;
			if(isValueAString) {
				result = compareStrings(value1, value2);
			} else {
				result = value1 - value2;
			}

			if(!sortAscending) {
				result = (-1) * result;
			}
			return result;
		} else {
			throw new Error('values that are to be sorted must be of the same type and be numbers or strings');
		}
	});
	return items;
}

/* Lexically compares two strings without regard to case.
 Returns -1 if str1 is less than str2, 1 if str2 is less than str1, and 0 if they are equal */
function compareStringsCaseInsensitive(str1, str2) {
	const normalizedStr1 = str1.toLowerCase();
	const normalizedStr2 = str2.toLowerCase();
	
	if(normalizedStr1 < normalizedStr2) {
		return -1;
	} else if (normalizedStr1 > normalizedStr2) {
		return 1;
	} else {
		return 0;
	}
}