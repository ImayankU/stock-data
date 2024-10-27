# Stock Data System

This is a Node.js application that allows users to upload, validate, and store stock data from CSV files into a MongoDB database. It includes data processing features, RESTful APIs for data retrieval, and unit tests. The project also contains hosted endpoints and Postman documentation for ease of use.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)

## Features
- Upload and validate CSV files with stock data.
- Store validated data in MongoDB.
- RESTful API for data retrieval.
- Automated calculations based on stock data.
- Unit testing and Postman collection for API documentation.

## Project Structure
project-directory ├── controllers │ └── stockController.js # Controller for handling stock data operations ├── models │ └── Stock.js # Mongoose model for stock data ├── routes │ └── stockRoutes.js # API routes for stock data ├── uploads # Directory for temporary CSV uploads ├── server.js # Main server file ├── .env # Environment variables └── README.md # Project documentation

## Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ImayankU/stock-data.git
    cd stock-data
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the project root and add the following variables:
    ```plaintext
   MONGODB_URI=mongodb+srv://mayank6220:RF8cwPieyrBv5OZG@cluster0.mongodb.net/stock_data?retryWrites=true&w=majority
    PORT=3000
    ```

4. **Start the Server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000`.

## Environment Variables
- `MONGODB_URI`: MongoDB connection URI.
- `PORT`: The port the server will run on.

## Usage

1. **Upload CSV File**:
    - Use an API client like Postman to upload a CSV file containing stock data to the `/api/upload_csv` endpoint.
    - The system validates and stores the data in MongoDB.

2. **Fetch Stock Data**:
    - Retrieve stored stock data via GET requests to endpoints such as `/api/stocks` and filter by date, symbol, or other parameters.

## API Documentation

### Upload CSV Data
- **Endpoint**: `POST /api/upload_csv`
- **Description**: Uploads a CSV file with stock data.
- **Headers**: `Content-Type: multipart/form-data`
- **Body**:
  - `file`: CSV file containing stock data with fields (Date, Symbol, Series, Prev_Close, Open, High, Low, Last, Close, VWAP, Volume, Turnover, Trades, Deliverable_Volume, %Deliverble).

### Retrieve Stock Data
## API 1:
 Endpoint: /api/highest_volume
 Parameters:
 start_date, end_date (e.g., ?start_date=2024-01-
01&amp;end_date=2024-12-31)
 symbol (optional, e.g., ?symbol=ULTRACEMCO)

 Description: Return the record(s) with the highest volume within the
specified date range or for the specified symbol.

## API 2:
 Endpoint: /api/average_close
 Parameters:
 start_date, end_date (e.g., ?start_date=2024-01-
01&amp;end_date=2024-12-31)
 symbol (e.g., ?symbol=ULTRACEMCO)
 Description: Calculate and return the average closing price (close field)
within the specified date range for the specified symbol.

## API 3:
 Endpoint: /api/average_vwap
 Parameters:
 start_date, end_date (e.g., ?start_date=2024-01-
01&amp;end_date=2024-12-31)
 symbol (optional, e.g., ?symbol=ULTRACEMCO)
 Description: Calculate and return the average VWAP within the specified
date range or for the specified symbol.

2. Query Examples:
o /api/highest_volume?start_date=2024-01-01&amp;end_date=2024-12-31
o /api/average_close?start_date=2024-01-01&amp;end_date=2024-12-
## Testing

1. **Run Unit Tests**:
   ```bash
   npm test

--- 


