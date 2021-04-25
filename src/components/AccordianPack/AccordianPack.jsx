import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Accordion,
  View,
  Text,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from "native-base";
import { theme } from "../../constants/theme";

const AccordianPack = ({ headerTitles }) => {
  const headerContent = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "600", color: theme.secondary.color }}>
          {" "}
          {item.title}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add-circle" />
        )}
      </View>
    );
  };
  const mainContent = (item) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </View>
    );
  };

  return (
    <View>
      <Accordion
        dataArray={headerTitles}
        animation={true}
        expanded={[0]}
        renderHeader={headerContent}
        renderContent={mainContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // borderRadius: 10,
    // paddingLeft: 10,
  },
});

export default AccordianPack;
