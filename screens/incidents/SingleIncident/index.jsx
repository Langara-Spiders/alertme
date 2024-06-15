import React from "react";

const SingleIncident = () => {
  return (
   <View>
      <Text>Single Incident</Text>
      <ButtonIcon as={AddIcon}></ButtonIcon>

      <Card>
        <CardHeader title="Single Incident" />
        <CardBody>
          <ButtonIcon as={AddIcon}></ButtonIcon>
        </CardBody>
      </Card>
   </View>
  );
};

export default SingleIncident;
