import { useState } from "react";
import { Grid, List, ListItem, Paper } from "@mui/material";
import CSVFilePicker from "./CSVFilePicker";
import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
// import CSVReaderCmp
// import AccordionListCmp
const HomeCmp = () => {
	const [csvFiles, setCsvFiles] = useState([]);
	// data = [
	// //array of objects - a object for each uploaded file
	// 	{
	// 		fileName = "string",
	// 		data = {

	// 		},
	// 	}
	// ]
	const handleUploadFile = (fileDataarray) => {
		// add or remove uploaded file data in the state depending on action (upload/ remove)
		setCsvFiles(fileDataarray);
	};

	console.info("data", csvFiles);
	const headerKeys = Object.keys(Object.assign({}, ...csvFiles)).map((headerKey) => (headerKey.split('.')[1]));


	return (
		<Paper sx={{height: "100vh",borderRadius: 0, display: "flex"}}>
			<Grid container={true}>
				<Grid item={true} xs={3} sx={{ borderRight: "2px solid black", backgroundColor: "yellowgreen" }}>
					<CSVFilePicker handleUploadFile={(fileDataarray) => handleUploadFile(fileDataarray)} />
					{/* <List>
						{
							csvFiles?.map((item) => (
								<ListItem>{item.fileName}</ListItem>
							))
						}
					</List> */}
				</Grid>
				<Grid item={true} xs={9}>
					<table>
						<thead>
							<tr key={"header"}>
								{headerKeys.map((key) => (
									<th>{key}</th>
								))}
							</tr>
						</thead>

						<tbody>
							{csvFiles.map((item) => (
								<tr key={item.id}>
									{Object.values(item).map((val) => (
										<td>{val}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default HomeCmp;
