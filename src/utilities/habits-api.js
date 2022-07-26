import sendRequest from "./send-request";

const BASE_URL = "api/habits";

// get all habits by the user
export function getAll(userId) {
  return sendRequest(`${BASE_URL}/user/${userId}`);
}

export function createHabit(data) {
  return sendRequest(`${BASE_URL}`, "POST", data);
}

export function updateHabit(id, body) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", body);
}

export function deleteHabit(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}
