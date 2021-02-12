// prettier-ignore
const columns = document.querySelectorAll("td.nmtt > table > tbody > tr:first-of-type > td").length;
const rows = document.querySelectorAll("td.nmtl > table > tbody > tr").length;

// prettier-ignore
const width = document.querySelectorAll("td.nmtl > table > tbody > tr:first-of-type > td").length
const height = document.querySelectorAll("td.nmtt > table > tbody > tr").length;

document.querySelectorAll(".num_empty").forEach((td) => {
	td.classList.toggle("num_empty");
	td.classList.toggle("num");

	const div = document.createElement("div");
	div.textContent = 0;

	td.textContent = "";
	td.append(div);
});

const numbers = Array.from(document.querySelectorAll("td"))
	.filter((td) => td.classList.contains("num"))
	.map((td) => parseInt(td.textContent));

const columnHeaders = getChunks(numbers.slice(0, height * columns), columns);
const rowHeaders = getChunks(numbers.slice(height * columns), width);

console.log(
	JSON.stringify(
		{
			columns,
			rows,
			columnHeaders: columnHeaders.map((xs) => `[${xs.join(", ")}]`),
			rowHeaders: rowHeaders.map((xs) => `[${xs.join(", ")}]`),
		},
		null,
		4
	)
		.replace(/\]\"/g, "]")
		.replace(/\"\[/g, "[")
);

function getChunks(array, size) {
	const result = [];

	for (let i = 0; i < array.length / size; i++) {
		result.push(array.slice(i * size, (i + 1) * size));
	}

	return result;
}
