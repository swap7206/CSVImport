import { Button, List, ListItem } from "@mui/material";
import { useState } from "react";

function CSVFilePicker(props) {
	const [file, setFile] = useState([]);
	const fileReader = new FileReader();

	const csvFileToArray = (string) => {
		const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
		const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

		const fileDataarray = csvRows.map(i => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});

		props.handleUploadFile(fileDataarray);
	};


	const handleOnChange = (e) => {
		fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

		fileReader.readAsText(e.target.files[0]);
		setFile(e.target.files[0])
	};
	console.info("eve", file);


	return (
		<div style={{textAlign: "center"}}>
			<Button
				variant="contained"
				component="label"
				onChange={handleOnChange}
			>
				Upload File
				<input
					type="file"
					accept={".csv"}
					hidden
				/>
			</Button>
			<List>
				<ListItem>{file.name} <Button onClick={() => {
					setFile([]);
					props.handleUploadFile([]);
				}}>Remove</Button></ListItem>
			</List>
		</div>
	);
}

export default CSVFilePicker;
