import React from 'react'
// import LoaderMap from "@src/components/LoaderMap";
import * as ZenMapConfig from "@src/config/mapConfig.json"
import './index.less'

class InitMap extends React.Component {
  constructor(props) {
    super(props);

    this.map = null
    this.mapDom = React.createRef();
  }

  componentDidMount() {
    const { callBack } = this.props

    if(this.mapDom.current){
      // this.createZenMap(callBack)
      this.createGaoDeMap(callBack)
      // this.createLeafletDeMap(callBack)
    }

  }
  createLeafletDeMap = (callBack) => {
    let leafletMap = window.L
    var mymap = leafletMap.map('mapBox').setView([51.505, -0.09], 13);

    leafletMap.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      maxZoom: 17,
      minZoom: 5,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(mymap);

    // leafletMap.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    //   maxZoom: 18,
    //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    //     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //   id: 'mapbox/streets-v11',
    //   tileSize: 512,
    //   zoomOffset: -1
    // }).addTo(mymap);

    callBack && callBack()
  }
  createZenMap = (callBack ) => {
    if (!this.mapConfig && this.mapDom) {
      var mapConfig = new window.MapPlatForm.Base.MapConfig();
      if(window.ZenMap) window.ZenMap.ISWGS84=false
      var c = ZenMapConfig.default
      var resultJson = mapConfig && mapConfig.createMap(this.mapDom.current, c.zMapOpt);
      this.map = resultJson.map;
      this.mapConfig = mapConfig;
      this.mapTools = new window.MapPlatForm.Base.MapTools(resultJson.map);
      this.mapService = this.map.mapService = new window.MapPlatForm.Base.MapService(this.map);
      this.arrowline = new window.MapPlatForm.Base.ArrowLine(this.map, true);
      this.loader = new window.THREE.GLTFLoader();

      this.map.load(() => {
        console.log('=========')
        callBack && callBack();
        // this.map.addImages([...Object.entries(imageList)]);//加载所需图片图标
      })
    }
  }
  createGaoDeMap = (callBack) => {
    this.map = new window.AMap.Map('mapBox', {
      center:[116.387271,39.912501],
      viewMode: '3D',
      zoom: 15,
      pitch: 60,
      resizeEnable: true
   });
   callBack && callBack()
  }
  
  render() {
    return (<>
      <div className="map-id" id="mapBox" ref={this.mapDom}></div>
    </>
    );
  }
}

export default InitMap;
