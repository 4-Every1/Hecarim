import FeedContent from "../FeedContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { Question } from "api/Question";

const { height, width } = Dimensions.get("screen");

interface PropsType {
  dataList: Question[];
  index: number;
  onEndReached: () => void;
}

const FeedVideos: FC<PropsType> = ({ dataList, onEndReached }) => {
  const [page, setPage] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  const renderItem: ListRenderItem<Question> = ({ item, index }) => (
    <FeedContent isCurrentPage={index === page} {...item} />
  );

  return (
    <S.Container
      style={{ width, height }}
      decelerationRate="fast"
      snapToAlignment="start"
      pagingEnabled
      disableIntervalMomentum
      bounces={false}
      bouncesZoom={false}
      contentContainerStyle={{ flexGrow: 1 }}
      snapToInterval={height}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      keyExtractor={(item: Question) =>
        `question_${item.id}_${item.is_like}_${item.comment_cnt}_${item.like_cnt}`
      }
      data={dataList}
      renderItem={renderItem}
      onEndReached={onEndReached}
    />
  );
};

export default FeedVideos;
