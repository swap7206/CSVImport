import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function CSVFilePicker(props) {
	const [file, setFile] = useState();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	useEffect(() => {
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

		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	}, [file, props]);
	

	const handleOnSubmit = (e) => {
		e.preventDefault();

		
	};


	return (
		<div style={{ textAlign: "center" }}>
			<form>
				<TextField
					type={"file"}
					id={"csvFileInput"}
					accept={".csv"}
					onChange={handleOnChange}
				/>
			</form>
		</div>
	);
}

export default CSVFilePicker;
