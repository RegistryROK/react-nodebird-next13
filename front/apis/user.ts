import { api } from "./axios";

export function changeNicknameAPI(data: string) {
  return api
    .patch("/user/nickname", { nickname: data })
    .then((response) => response.data);
}

export function followAPI(data: number) {
  return api.patch(`/user/${data}/follow`).then((response) => response.data);
}

export function unfollowAPI(data: number) {
  return api.delete(`/user/${data}/follow`).then((response) => response.data);
}

export function removeFollowerAPI(data: number) {
  return api.delete(`/user/follower/${data}`).then((response) => response.data);
}

export function loadFollowingsAPI(page: number) {
  return api
    .get(`/user/followings?limit=${page}`)
    .then((response) => response.data);
}

export function loadFollowersAPI(page: number) {
  return api
    .get(`/user/followers?limit=${page}`)
    .then((response) => response.data);
}

export function loadUserPostsAPI(data: number, lastId?: number) {
  return api
    .get(`/user/${data}/posts?lastId=${lastId || 0}`)
    .then((response) => response.data);
}

export function loadUserAPI(data: number) {
  return api.get(`/user/${data}`).then((response) => response.data);
}
