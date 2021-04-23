import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Galio components
import { Card, Block, NavBar, Icon } from "galio-framework";
import theme from "../../constants/theme";

const { width } = Dimensions.get("screen");

const GroupCardV2 = ({
  navigation,
  title,
  caption,
  image,
  creatorAvatar,
  id,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.cards}>
      <Block flex space="between" contentContainerStyle={styles.cards}>
        <Card
          key={`card-${image}`}
          flex
          borderless
          shadowColor={theme.COLORS.BLACK}
          // titleColor={card.full ? theme.COLORS.WHITE : null}
          style={styles.card}
          title={title}
          caption={caption}
          avatar={`${creatorAvatar}?${id}`}
          image={image}
          // imageStyle={[card.padded ? styles.rounded : null]}
          // imageBlockStyle={[
          //   card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
          //   card.full ? null : styles.noRadius,
          // ]}
          // footerStyle={card.full ? styles.full : null}
        >
          {/* {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null} */}
        </Card>
      </Block>
    </ScrollView>
  );
};

export default GroupCardV2;

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: "absolute",
    overflow: "hidden",
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});
