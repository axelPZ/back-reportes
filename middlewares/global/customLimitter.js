const moment = require('moment');
const redis = require('redis')
const {Router} = require('express') 
var router = Router()

const redis_client = redis.createClient();
const WINDOW_DURATION_IN_MINUTES = 1; //15
const MAX_WINDOW_REQUEST_COUNT = 50; //100
const WINDOW_LOG_DURATION_IN_MINUTES = 1; //15


const customLimiter = router.use(async function (req, res, next)  {
    try {
        //Checks if the Redis client is present
        const ipClient = (req.headers['x-forwarded-for'])? req.headers['x-forwarded-for']: await getIp(req.ip);
        console.log("IP del cliente", ipClient );
        //console.log(redis_client);
        if (!redis_client) {
            console.log('Redis client does not exist!');
            process.exit(1);
        }
        //Gets the records of the current user base on the IP address, returns a null if the is no user found
        redis_client.get(ipClient, function (error, record) {
            if (error) throw error;

           /* redis_client.del(ipClient)
            return*/
           const currentTime = moment();
            //When there is no user record then a new record is created for the user and stored in the Redis storage
          //  console.log("record", record);
            if (record == null) { 
                let newRecord = [];
                let requestLog = {
                    requestTimeStamp: currentTime.unix(),
                    requestCount: 1
                };
                newRecord.push(requestLog);
                redis_client.set(ipClient, JSON.stringify(newRecord));
                next();

            }else {
                //When the record is found then its value is parsed and the number of requests the user has made within the last window is calculated
                let data = JSON.parse(record);
              //  console.log("data ", data);
                let windowBeginTimestamp = moment().subtract(WINDOW_DURATION_IN_MINUTES, 'minutes').unix();

                if(data == null || data == undefined){
                    return
                }

                let requestsinWindow = data.filter(entry => {
                  //  console.log("windowBeginTimestamp ", windowBeginTimestamp);
                  //  console.log("entry.requestTimeStamp ", entry.requestTimeStamp);

                    return entry.requestTimeStamp >= windowBeginTimestamp;
                });

             //   console.log("requestsinWindow ", requestsinWindow);

                let totalWindowRequestsCount = requestsinWindow.reduce((accumulator, entry) => {
                    return accumulator + entry.requestCount;
                }, 0);

              //  console.log("totalWindowRequestsCount ", totalWindowRequestsCount);

                let lastRequestLogData = data[data.length - 1];
                //if maximum number of requests is exceeded then an error is returned
                if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
                    return res.status(429).json({"Mensaje": `¡Has superado el límite de solicitudes, intentalo mas tarde!`});
                } else {
                    //When the number of requests made are less than the maximum the a new entry is logged
                    let lastRequestLog = data[data.length - 1];
                    let potentialCurrentWindowIntervalStartTimeStamp = currentTime
                        .subtract(WINDOW_LOG_DURATION_IN_MINUTES, 'minutes')
                        .unix();

                    //    potentialCurrentWindowIntervalStartTimeStamp = ( currentTime.unix() - 120000) 
                   // console.log("lastRequestLog ", lastRequestLog);
                   // console.log("current ", currentTime.unix());
                   // console.log("potentialCurrentWindowIntervalStartTimeStamp ", potentialCurrentWindowIntervalStartTimeStamp);

                    //When the interval has not passed from the last request, then the counter increments
                    if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
                    //    console.log("1");
                        lastRequestLog.requestCount++;
                        data[data.length - 1] = lastRequestLog;
                        redis_client.set(ipClient, JSON.stringify(data));
                        next();

                    } else {
                        redis_client.del(ipClient)
                       /* console.log("2");
                        //When the interval has passed, a new entry for current user and timestamp is logged
                        let newRecord = [];
                        let requestLog = {
                            requestTimeStamp: currentTime.unix(),
                            requestCount: 1
                        };
                        newRecord.push(requestLog);
                        redis_client.set(ipClient, JSON.stringify(newRecord));*/
                        next();
                    }
               //     console.log("=========================================");
                    /*next();
                    return*/
                    /*redis_client.set(ipClient, JSON.stringify(data));
                    next();*/
                }
            }
        });
    } catch (error) {
        next(error);
    }
})

getIp = async(ip)=>{
    const ipTemp = ip.split(':');
    return ipTemp[( ipTemp.length -1 )];
}

module.exports = {
    customLimiter
}
