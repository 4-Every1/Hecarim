import { searchTitle } from "modules/dto/response/searchResponse";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./style";

const questionImage = require("../../../../../assets/feed_test.jpg");

const { width } = Dimensions.get("screen");

interface PropsType {
  item: searchTitle;
}

const Results: FC<PropsType> = ({ item }) => {
  return (
    <S.SearchedResults
      source={item.thumbnail ? { uri: item.thumbnail } : questionImage}
      imageWidth={width / 2 - 30}
      resizeMode="cover"
    />
  );
};

export default Results;
