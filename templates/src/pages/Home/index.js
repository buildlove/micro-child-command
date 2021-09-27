import React from 'react'
import LoaderMap from "@src/components/LoadMixMap/LoaderMap";
import InitMap from "@src/components/LoadMixMap/InitMap";
import {Button} from 'antd'

function Home() {
  let mapInstantRef = React.createRef()

  const testBtn = ()=> {
    console.log(mapInstantRef)
  }

  const afterCreateMap = ()=> {
    console.log(mapInstantRef)
  }

  return (
    <>
      <Button onClick={testBtn}>测试按钮</Button>
      <LoaderMap>
        <InitMap ref={mapInstantRef} callBack={afterCreateMap}></InitMap>
      </LoaderMap>
    </>
  );
}

export default Home;
