import dayjs from "dayjs";

function safeDestructure(obj) {
  // 确保obj是对象
  if (obj === null || typeof obj !== "object") {
    return {};
  }
  return obj;
}

const changeTime = (dateString) => {
  const date = new Date(dateString);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 处理 0 小时
  const formattedHours = hours.toString().padStart(2, "0");

  return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

export const getKlineStyles = () => {
  return {
    mainIndicators: {
      show: true,
    },
    // locale: "en-US",
    timeAxis: {
      tickText: (timestamp: number) => {
        return dayjs(timestamp).format("MM-DD");
      },
    },
    // timezone:"America/Boise",
    candle: {
      type:"candle_solid",
      tooltip: {
        offsetLeft: 0,
        offsetTop: 0,
        offsetRight: 0,
        offsetBottom: 20,
        custom: (dataList: object) => {
          if (!dataList.current) {
            return 
          }
          try {
            let currentData = dataList.current;
            const timestamp = currentData.timestamp;
            const close = Number(currentData.close).toFixed(4);
            const high = Number(currentData.high).toFixed(4);
            const open = Number(currentData.open).toFixed(4);
            const low = Number(currentData.low).toFixed(4);

            return [
              {
                title: "time",
                value: changeTime(timestamp),
              },
              {
                title: "open",
                value: open,
              },
              {
                title: "close",
                value: close,
              },
              {
                title: "High",
                value: high,
              },
              {
                title: "low",
                value: low,
              },
            ];
          } catch (error) {
            
          }
         
        }

        // custom: [
        //   { title: "time", value: "{time}" },
        //   { title: "open", value: "{open}" },
        //   { title: "high", value: "{high}" },
        //   { title: "low", value: "{low}" },
        //   { title: "close", value: "{close}" },
        // ],
      },
    },
    area: {
      lineSize: 1,
      lineColor: "#2196F3",
      value: "close",
      smooth: false,
      backgroundColor: [
        {
          offset: 0,
          color: "rgba(33, 150, 243, 0.01)",
        },
        {
          offset: 1,
          color: "rgba(33, 150, 243, 0.2)",
        },
      ],
      point: {
        show: true,
        radius: 4,
        rippleRadius: 8,
        animation: true,
        animationDuration: 1000,
      },
    },
    indicator: {
      tootip: {
        value: data => {
          console.log('data',data);
        }
      }
    },
    priceMark: {
      show: true,
      high: {
        show: true,
        color: "#D9D9D9",
        textMargin: 5,
        textSize: 10,
        textFamily: "Helvetica Neue",
        textWeight: "normal",
      },
      low: {
        show: true,
        color: "#D9D9D9",
        textMargin: 5,
        textSize: 10,
        textFamily: "Helvetica Neue",
        textWeight: "normal",
      },
      last: {
        show: true,
        // 'current_open' | 'previous_close'
        compareRule: "current_open",
        upColor: "#2DC08E",
        downColor: "#F92855",
        noChangeColor: "#888888",
        line: {
          show: true,
          // 'solid' | 'dashed'
          style: "dashed",
          dashedValue: [4, 4],
          size: 1,
        },
        text: {
          show: true,
          // 'fill' | 'stroke' | 'stroke_fill'
          style: "fill",
          size: 12,
          paddingLeft: 4,
          paddingTop: 4,
          paddingRight: 4,
          paddingBottom: 4,
          // 'solid' | 'dashed'
          borderStyle: "solid",
          borderSize: 0,
          borderColor: "transparent",
          borderDashedValue: [2, 2],
          color: "#FFFFFF",
          family: "Helvetica Neue",
          weight: "normal",
          borderRadius: 2,
        },
      },
    },
  };
}
