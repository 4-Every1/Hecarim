import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "utils/saga/createRequestSaga";
import { GET_VIDEO_ANSWER_LIST } from "modules/redux/action/feed/interface";
import { getVideoAnswerList } from "utils/api/feed";

export const getVideoAnswerListRequestSaga = createRequestSaga(GET_VIDEO_ANSWER_LIST, getVideoAnswerList);

function* feedSaga() {
    yield takeLatest(GET_VIDEO_ANSWER_LIST, getVideoAnswerListRequestSaga);
}

export default feedSaga; 