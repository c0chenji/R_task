# Take home task

## Data from MongoDB compass
![Picture Description](/imgs/MongoDB_compass.jpg)
All the sample are created by inserting json file.

## API Endpoints

### Get All Data

`http://localhost:3000/read_json`

Read data from local json file

### Get Data by Phone Number
`GET /mongodb/phone/:phone`

sample input
`http://localhost:3000/mongodb/phone//SEP567567678678?startDate=1656788801&endDate=1656788810`
- `startDate`: Optional. Specifies the start date for the time range.
- `endDate`: Optional. Specifies the end date for the time range.

sample output
![Phone Output](/imgs/get_phone_by_time.jpg)
Retrieves data based on the phone number provided, add startDate and endDate to filter the output by time range.

### Get Data by Voicemail

`GET /mongodb/voicemail/:voicemail`

Retrieves data based on the voicemail provided.

### Get Data by User ID

`GET /mongodb/userId/:userId`

Retrieves data based on the user ID provided.

### Get Data by Cluster ID

`GET /mongodb/clusterId/:clusterId`

Retrieves data based on the cluster ID provided.


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).