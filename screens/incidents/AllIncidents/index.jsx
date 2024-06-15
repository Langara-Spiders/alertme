import {AddIcon, Button, ButtonIcon, Card} from '@gluestack-ui/themed';
import {Image, ScrollView, Text, View} from 'react-native';

import React from 'react';

const AllIncidentsArrray = [
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"2"
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Pending",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"4"
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Resolved",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"5"
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"7"
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"8"
  } ,
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"9"
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes:"10"
  }
]

const AllIncidents = () => {
  return (
    <View style={{flex: 1}}>
      <Text>All Incidents</Text>
      {/* <ButtonIcon as={AddIcon}></ButtonIcon> */}

      <View style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
        <Button style={{backgroundColor:"black", color:"white", width:"20%"}}>
         All
        </Button>
        <Button style={{backgroundColor:"white", width:"25%"}}>
         Active
        </Button>
        <Button style={{backgroundColor:"white", width:"30%"}}>
         Pending
        </Button>
        <Button style={{backgroundColor:"white", width:"30%"}}>
         Resolved
        </Button>
      </View>

      <ScrollView>
        {AllIncidentsArrray.map((incident, index) => {
          return (
            <Card key={index} style={{marginTop:"1rem", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            
                <View>
                  <Button>{incident.status}</Button>
                  <Text>{incident.title}</Text>
                  <Text style={{fontWeight:"bold"}}>{incident.description}</Text>
                  <Text>{incident.location}</Text>
                  <Text>{incident.date},{incident.time} </Text>
                </View>
                <View>
                <Image source={{uri: incident.image}} style={{height: 100, width: 100}}/>
                  <Text>{incident.votes}</Text>
                </View>
             
            </Card>
          )
        })}
      </ScrollView>
    </View> 
  );
};

export default AllIncidents;