const { InfluxDB } = require('@influxdata/influxdb-client');
const INFLUX_URL = 'https://eu-central-1-1.aws.cloud2.influxdata.com';
const INFLUX_TOKEN = '44TLeCBk3T1eHUuW7uaGzwnkKSn4LWPYRFWyMatsEh1CT43M5UO8hWGWWKYzfz5dnGrnaeNsGz4RmbL_6b1X2Q==';
const INFLUX_ORG = '6be1262abdf57cf9';
const INFLUX_BUCKET = 'Student';
const client = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const queryApi = client.getQueryApi(INFLUX_ORG);
const fluxQuery = `from(bucket: "Student") |> range(start: -15m) |> filter(fn: (r) => r._measurement == "termostat") |> sort(columns: ["_time"], desc: true) |> limit(n: 5)`;
queryApi.queryRows(fluxQuery, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row);
    console.log(JSON.stringify(o));
  },
  error(error) {
    console.error(error);
  },
  complete() {
    console.log('Done');
  }
});
