import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React, {
  FC,
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import Feed from "screens/Feed";
import MyPage from "screens/MyPage/MyPage";
import Question from "components/Question";
import Search from "screens/Search/DefaultSearchPage";
import storageKeys from "constant/storageKeys";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import localStorage from "utils/localStorage";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";
import { useGetInterests } from "queries/Interests";
import Wallet from "screens/Wallet";
import Icon from "./Icon";

const FeedIcon = require("../../assets/icons/navigation/feed.png");
const MyPageIcon = require("../../assets/icons/navigation/mypage.png");
const SearchIcon = require("../../assets/icons/navigation/search.png");
const QuestionIcon = require("../../assets/icons/navigation/question-circle.png");
const WalletIcon = require("../../assets/icons/navigation/wallet.png");

const Tab = createBottomTabNavigator();

export type ScreenName = "feed" | "search" | "question" | "wallet" | "mypage";

interface Screen {
  name: ScreenName;
  label: string;
  icon: any;
  component: React.FC;
}

const screens: Screen[] = [
  {
    name: "feed",
    label: "피드",
    icon: FeedIcon,
    component: Feed,
  },
  {
    name: "search",
    label: "검색",
    icon: SearchIcon,
    component: Search,
  },
  {
    name: "question",
    label: "",
    icon: QuestionIcon,
    component: Question,
  },
  {
    name: "wallet",
    label: "지갑",
    icon: WalletIcon,
    component: Wallet,
  },
  {
    name: "mypage",
    label: "MY",
    icon: MyPageIcon,
    component: MyPage,
  },
];

type Props = { navigation: StackNavigationProp<MainStackParamList, "Main"> };

const { width } = Dimensions.get("window");

const BottomTabNavigation: FC<Props> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [pressName, setPressName] = useState<ScreenName>("feed");
  const queryClient = useQueryClient();
  const { data } = useGetInterests();

  const loginCheck = useCallback(async () => {
    if (!(await localStorage.getItem<string>(storageKeys.accessToken))) {
      navigation.reset({ routes: [{ name: "Login" }] });
    }
  }, [navigation]);

  useEffect(() => {
    loginCheck();
  }, [loginCheck]);

  useEffect(() => {
    if (data?.data?.length === 0) {
      navigation.reset({ routes: [{ name: "InterestsSetting" }] });
    }
  }, [data, navigation]);

  useEffect(() => {
    if (pressName === "feed") {
      queryClient.invalidateQueries(queryKeys.question);
    }
  }, [pressName, queryClient]);

  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      tabBarStyle: {
        position: "absolute",
        height: 50 + bottomPad,
        width: width,
        bottom: 0,
        left: 0,
        backgroundColor: ["feed", "question"].includes(pressName)
          ? "transparent"
          : themeContext.colors.grayscale.scale10,
        borderTopWidth: 0,
        shadowOpacity: 0,
        paddingTop: 6,
        paddingBottom: bottomPad,
        zIndex: 2,
        elevation: 2,
      },
      headerShown: false,
      unmountOnBlur: true,
    }),
    [pressName, bottomPad]
  );

  return (
    <Fragment>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="feed">
        {screens.map((value) => (
          <Tab.Screen
            key={`${value.name}_screen`}
            name={value.name}
            listeners={{
              tabPress: (e) => {
                if (value.name === "question") {
                  e.preventDefault();
                  navigation.push("Ask");
                } else {
                  setPressName(value.name);
                }
              },
            }}
            options={{
              tabBarIcon: Icon(value.icon, value.label, pressName, value.name),
              tabBarShowLabel: false,
            }}
            component={value.component}
          />
        ))}
      </Tab.Navigator>
    </Fragment>
  );
};

export default memo(BottomTabNavigation);
