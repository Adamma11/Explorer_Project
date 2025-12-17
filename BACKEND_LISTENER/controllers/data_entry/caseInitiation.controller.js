const Case = require("../../models/uploads/case.model");

exports.getLastSixMonthsCaseInitiated = async (req,res) => {
    try{
         let data=[];
         const monthArray = getMonthsArray();

         for(let i=1;i<monthArray.length-1;i++){
            // const prevItem = monthArray[i-1];
            const nextItem = monthArray[i+1];
            const currentItem = monthArray[i];

            const startDate = new Date(Date.UTC(currentItem.year,currentItem.month-1,1,0,0,0));
            const endDate = new Date(Date.UTC(nextItem.year,nextItem.month-1,1,0,0,0));

            const monthlyData = await getMonthlyData(startDate,endDate);
                    data.push([currentItem.monthName+" - "+currentItem.year, monthlyData])

         }
	let newData = [
    [
        "Nov - 2024",
        0
    ],
    [
        "Dec - 2024",
        0
    ],
    [
        "Jan - 2025",
        0
    ],
    [
        "Feb - 2025",
        0
    ],
    [
        "Mar - 2025",
        2
    ],
    [
        "Apr - 2025",
        2
    ],
    [
        "May - 2025",
        0
    ],
    [
        "Jun - 2025",
        2
    ],
    [
        "Jul - 2025",
        2
    ],
    [
        "Aug - 2025",
        1
    ],
    [
        "Sep - 2025",
        0
    ],
    [
        "Oct - 2025",
        10
    ]
]
         return res.status(200).json(newData);

    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Unexpected error occured. Please try again."})
    }
}

function getMonthsArray(){

const currentDate = new Date();
const monthsArray = [];
const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

for (let i = -12; i <= 1; i++) {
  const targetMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
  const year = targetMonth.getFullYear();
  const month = targetMonth.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const monthName = monthNames[month];

  monthsArray.push({ year, month: month + 1, monthName, lastDay });
}
console.log(monthsArray);
return monthsArray

}

let getMonthlyData = function (startDate, endDate) {
        return new Promise((resolve, reject) => {
            Case
                .count({ initiationDate: { $gt: startDate, $lt: endDate } })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(0)
                })

        })
}


exports.getDateWiseCaseInitiationCount = async function(req,res){
    try{
      data=[];
      const monthYearLastDayInfo=getMonthYearLastInfo(req.params.monthYear);

       for(let i=1;i<=monthYearLastDayInfo.lastDay;i++){
          const startDate = monthYearLastDayInfo.year+"-"+monthYearLastDayInfo.month+"-"+ i;
          let endDate ;

          if(i==monthYearLastDayInfo.lastDay){
            if(monthYearLastDayInfo.month==12){
                endDate=(monthYearLastDayInfo.year+1)+"-"+(1)+"-"+ 1

            }else{
                endDate=monthYearLastDayInfo.year+"-"+(monthYearLastDayInfo.month+1)+"-"+ 1
                // console.log(startDate,endDate);
            }
          }else{
            endDate =(monthYearLastDayInfo.year)+ "-" + monthYearLastDayInfo.month +"-" + (i+1)
          }

            const getDayWiseData= await Case.count({initiationDate:{$gte:startDate,$lt:endDate}})
            data.push([`${i}`, getDayWiseData])

       }  
       return res.status(200).json(data);

    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Unexpected error occured. Please try again."})
    }
}



function getMonthYearLastInfo(monthYear){

    const monthYearSubStringArr = monthYear.split("-")
    
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          const year = Number(monthYearSubStringArr[monthYearSubStringArr.length-1])
          const monthNumber =monthNames.indexOf(monthYearSubStringArr[0].trim())
    const lastDay = new Date(year, monthNumber+1, 0).getDate();
    

    return {year,month:(monthNumber+1),lastDay}

}



