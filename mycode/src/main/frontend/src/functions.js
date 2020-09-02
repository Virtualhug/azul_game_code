

export default function chooseTile(array, prevTotal)
{
	let blue_tiles = array[0].blue_tiles;
	let yellow_tiles = array[1].yellow_tiles;
	let red_tiles = array[2].red_tiles;
	let black_tiles = array[3].black_tiles;
	let white_tiles = array[4].white_tiles;

	let tileTotal = blue_tiles + yellow_tiles + red_tiles + black_tiles + white_tiles;

	let tileColour = setTileColour(numberGen(tileTotal), blue_tiles, yellow_tiles, red_tiles, black_tiles, white_tiles, tileTotal);

	prevTotal = tileTotal;
	return tileColour;

}

function numberGen(tileTotal) {
	let i;
	i = Math.floor((Math.random() * tileTotal) + 1);

	console.log(Math.round(i));
	return Math.round(i);

}

function setTileColour(num, blue, yellow, red, black, white, tileTotal) {
	

	

	if (num > 0 && num <= blue) {
		blue--;
		tileTotal--;
		console.log("blue tile picked");
		return "blue";
	}
	else if (num > blue && num <= (blue + yellow)) {
		yellow--;
		tileTotal--;
		console.log("yellow tile picked");
		return "yellow";
	}
	else if (num > (blue + yellow) && num <= (blue + yellow + red)) {

		red--;
		tileTotal--;	
		console.log("red tile picked");
		return "red";
	}
	else if (num > (blue + yellow + red) && num <= (blue + yellow + red + black)) {
		black--;
		tileTotal--;
		console.log("black tile picked");
		return "black";
	}
	else if (num > blue + yellow + red + black && num <= tileTotal) {
		white--;
		tileTotal--;
		console.log("white tile picked");
		return "white";
	}

}