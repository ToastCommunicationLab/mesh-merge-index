module.exports = function(array) {
	if(array.length % 9) {
		console.error('invalid size');
		return false;
	}

	var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
	var precision = Math.pow( 10, precisionPoints );

	var faces = new Uint16Array(array.length / 3);
	var positions = [];

	var hash = {};
	var key;
	var index = -1;
	var unique = 0;

	for(var i = 0; i < array.length; i+=3) {
		key = Math.round( array[i] * precision ) + '_' + Math.round( array[i+1] * precision ) + '_' + Math.round( array[i+2] * precision );
		
		//vertex index
		if(!hash[key]) {
			positions.push(array[i]);
			positions.push(array[i+1]);
			positions.push(array[i+2]);
			hash[key] = unique;
			index = unique;
			unique++;
		} else {
			index = hash[key];
		}

		//insert vertex into face
		faces[i/3] = index;
	}

	return {
		cells: faces,
		vertices: new Float32Array(positions)
	}
}