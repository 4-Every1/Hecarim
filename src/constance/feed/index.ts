export type getVideoAnswerList = {
    videoId?: number,
    title?: string,
    userId?: number,
    profile?: string,
    videoUrl?: string,
    createdAt?: string,
    likeCnt?: string,
    isAdoption?: number,
} 

export type getVideoAnswerListResponse = {
    data?: getVideoAnswerList[];
}