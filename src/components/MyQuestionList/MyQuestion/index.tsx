import { ProfileQuestionType } from "modules/dto/response/getProfileQuestionListResponse";
import React, { FC } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import * as S from "./style";

const { width } = Dimensions.get("screen");

type Props = {
  question: ProfileQuestionType;
};

const MyQuestion: FC<Props> = ({ question }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      {question?.thumbnail ? (
        <S.Question
          source={{ uri: question.thumbnail }}
          imageWidth={width / 2 - 30}
          resizeMode="cover"
        />
      ) : (
        <S.DefaultQuestion imageWidth={width / 2 - 30} />
      )}
    </TouchableOpacity>
  );
};

export default MyQuestion;
