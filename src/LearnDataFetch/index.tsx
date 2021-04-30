import { useCallback, useEffect, useState } from "react";
import { continueRender, delayRender, useCurrentFrame } from "remotion";
// import styled from "styled-components";
import { SingleMessageApiResponse } from "./Messages";


export function getIndexedArray(d: string) {
  console.log("get indexed array : " +  d);
  let myJSON = JSON.parse(d);
  if (myJSON != null) {
    let size = myJSON.data.metaData.frames;
    var x = [];
    for (let i = 0; i < size; i++) {
      x.push(i);
    }
    return x;
  }
  return [];
}

export function getIndexedArrayNum(size: number) {
  var x = [];
  for (let i = 0; i < size; i++) {
    x.push(i);
  }
  return x;
}


export function getTime(d: string, frameIndex: number) {
  console.log("");
  console.log("frameIndex : " + frameIndex);
  console.log("data: " + d);
  let myJSON = JSON.parse(d);
  if (myJSON != null) {
    for (let i = 0; i < myJSON.frames.length; i++) {
      let ind = myJSON.frames[i].index;
      if (frameIndex == ind) {
        return myJSON.frames[i].data.timeStr;
      }
    }
  }
  return "null";
}

export function getIndex(d: string) {
  console.log("");
  console.log("data: " + d);
  let myJSON = JSON.parse(d);
  if (myJSON != null) {
    return myJSON.index;
  }
}


export function getmsg(msgs: String[], fi: number) {
  console.log("");
  console.log("messages: " + msgs[fi]);
  return msgs[fi];
}

export function calcFrameIndex(frame: number) {
  return Math.floor((frame) / 30);
}

// export function LearnDataFetch() {
export const LearnDataFetch: React.FC<{
    messageIds: string;
  }> = ({ messageIds }) => {

  const [metadata, setMetaData] = useState(null);
  const [handle] = useState(() => delayRender());
  const [messages, setMessages] = useState<null | String[]>( null );

  const fetchMessages = useCallback(async () => {

    const response2 = await fetch("http://localhost:8080/corona_number_data_1?ver=long&dt=metadata");
    const json2 = await response2.json();
    setMetaData(json2);

    let idsArrLocal = getIndexedArray(JSON.stringify(json2));

    const messages = await Promise.all(
      idsArrLocal.map(async (m) => {
        const response = await fetch(
          `http://localhost:8080/corona_number_data_1?ver=long&dt=data&fi=${m}`
        );
        const json = await response.json();
        console.log(json);
        return JSON.stringify(json);
      })
    );
    setMessages(messages);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, handle]);

  let idsArr = getIndexedArray(JSON.stringify(metadata));
  const frame = useCurrentFrame();
  let frameIndex = calcFrameIndex(frame);

  return(
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      opacity: 1
    }}>
      <h1>Ids size : { idsArr == null ? "null" : idsArr.length }</h1>
      {/* {
        idsArr.map( (index) => (
          <h2>index : {index}</h2>
        ))
      } */}
      <h1>Frame Index : {frameIndex}</h1>
      <h1>Size of messages: { messages == null ? "null" : messages.length }</h1>
      {/* <h1>Time : { messages == null ? "null" : getTime( JSON.stringify(messages[frameIndex]), frameIndex ) }</h1> */}
      {/* <h1>Time : {messages == null ? "null" : getIndex(JSON.stringify(messages[frameIndex]))}</h1> */}
      <h1>Time : {messages == null ? "null" : getmsg(messages, frameIndex) }</h1>
    </div>
  )

}