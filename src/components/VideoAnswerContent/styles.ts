import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { Video as VideoC } from "expo-av";

export const Container = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const Video = styled(VideoC)`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  position: absolute;
  top: ${Platform.OS === "ios" ? 0 : -20};
  left: 0px;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  align-items: flex-end;
  flex-direction: row;
`;

export const InfoOuter = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  padding-left: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.body1};
  align-self: flex-end;
`;

export const A = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.h2};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.description2};
  margin-left: 35px;
  margin-top: 5px;
`;

export const Icons = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 1000px;
`;

export const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Icon = styled.Image`
  width: 25px;
  height: 25px;
`;

export const IconLabel = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.description2};
  text-align: center;
  margin-top: 3px;
`;

export const HashTag = styled(Description)`
  color: ${({ theme }) => theme.colors.primary.default};
  margin-top: 5px;
`;

export const BackBlack = styled(LinearGradient)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 50%;
  width: 100%;
`;

export const AdoptionContainer = styled.View`
  left: 0px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

export const AdoptionText = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
