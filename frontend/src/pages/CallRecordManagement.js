// src/pages/CallRecordManagement.js
import React, { useState } from "react";
import { Button, Typography, Paper, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GetAppIcon from "@mui/icons-material/GetApp";

const CallRecordManagement = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleUpload = async () => {
		try {
			if (!file) {
				console.error("No file selected.");
				return;
			}

			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("http://localhost:5000/files/upload", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("File uploaded successfully.");
				// Handle success as needed
			} else {
				console.error("Failed to upload file.");
				// Handle error, show error message, etc.
			}
		} catch (error) {
			console.error("Error during file upload:", error);
			// Handle error, show error message, etc.
		}
	};

	const handleDownload = () => {
		// Implement file download logic here
		console.log("Downloading file");
		// Add your file download API call here
	};

	return (
		<div
			style={{
				backgroundColor: "black",
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				style={{
					padding: "80px",
					backgroundColor: "rgba(255, 255, 255, 0.7)",
					width: "100%",
					maxWidth: "600px",
					fontFamily: "Red Rose",
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
					style={{ fontFamily: "Red Rose" }}
				>
					Call Record Management
				</Typography>
				<input
					accept=".mp3"
					style={{ display: "none" }}
					id="file-input"
					type="file"
					onChange={handleFileChange}
				/>
				<label htmlFor="file-input">
					<Button
						variant="contained"
						component="span"
						color="primary"
						startIcon={<CloudUploadIcon />}
						sx={{ marginRight: "10px" }}
						style={{ fontFamily: "Red Rose" }}
					>
						Upload .mp3
					</Button>
				</label>
				<Button
					variant="contained"
					color="secondary"
					startIcon={<GetAppIcon />}
					onClick={handleDownload}
					style={{ fontFamily: "Red Rose" }}
				>
					Download .mp3
				</Button>
				{file && (
					<Typography
						variant="body1"
						style={{ marginTop: "10px", fontFamily: "Red Rose" }}
					>
						Selected File: {file.name}
					</Typography>
				)}
				<IconButton
					color="primary"
					onClick={handleUpload}
					disabled={!file}
					sx={{ marginTop: "10px" }}
				>
					<CloudUploadIcon />
				</IconButton>
			</Paper>
		</div>
	);
};

export default CallRecordManagement;
