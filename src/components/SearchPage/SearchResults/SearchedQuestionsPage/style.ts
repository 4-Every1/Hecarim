import styled from "styled-components/native";

export const Container = styled.View<{ height:number }>`
    width: 100%;
    height: ${({ height }) => height};
    background-color: ${({ theme }) => theme.colors.grayscale.scale10};
    margin-top: 20;
    border-top-width: 10;
    border-top-color: ${({theme}) => theme.colors.grayscale.scale20};
`;

export const ResultAmount = styled.Text`
    color: ${({ theme }) => theme.colors.grayscale.scale100};
    font: ${({ theme }) => theme.fonts.body3};
    margin-left: 20;
    margin-top: 16;
    margin-bottom: 16;
`;
