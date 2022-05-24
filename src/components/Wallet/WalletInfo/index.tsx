import useAlert from "hooks/useAlert";
import { useActivityScore, useWalletPoint } from "queries/Wallet";
import React, { FC, useEffect, useState } from "react";
import { Modal, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TierModal from "../TierModal";
import * as S from "./style";

const Logo = require("assets/icons/walletLogo.png");

const WalletInfo: FC = () => {
  const { top: topPad } = useSafeAreaInsets();
  const { data, isError, isLoading } = useWalletPoint();
  const { data: activityData } = useActivityScore();
  const { closeAlert, showAlert } = useAlert();
  const [tierModal, settierModal] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "정보를 불러오지 못했습니다.",
        content: "잠시 후 시도해주세요.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  }, [isError]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={tierModal}
        onRequestClose={() => {
          settierModal(false);
        }}
      >
        <TierModal closeModal={settierModal} {...data} />
      </Modal>
      <S.WalletInfoContainer topPad={topPad}>
        {isLoading && <Text>Loading...</Text>}
        {data && (
          <>
            <S.WalletHeader>
              <S.Logo source={Logo} />
              <S.HeaderTitle>지갑</S.HeaderTitle>
            </S.WalletHeader>
            <S.TierContainer>
              <S.tierInfo>
                <S.tierTitle>{data.category_name}</S.tierTitle>
              </S.tierInfo>
              <S.ShowtierButton
                onPress={() => {
                  settierModal(true);
                }}
              >
                <S.ShowtierButtonDescription>
                  등급보기
                </S.ShowtierButtonDescription>
              </S.ShowtierButton>
            </S.TierContainer>
            <S.Accumulate>
              <S.AccumulateContent>
                <S.AccumulateTitle>누적 IQ</S.AccumulateTitle>
                <S.AccumulateValue>{data.tot_cnt} IQ</S.AccumulateValue>
              </S.AccumulateContent>
              <S.AccumulateContent>
                <S.AccumulateTitle>채택 수</S.AccumulateTitle>
                <S.AccumulateValue>{data.adoption_cnt}</S.AccumulateValue>
              </S.AccumulateContent>
            </S.Accumulate>
            <S.HoldingContainer>
              <S.HoldingContent>
                <S.HoldingTitle>보유 IQ</S.HoldingTitle>
                <S.HoldingValue>{data.cur_cnt} IQ</S.HoldingValue>
              </S.HoldingContent>
              <S.HoldingLine />
              <S.HoldingContent>
                <S.HoldingTitle>오늘 활동점수</S.HoldingTitle>
                <S.HoldingValue>
                  {activityData ? activityData.action_point : "0"}
                </S.HoldingValue>
              </S.HoldingContent>
            </S.HoldingContainer>
          </>
        )}
      </S.WalletInfoContainer>
    </>
  );
};

export default WalletInfo;