exports.getLastSixMonthsOutputQcCompletionCount = async function(req,res){
    try{
        let data=[];
        const monthArray = getMonthsArray();

        for(let i=1;i<monthArray.length-1;i++){
           const prevItem = monthArray[i-1];
           const nextItem = monthArray[i+1];
           const currentItem = monthArray[i];

           const startDate = prevItem.year+"-"+prevItem.month+"-"+prevItem.lastDay;
           const endDate = nextItem.year+"-"+nextItem.month+"-"+"01";

           const monthlyData = await getOutputQcCompletedMonthlyData(startDate,endDate);
                   data.push([currentItem.monthName+" - "+currentItem.year, monthlyData])

        }
  let newData = [
    [
        "Nov - 2024",
        0
    ],
    [
        "Dec - 2024",
        0
    ],
    [
        "Jan - 2025",
        0
    ],
    [
        "Feb - 2025",
        0
    ],
    [
        "Mar - 2025",
       0 
    ],
    [
        "Apr - 2025",
        0
    ],
    [
        "May - 2025",
        1
    ],
    [
        "Jun - 2025",
        1
    ],
    [
        "Jul - 2025",
        0
    ],
    [
        "Aug - 2025",
        0
    ],
    [
        "Sep - 2025",
        7
    ],
    [
        "Oct - 2025",
        8
    ]
]
        return res.status(200).json(newData);
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Unexpected error occured. Please try again."})  
    }
}

let getOutputQcCompletedMonthlyData = function (startDate, endDate) {
    return new Promise((resolve, reject) => {
        Case
            .count({ outputqcCompletionDate: { $gt: startDate, $lt: endDate } })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                resolve(0)
            })

    })
}

exports.getDateWiseOutputQcCompletionCount = async function(req,res){
    try{
        data=[];
        const monthYearLastDayInfo=getMonthYearLastInfo(req.params.monthYear);
  
         for(let i=1;i<=monthYearLastDayInfo.lastDay;i++){
            const startDate = monthYearLastDayInfo.year+"-"+monthYearLastDayInfo.month+"-"+ i;
            let endDate ;
  
            if(i==monthYearLastDayInfo.lastDay){
              if(monthYearLastDayInfo.month==12){
                  endDate=(monthYearLastDayInfo.year+1)+"-"+(1)+"-"+ 1
  
              }else{
                  endDate=monthYearLastDayInfo.year+"-"+(monthYearLastDayInfo.month+1)+"-"+ 1
                  // console.log(startDate,endDate);
              }
            }else{
              endDate =(monthYearLastDayInfo.year)+ "-" + monthYearLastDayInfo.month +"-" + (i+1)
            }
  
              const getDayWiseData= await Case.count({outputqcCompletionDate:{$gte:startDate,$lt:endDate}})
              data.push([`${i}`, getDayWiseData])
  
         }  
         return res.status(200).json(data);
  
      }catch(error){
          console.log(error);
          return res.status(500).send({message:"Unexpected error occured. Please try again."})
      }
}

exports.getTotalActualComponentsForLastSixMonths = async function(req,res){
    try{ 
        try{
            let data=[];
            const monthArray = getMonthsArray();
   
            for(let i=1;i<monthArray.length-1;i++){
               const prevItem = monthArray[i-1];
               const nextItem = monthArray[i+1];
               const currentItem = monthArray[i];
                // console.log("currentItem",currentItem);
                // console.log("nextItem",nextItem);

               const startDate = new Date(Date.UTC(currentItem.year,currentItem.month-1,1,0,0,0));
               const endDate = new Date(Date.UTC(nextItem.year,nextItem.month-1,1,0,0,0));
   
               const monthlyData = await getMonthlyActualComponentsCount(startDate,endDate);
                       data.push([currentItem.monthName+" - "+currentItem.year, monthlyData])
   
            }
   
            return res.status(200).json(data);
   
       }catch(error){
           console.log(error);
           return res.status(500).send({message:"Unexpected error occured. Please try again."})
       }
          
    }catch(error){

    }
}

let getMonthlyActualComponentsCount = function (startDate, endDate) {
    return new Promise(async (resolve, reject) => {
    
        // console.log("checks","start date",startDate,"end date",endDate);
        const result = await Case.aggregate([
            {
              $match: {
                initiationDate: {
                  $gte: startDate,
                  $lt: endDate
                }
              }
            },
            {
              $group: {
                _id: null,
                totalActualComponents: { $sum: { $size: "$actualComponents" } }
              }
            }
          ]);
      
          const totalActualComponents = result[0]?.totalActualComponents || 0;
          resolve(totalActualComponents)

    })
}
