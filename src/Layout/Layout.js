import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import Marker from '../marker.js';
import { Button } from 'react-bootstrap';



class Layout extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        selectedFilter:''
      }
      this.setFilter = this.setFilter.bind(this);
  }

  setFilter(event) {
     this.setState({ selectedFilter: event.target.name });
  }


  render () {
    let emsImg = 'https://s3-us-west-1.amazonaws.com/et-icons/icon_report_ems.png';
    let fireImg = 'https://s3-us-west-1.amazonaws.com/et-icons/icon_report_fire.png';
    let mvaImg = 'http://s3-us-west-1.amazonaws.com/et-icons/icon_report_mva.png';
    let hazmatImg = 'https://s3-us-west-1.amazonaws.com/et-icons/icon_report_hazmat.png';
    let incidents = [
          {lat: 32.575258, lng: -117.061613, incident_type: 'ems', icon:emsImg},
          {lat: 32.958337, lng: -117.096112, incident_type: 'fire', icon:fireImg},
          {lat: 32.728588, lng: -117.100064, incident_type: 'hazmat', icon:hazmatImg},
          {lat: 32.556325, lng: -117.055856, incident_type: 'mva', icon:mvaImg},
          {lat: 32.691563, lng: -117.072024, incident_type: 'fire', icon:fireImg},
          {lat: 32.805941, lng: -117.219577, incident_type: 'ems', icon:emsImg},
          {lat: 32.717516, lng: -117.164727, incident_type: 'hazmat', icon:hazmatImg},
          {lat: 32.715218, lng: -117.160156, incident_type: 'mva', icon:mvaImg}]
    return (
      <div>
        <div>
           <Button bsStyle="primary" bsSize="sm" active onClick={this.setFilter} name="ems">EMS</Button>
           <Button bsStyle="danger" bsSize="sm" active onClick={this.setFilter} name="fire">FIRE</Button>
           <Button bsStyle="warning" bsSize="sm" active onClick={this.setFilter} name="hazmat">HAZMAT</Button>
           <Button bsStyle="info" bsSize="sm" active onClick={this.setFilter} name="mva">MVA</Button>
        </div>
          <div ref="map">
            <Map google={this.props.google}
              style={{width: '100%', height: '100%', position: 'relative'}}
              className={'map'}
              zoom={10}
              initialCenter={{lat: 32.7157, lng: -117.1611}}>
              {incidents.filter((i) => i.incident_type === this.state.selectedFilter || !this.state.selectedFilter).map(i => {
                console.log(incidents)
                return (
             <Marker
               incident_type={i.incident_type}
               position={{lat: i.lat, lng: i.lng}}
               icon={i.icon} />
                        )
             })}
            </Map>
          </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB0P-Ql1Gdvu0baPK4xmQMchXxQoUk4YH8'
})(Layout);
